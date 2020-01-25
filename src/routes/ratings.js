import express from 'express'
import {
  fetchSeriesId,
  getSeriesLinks,
} from './../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:series', async (req, res, next) => {
  try {
    const seriesId = await fetchSeriesId(req.params.series)
    console.log(`The series id is ${seriesId}`)

    const seriesLinks = await getSeriesLinks(seriesId)
    console.log(`The number of series is ${seriesLinks}`)

    res.send({
      links: seriesLinks
    })
  } catch(error) {
    res.status(error.StatusCode).send(error)
  }
})

export default router
