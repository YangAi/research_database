const utils = require('../lib/utils')
const _ = require('lodash')

const res = utils.hasJoinNPC('马一德')

console.log(res)

utils.getStockCodeList().forEach((stockCode) => {
  const stock = require('../output/stock/' + stockCode)
  stock.people.forEach((person) => {
    const res = utils.hasJoinNPC(person.name)
    if (res) {
      const matchDescription = person.description.includes(res.province)
      if (matchDescription) {
        console.log({
          ...person,
          ...res
        })
      }
    }
  })
})
