import Cache from 'noodle-cache'

// ratings responses should be cached for a day
const cacheTimeSeconds = 60 * 60 * 24
const ratingsApiCache = new Cache(cacheTimeSeconds)

export function seriesRatingsCacheKey(seriesId) {
  return `SeriesRatings - ${seriesId}`
}

export function getRatingsCache() {
  return ratingsApiCache
}
