import express from 'express'

import {
  fetchSeriesDataByName,
  getSeriesLinks,
  getSeriesRatings
} from './../../api'
import { seriesRatingsCacheKey, getRatingsCache } from './common'

var router = express.Router()

router.get('/:series', async (req, res, next) => {
  try {
    const cache = getRatingsCache()

    const seriesData = await cache.processItem(
      `SeriesData - ${req.params.series}`,
      async () => await fetchSeriesDataByName(req.params.series)
    )
    const seriesId = seriesData.imdbID
    const numSeries = seriesData.totalSeasons
    const seriesTitle = seriesData.Title
    const poster = seriesData.Poster
    const seriesLinks = getSeriesLinks(numSeries, seriesId)

    const seriesRatings = await cache.processItem(
      seriesRatingsCacheKey(seriesId),
      async () => {
        return await Promise.all(
          seriesLinks.map(async series => {
            return getSeriesRatings(series)
          })
        )
      }
    )

    const filteredRatings = seriesRatings.filter(ratings => ratings.length > 0)

    const ratingsMap = filteredRatings.reduce((acc, ratings, index) => {
      acc[`series_${index + 1}`] = ratings
      return acc
    }, {})

    const response = Object.assign({}, seriesData, {
      ratings: ratingsMap
    })

    res.send(response)
  } catch (error) {
    res.status(error.StatusCode).send(error)
  }
})

export default router
