import fs from 'fs'

function fetchConfig(location) {
  let rawConfig = fs.readFileSync(location)
  let config = JSON.parse(rawConfig)

  return config
}

export { fetchConfig }
