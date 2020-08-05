const request = require('./request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
const fs = require('fs')

async function getHtml (url) {
  const res = await request.get(url)
  const $ = cheerio.load(iconv.decode(res.data, 'gbk'))
  return $
}

function hasJoinNPC (name) {
  const list = require('../data/13thNPC.json')
  return list.find(item => item.name === name)
}

function getStockCodeList () {
  return fs.readdirSync('../output/stock/')
  // return output
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function writeFile (dir, fileName, content) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const fd = fs.openSync(`${dir}/${fileName}`, 'w')
  fs.writeSync(fd, JSON.stringify(content))
  console.log('Data Saved!')
}

module.exports = {
  getHtml,
  hasJoinNPC,
  getStockCodeList,
  sleep,
  writeFile
}
