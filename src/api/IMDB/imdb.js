import curl from 'curl'
import cheerio from 'cheerio'
import fill from 'lodash.fill'

function getSeriesLinks(numSeries, seriesId) {
  return fill(Array(parseInt(numSeries)), '')
    .map((_, index) => `https://www.imdb.com/title/${seriesId}/episodes?season=${index+1}`)
}

async function getSeriesRatings(seriesLink) {
  return new Promise((resolve, reject) => {
    curl.get(seriesLink, (err, response, body) => {
      try {
        const $ = cheerio.load(body)
        const ratings = $('.ipl-rating-star.small .ipl-rating-star__rating')
          .map((_, element) => $(element).text())
          .get()

        resolve(ratings)
      } catch (err) {
        reject(`Could not grab number of pages needed from page: ${url}, error: ${err}`)
      }
    })
  })
}

function seriesLinkComparator(linkA, linkB) {
  // second argument to parse determines whether the querystring is parsed
  // as a dictionary or a string, i need the dictionary
  const urlA = url.parse(linkA, true)
  const urlB = url.parse(linkB, true)

  return parseInt(urlA.query.season) < parseInt(urlB.query.season) ? -1 : 1;
}

export {
  getSeriesLinks,
  getSeriesRatings,
}
