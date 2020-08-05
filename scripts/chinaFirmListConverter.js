const fs = require('fs')
const utils = require('../lib/utils')
const _ = require('lodash')

const list = require('../data/ChinaFirmList.json')
const output = []

async function convert (item) {
  const outputItem = {}
  if (item.stock_exchange === 'Shenzhen Stock Exchange') {
    outputItem.market = 'SZ'
  } else if (item.stock_exchange === 'Shanghai Stock Exchange') {
    outputItem.market = 'SH'
  } else {
    // console.log('wrong market', item.stock_exchange)
    return
  }
  outputItem.code = item.code
  const $ = await utils.getHtml('http://basic.10jqka.com.cn/' + item.code)
  outputItem.chineseName = $('#stockName').attr('value')
  console.log(outputItem)
  return outputItem
}

async function run () {
  console.log('start')
  for await (const item of list) {
    await utils.sleep(100)
    const res = await convert(item)
    // console.log(res)
    if (res) {
      output.push(res)
    }
    // console.log('output', output)
  }
  console.log('end')
  console.log('final', output)
  utils.writeFile('../data', 'MsciChinaAStockList.json', output)
}

run()
