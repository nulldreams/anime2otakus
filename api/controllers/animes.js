const database = require('../../animeservice')
const _ = require('lodash')

exports.animes = (req, reply) => {
  database.get({}, (err, animes) => {
    if (err) return reply.code(500).send(err)

    reply.code(200).send({ animes: animes[0].animes, quantidade: animes[0].animes.length })
  })
}

exports.anime = (req, reply) => {
  database.get({}, (err, anime) => {
    if (err) return reply.code(500).send(err)

    let _anime = _.find(anime[0].animes, { path: req.params.anime })

    reply.code(200).send({ anime: _anime, episodios: _anime.episodios.length })
  })
}
