import fetch from 'node-fetch'

import { apiCall } from './../Utils/ApiUtils'
import { fetchConfig } from './../Utils/Config'

import { SeriesNotFound, InvalidSeriesType } from './../Errors'

async function fetchSeriesDataByName(seriesName) {
  const apiKey = getApiKey()
  const seriesInput = encodeURI(seriesName)
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&t=${seriesInput}`

  const apiResult = await apiCall(apiEndpoint)

  handleResponseErrors(apiResult)

  return apiResult
}

async function fetchSeriesDataById(seriesId) {
  const apiKey = getApiKey()
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&i=${seriesId}`

  const apiResult = await apiCall(apiEndpoint)

  handleResponseErrors(apiResult)

  return apiResult
}

function handleResponseErrors(apiResponse) {
  if (apiResponse.Error) {
    throw new SeriesNotFound()
  }

  if (apiResponse.Type !== 'series') {
    throw new InvalidSeriesType()
  }
}

function getApiKey() {
  const config = fetchConfig(
    __dirname + '/../../../credentials/omdbConfig.json'
  )
  return config.apiKey
}

export { fetchSeriesDataByName, fetchSeriesDataById }
