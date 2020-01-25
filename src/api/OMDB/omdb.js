import fetch from "node-fetch"

import { apiCall } from './../Utils/ApiUtils'
import { fetchConfig } from './../Utils/Config'

import {
  SeriesNotFound,
  InvalidSeriesType,
} from './../Errors'

async function fetchSeriesData(seriesName) {
  const apiKey = getApiKey()
  const seriesInput = encodeURI(seriesName)
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&t=${seriesInput}`

  const apiResult = await apiCall(apiEndpoint)

  if (apiResult.Error) {
    throw new SeriesNotFound()
  }

  if (apiResult.Type !== 'series') {
    throw new InvalidSeriesType()
  }

  return apiResult
}

function getApiKey() {
  const config = fetchConfig(__dirname + '/../../../credentials/omdbConfig.json')
  return config.apiKey
}

export default fetchSeriesData
