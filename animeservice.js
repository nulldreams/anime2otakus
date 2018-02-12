const path = require('path')
const Datastore = require('nedb')
const _ = require('lodash')

const db = new Datastore({
  filename: path.join(__dirname, 'data', `animes.db`)
})

db.loadDatabase()
db.persistence.setAutocompactionInterval(1000 * 60 * 1)

function add (anime, cb) {
  db.findOne({}, (err, documento) => {
    if (err) return cb(err)
    // if (!documento) {
    //   return db.insert({ animes: [anime] }, cb)
    // }

    documento.animes.push(anime)
    return db.update({}, documento, cb)
  })
}

function teste (cb) {
  db.findOne({ 'animes.nome': 'One Piece' }, (err, documento) => {
    console.log(documento)
  })
}

function get (param, cb) {
  db.find(param, cb)
}

module.exports = {
  add,
  get,
  teste
}
