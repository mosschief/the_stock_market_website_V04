const axios = require('axios');

const iex_routes = {

  getCompanyInfo: getCompanyInfo,

}

async function getCompanyInfo(tickerSymbol){
  try{
    const iex_res = await axios.get(`https://api.iextrading.com/1.0/stock/${tickerSymbol}/batch?types=quote,news,chart&range=1m&last=1`)
    return iex_res.data;
  } catch(err){
    console.log(err);
  }
}

module.exports = iex_routes;