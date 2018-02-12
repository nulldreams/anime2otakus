const api = require('./controllers/animes')

module.exports = (fastify) => {
  fastify.addContentTypeParser('*', (req, done) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      done(data)
    })
  })

  fastify.get('/api/v1/animes', api.animes)
  fastify.get('/api/v1/anime/:anime', api.anime)
}
