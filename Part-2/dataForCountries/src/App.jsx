import { useState } from 'react'
import axios from 'axios'

const wApi = import.meta.env.VITE_WEATHER_API

const Details = ({data}) => {
  let weather = null;
  weather = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.name.common}&appid=${wApi}`)
      .then(res => res.data)
      .catch(e => {
        console.log('error: ', e);
        return null;
      })
    
  return (
    <div>
    <h1>{data.name.common}</h1>
    <p>capital: {data.capital[0]}</p>
    <p>area: {data.area}</p>
    <h2>languages</h2>
    <ul>
    {Object.values(data.languages).map((l,i) => <li key={i}>{l}</li>)} 
    </ul>
    <img src={data.flags.png} alt={data.flags.alt} />
    { (weather !== null) && (
      <div>
      <h2>Weather in {data.name.common}</h2>
      <p>temperature: {weather.main.temp}</p>
      <p>wind {weather.wind.speed}</p>
      </div>
    )}
    </div>
  )
}


function App({apiData}) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(null);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
    const list = apiData.filter(d => d.name.common.toLowerCase().includes(newVal.toLowerCase()));
    setResult(list);
  }
  return (
    <div>
    <p>find countries <input onChange={e => handleChange(e)} value={query} /></p>
    {
      (result.length === 1) 
      ?<Details data={result[0]} />
      :<ul>
      {(result.length <= 10)
        ? <>
        {result.map((c, i) => <li key={i}>{c.name.common} <button onClick={() => setShow(c)}>show</button></li>)}
        {(show != null) && <Details data={show} />}
        </>
        :<li>Too many matches, give more details</li>
      }
      </ul>
    }
    </div>
  )
}

export default App
