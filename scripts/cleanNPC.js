const list = require('../data/13thNPCRaw.json')
const output = []
for (const key in list) {
  list[key].split('、').forEach(item => {
    const hasComment = item.indexOf('（')
    const name = hasComment > 0 ? item.slice(0, hasComment) : item
    const comment = hasComment > 0 ? item.slice(hasComment).replace('（', '').replace('）', '') : ''
    const isFemale = comment.includes('女')
    const isMinority = comment.includes('族')
    output.push({
      name,
      province: key,
      isFemale,
      isMinority
    })
  })
}

console.log(output.length)
console.log(output.filter(item => item.isFemale).length)
console.log(output.filter(item => item.isMinority).length)

const fs = require('fs')

const fd = fs.openSync('../data/13thNPC.json', 'w')
fs.writeSync(fd, JSON.stringify(output))
