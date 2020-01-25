import curl from "curl"
import cheerio from "cheerio"

async function getNumberOfSeries(seriesId) {
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
        const series = $('a').filter( function(index, element) {
          const href = $(this).attr('href') || ""
          return href.startsWith(`/title/${seriesId}/episodes?season`)
        })


        resolve(series.length)
      } catch (err) {
        reject(`Could not grab number of pages needed from page: ${url}, error: ${err}`)
      }
    })
  })
}

export default getNumberOfSeries