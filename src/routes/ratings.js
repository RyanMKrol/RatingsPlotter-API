import express from 'express'
import { fetchSeriesId } from './../api'

var router = express.Router()

router.use('/', async (req, res, next) => {
  console.log("Using some custom middleware!")
  next()
})

router.get('/:id', async (req, res, next) => {
  console.log(req.params.id)

  fetchSeriesId(req.params.id)

  res.send("Sending back some data")
})

export default router
