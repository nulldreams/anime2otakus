const req = require('./request')
const cheerio = require('cheerio')
const database = require('../animeservice')

async function episodes () {
  let body = await req.get('http://www.animesonehd.com.br/2017/07/shingeki-no-kyojin-2-temporada-todos-os-episodios.html')

  var $ = cheerio.load(body)

  // $ = cheerio.load($('.post-body').html().replace(/<br>/g, 'TOPPER'))
  // $('span').filter(function () {
  //   if ($(this).text().indexOf('Título') > -1) {
  //     console.log($(this).text().split('TOPPER'))
  //   }
  //   if ($(this).text().indexOf('Gênero') > -1) {
  //     console.log($(this).text().split('TOPPER'))
  //   }
  //   if ($(this).text().indexOf('Sinopse') > -1) {
  //     console.log($(this).text().split('TOPPER'))
  //   }
  // })

  // $('b').filter(function () {
  //   if ($(this).text().indexOf('Título') > -1) {
  //     console.log($(this).clone().children().remove().end().text())
  //   }
  // })

  let numeroEpisodios = $('.post-body').find('li').length
  let capa = $('.post-body').find('a').eq(0).attr('href')
  let anime = {
    nome: 'Shingeki no Kyojin 2',
    capa,
    episodios: []
  }
  try {
    for (let i = 0; i < numeroEpisodios; i++) {
      let url = $('.post-body').find('li').eq(i).find('a').eq(0).attr('href')
      console.log(url)
      let video = await infoEpisode(url)
      anime.episodios.push({
        numero: i + 1,
        video
      })

      if (i + 1 === numeroEpisodios) {
        return database.add(anime, (err, resultado) => {
          console.log(resultado)
        })
      }
    }
  } catch (e) {
    console.log('aaaa')
    return database.add(anime, (err, resultado) => {
      console.log(resultado)
    })
  }
}

async function infoEpisode (url) {
  let body = await req.get(url)

  return new Promise((resolve, reject) => {
    const $ = cheerio.load(body)

    let video = $('video').eq(0).find('source').attr('src')

    return resolve(video)
  })
}

episodes()
// database.teste()
