import headers from './headers'
import moment from 'moment'

const BASE_URL = 'https://api.intrinio.com/'

class IntrinioAdapter {
  static getPriceData(ticker) {
    let today = moment().format("YYYY-MM-DD")
    let oneYearAgo = moment().subtract(1, 'year').format("YYYY-MM-DD")
    return fetch(BASE_URL + `historical_data?identifier=${ticker}&item=close_price&start_date=${oneYearAgo}&end_date=${today}&frequency=monthly`, {
      method: 'GET',
      headers: headers()
    })
    .then((resp) => resp.json())
  }
}

export default IntrinioAdapter
