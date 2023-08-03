# Deprecated

Due to Amazon beefing up their anti-crawling measures on IMDb, this project is no longer viable. Fun while it lasted though!

# RatingsPlotter-API

The API behind plotatvseries.xyz, providing information about TV shows, including episode-by-episode ratings!

## APIs

- `/api/ratings/name/:name`
  - Taking TV shows name as input
- `/api/ratings/id/:id`
  - Taking an IMDb ID as input

### Example Response

```
{
   "Title":"Game of Thrones",
   "Year":"2011–",
   "Rated":"TV-MA",
   "Released":"17 Apr 2011",
   "Runtime":"57 min",
   "Genre":"Action, Adventure, Drama, Fantasy, Romance",
   "Director":"N/A",
   "Writer":"David Benioff, D.B. Weiss",
   "Actors":"Peter Dinklage, Lena Headey, Emilia Clarke, Kit Harington",
   "Plot":"Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.",
   "Language":"English",
   "Country":"USA, UK",
   "Awards":"Won 1 Golden Globe. Another 273 wins & 454 nominations.",
   "Poster":"https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_SX300.jpg",
   "Ratings":[
      {
         "Source":"Internet Movie Database",
         "Value":"9.5/10"
      }
   ],
   "Metascore":"N/A",
   "imdbRating":"9.5",
   "imdbVotes":"1,429,496",
   "imdbID":"tt0944947",
   "Type":"series",
   "totalSeasons":"8",
   "Response":"True",
   "ratings":{
      "series_1":[
         "9.1",
         "8.8",
         "8.7",
         "8.8",
         "9.1",
         "9.2",
         "9.2",
         "9.0",
         "9.6",
         "9.5"
      ],
      "series_2":[
         "8.8",
         "8.5",
         "8.8",
         "8.8",
         "8.8",
         "9.1",
         "8.9",
         "8.8",
         "9.7",
         "9.4"
      ],
      "series_3":[
         "8.8",
         "8.6",
         "8.9",
         "9.6",
         "9.0",
         "8.8",
         "8.7",
         "9.0",
         "9.9",
         "9.2"
      ],
      "series_4":[
         "9.1",
         "9.7",
         "8.9",
         "8.8",
         "8.7",
         "9.7",
         "9.1",
         "9.7",
         "9.6",
         "9.7"
      ],
      "series_5":[
         "8.5",
         "8.5",
         "8.5",
         "8.7",
         "8.6",
         "8.0",
         "9.0",
         "9.9",
         "9.5",
         "9.1"
      ],
      "series_6":[
         "8.5",
         "9.4",
         "8.7",
         "9.1",
         "9.7",
         "8.4",
         "8.6",
         "8.4",
         "9.9",
         "9.9"
      ],
      "series_7":[
         "8.6",
         "8.9",
         "9.2",
         "9.8",
         "8.8",
         "9.0",
         "9.4"
      ],
      "series_8":[
         "7.6",
         "7.8",
         "7.5",
         "5.5",
         "6.0",
         "4.1"
      ]
   }
}
```
