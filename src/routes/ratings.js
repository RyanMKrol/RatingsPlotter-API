import express from 'express'
import { fetchSeriesId } from './../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:series', async (req, res, next) => {
  try {
    const seriesId = await fetchSeriesId(req.params.series)
    res.send(seriesId)
  } catch(error) {
    res.status(error.StatusCode).send(error)
  }
})

export default router
