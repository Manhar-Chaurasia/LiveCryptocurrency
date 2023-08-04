import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Fetch.css'

const Fetch = () => {
  const [bitData, setBitData] = useState([])
  // const [err, setErr] = useState(true)

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        setBitData(response.data);
      }
      catch {
        alert("Limit exhausted... Wait and try again later!");
      }
    }

    fetchData();
  }, []);


  // axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
  //   .then((response) => {
  //     setBitData(response.data);
  //   }).catch((error) => {
  //     console.error(error);
  //   });


  return (
    <>
      <div className="main">
        <div className="nav">
          <h2>CryptoLive</h2>
          <h1>Real-Time Crypto Price Tracker⏳</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th className='serial-num'>S No.</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>High 24h</th>
              <th>Low 24h</th>
              <th className='price-change'>Price Change 24h</th>
              <th>Market Cap</th>
              <th>Circulating Supply</th>
            </tr>
          </thead>

          <tbody>
            {bitData.map((currElem) => (
              <tr key={currElem.market_cap_rank}>

                <td className='serial-num'>{currElem.market_cap_rank}</td>
                <td><img src={currElem.image} alt={currElem.name} /></td>
                <td>{currElem.name}</td>
                <td>${Number(currElem.current_price).toLocaleString()}</td>
                <td>{Number(currElem.high_24h).toFixed(2)}</td>
                <td>{Number(currElem.low_24h).toFixed(2)}</td>
                <td className='price-change'>{Number(currElem.price_change_24h).toFixed(2)}</td>
                <td>{Number(currElem.market_cap).toLocaleString()}</td>
                <td>{Number(currElem.circulating_supply).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Fetch