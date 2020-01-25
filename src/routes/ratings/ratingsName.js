import express from 'express'
import {
  fetchSeriesDataByName,
  getSeriesLinks,
  getSeriesRatings,
} from './../../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:series', async (req, res, next) => {
  try {
    const seriesData = await fetchSeriesDataByName(req.params.series)
    const seriesId = seriesData.imdbID
    const numSeries = seriesData.totalSeasons

    const seriesLinks = getSeriesLinks(numSeries, seriesId)

    const seriesRatings = await Promise.all(seriesLinks.map(async (series) => {
      return getSeriesRatings(series)
    }))

    const filteredRatings = seriesRatings.filter((ratings) => ratings.length > 0)

    res.send({
      ratings: filteredRatings
    })
  } catch(error) {
    res.status(error.StatusCode).send(error)
  }
})

export default router
