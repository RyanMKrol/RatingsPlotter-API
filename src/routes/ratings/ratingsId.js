import express from 'express'
import {
  fetchSeriesDataById,
  getSeriesLinks,
  getSeriesRatings,
} from './../../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:id', async (req, res, next) => {
  try {
    const seriesId = req.params.id
    const seriesData = await fetchSeriesDataById(seriesId)
    const numSeries = seriesData.totalSeasons
    const seriesTitle = seriesData.Title
    const poster = seriesData.Poster

    const seriesLinks = getSeriesLinks(numSeries, seriesId)

    const seriesRatings = await Promise.all(seriesLinks.map(async (series) => {
      return getSeriesRatings(series)
    }))

    const filteredRatings = seriesRatings.filter((ratings) => ratings.length > 0)

    const ratingsMap = filteredRatings.reduce((acc, ratings, index) => {
      acc[`series_${index+1}`] = ratings
      return acc
    }, {})

    res.send({
      title: seriesTitle,
      ratings: ratingsMap,
      poster: poster,
    })
  } catch(error) {
    res.status(error.StatusCode).send(error)
  }
})

export default router
