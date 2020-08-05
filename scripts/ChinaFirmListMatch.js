const csvFilePath = '../data/ChinaFirmList.csv'
const csv = require('csvtojson')
const fs = require('fs')

const utils = require('../lib/utils')

async function matchCompany (item) {
  const name = item.DMX_ISSUER_NAME
    .toLowerCase()
    .replace('co., ltd', '')
    .replace('co.,ltd', '')
    .replace('co,ltd', '')
    .replace('company limited', '')
    .replace('corporation limited', '')
    .replace('corporation', '')
    .replace('limited', '')
    .replace('limited', '')
    .replace('ltd.', '')
    .replace('.ltd', '')
    .replace(' ltd', '')
    .replace('the ', '')
    .replace('company', '')
    .replace('holding', '')
  const $ = await utils.getHtml(`https://www.reuters.com/search/news?blob=${name}`)
  const targetName = $('.search-stock-ticker').text()
  const output = {
    name: targetName.substring(0, targetName.lastIndexOf('(')),
    code: targetName.substring(targetName.lastIndexOf('(') + 1, targetName.lastIndexOf('.')),
    stock_exchange: $('.search-stock-exchange').text().replace(/\n/g, '').trim()
  }
  console.log(name)
  console.log(output)
  return output
}

async function run () {
  const output = []
  csv().fromFile(csvFilePath).then(async (jsonObj) => {
    jsonObj = require('../data/ChinaFirmList.json')
    for (const item of jsonObj) {
      const res = item.code === '' ? await matchCompany(item) : {}
      output.push({
        ...item,
        ...res
      })
    }
    const fd = fs.openSync('../data/ChinaFirmList.json', 'w')
    fs.writeSync(fd, JSON.stringify(output))
  })
}

run()
