import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios';

axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(res => { 
    ReactDOM.createRoot(document.getElementById('root')).render( <App apiData={res.data} /> );
  })
  .catch(e => console.log(e))
