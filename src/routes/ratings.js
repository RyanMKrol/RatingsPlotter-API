import express from 'express'
import {
  fetchSeriesId,
  getSeriesLinks,
  getSeriesRatings,
} from './../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:series', async (req, res, next) => {
  try {
    const seriesId = await fetchSeriesId(req.params.series)

    const seriesLinks = await getSeriesLinks(seriesId)

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
