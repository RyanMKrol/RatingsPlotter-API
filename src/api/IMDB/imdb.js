import curl from 'curl'
import cheerio from 'cheerio'
import url from 'url'

async function getSeriesLinks(seriesId) {
  // this is the URL format for a given series with an ID on imdb
  // e.g. https://www.imdb.com/title/tt4574334
  const url = `https://www.imdb.com/title/${seriesId}`

  return new Promise((resolve, reject) => {
    curl.get(url, (err, response, body) => {
      try {
        const $ = cheerio.load(body)

        // To figure out how many series there are for a given ID, we
        // get all the links on the page and find out how many link to a page
        // of a season for this show. I'd rather use classes or IDs to find
        // this out, but IMDB just has blank divs with no other information to
        // pick this out easily.
        const seriesLinks = $('a')
        .map((_, element) => $(element).attr('href'))
        .get()
        .filter((href) => href.startsWith(`/title/${seriesId}/episodes?season`))
        .map((relativeUrl) => `https://www.imdb.com${relativeUrl}`)
        .sort(seriesLinkComparator)

        resolve(seriesLinks)
      } catch (err) {
        reject(`Could not grab number of pages needed from page: ${url}, error: ${err}`)
      }
    })
  })
}

export default getSeriesLinks
function seriesLinkComparator(linkA, linkB) {
  // second argument to parse determines whether the querystring is parsed
  // as a dictionary or a string, i need the dictionary
  const urlA = url.parse(linkA, true)
  const urlB = url.parse(linkB, true)

  return parseInt(urlA.query.season) < parseInt(urlB.query.season) ? -1 : 1;
}
