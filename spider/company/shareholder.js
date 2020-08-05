// Downloading data from 10jqka.com
const TARGET_DATE = '2019-12-31'

const utils = require('../../lib/utils')

module.exports = async function (stockId) {
  console.log('Start downloading company shareholder.')

  const output = {
    shareholders: []
  }

  const $ = await utils.getHtml(`http://basic.10jqka.com.cn/${stockId}/holder.html#stockpage`)

  const targetDomId = $(`#tenholder  .bd li a:contains(${TARGET_DATE})`).attr('targ')

  $(`#${targetDomId} tbody tr:not('.gray')`).each(function () {
    if (!$(this).find('th a').text()) return
    output.shareholders.push({
      organizationId: $(this).find('th a').attr('orgid') || '',
      holderName: $(this).find('th a').text()
        .replace(/\t/g, '').replace(/\n/g, '').replace(/ /g, ''),
      totalShare: $(this).find('td:nth-child(2)').text(),
      sharePercentage: $(this).find('td:nth-child(4)').text()
    })
  })
  return output
}
