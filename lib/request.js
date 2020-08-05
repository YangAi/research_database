const axios = require('axios')

axios.defaults.responseType = 'arraybuffer'
axios.defaults.headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.68 Safari/537.36'
axios.defaults.headers.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
module.exports = axios
