import fetch from "node-fetch"

import { apiCall } from './../Utils/ApiUtils'
import { fetchConfig } from './../Utils/Config'

import { SeriesNotFound } from './../Errors'

async function fetchSeriesId(seriesName) {
  const apiKey = getApiKey()
  const seriesInput = encodeURI(seriesName)
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&t=${seriesInput}`

  const apiResult = await apiCall(apiEndpoint)

  if (apiResult.Error) {
    throw new SeriesNotFound()
  }

  return apiResult.imdbID
}

function getApiKey() {
  const config = fetchConfig(__dirname + '/../../../credentials/omdbConfig.json')
  return config.apiKey
}

export default fetchSeriesId
