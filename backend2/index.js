const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server (version ${config.version}) running on port ${config.PORT}`)
})
