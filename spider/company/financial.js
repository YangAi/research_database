const utils = require('../../lib/utils')
const _ = require('lodash')

module.exports = async function (stockId) {
  console.log('Downloading Reuters profile.' + stockId)

  const market = stockId > 400000 ? 'SH' : 'SZ'
  const urlPrefix = `https://www.reuters.com/companies/${stockId}.${market}`

  const output = []

  const $ = await utils.getHtml(`${urlPrefix}/profile`)
  output.englishName = $('h1').text()
  output.englishDescription = $('.Profile-body-2Aarn').text()
  output.englishIndustry = $('div.industry p:last-child').text()
  $('.KeyStats-table-QKqaf tr').each(function () {
    output[_.capitalize($(this).children('th').text())] = $(this).children('td').text()
  })

  const financial = ['Income Statement', 'Balance Sheet', 'Cash Flow']

  for (const item of financial) {
    console.log(`Downloading ${item}. ${stockId}`)
    const $target = await utils.getHtml(`${urlPrefix}/financials/${_.kebabCase(item)}-annual`)
    output[_.capitalize(item)] = {}
    $target('.FinanceTable-container-KsLu0 tbody tr').each(function () {
      const key = $(this).children('th').text()
      output[_.capitalize(item)][_.capitalize(key)] = $(this).find('td').first().text()
    })
  }

  const $key = await utils.getHtml(`${urlPrefix}/key-metrics`)

  output.keyMetrics = {}

  $key('.KeyMetrics-container-3QO5T>.KeyMetrics-table-container-3wVZN').each(function () {
    const category = $(this).find('h3').text()
    output.keyMetrics[category] = {}
    $(this).find('tr').each(function () {
      const key = $(this).children('th').text()
      output.keyMetrics[category][key] = $(this).children('td').text()
    })
  })

  return output
}
