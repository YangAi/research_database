const stockList = require('./data/ChinaFirmList.json')
const spider = require('./spider')
const fs = require('fs')

async function run (stock) {
  if (stock.stock_exchange !== 'Shenzhen Stock Exchange' && stock.stock_exchange !== 'Shanghai Stock Exchange') {
    console.log('Not target market.', stock.stock_exchange)
    return
  }
  if (stock['Company ID number'] < 121) return
  await setTimeout(function () {
    console.log('Starting! ' + stock.code)
  }, 500)
  const profile = await spider.getCompanyProfile(stock.code)
  const shareholder = await spider.getCompanyShareholder(stock.code)
  const reuters = await spider.getCompanyFinancial(stock.code)
  const output = {
    createdAt: new Date().toLocaleString(),
    timestamp: new Date().getTime(),
    ...stock,
    ...profile,
    ...shareholder,
    ...reuters
  }
  const dir = './output/stock'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const fd = fs.openSync(`${dir}/${stock.code}.json`, 'w')
  fs.writeSync(fd, JSON.stringify(output))
  console.log('Data Saved!', stock.code)
}

async function runByList () {
  for (const item of stockList) {
    await run(item)
  }
}

runByList()
