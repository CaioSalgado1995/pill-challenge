import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import { NumberFormat } from 'react-number-format';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/medicines?url=https://www.drogasil.com.br/neosaldina-30-drageas.html');
        console.log(response.data.image)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAmountChange = (values) => {
    
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '0 auto' }}>
      <header style={{ maxWidth: '100%', display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginRight: '10px' }} />
      </header>
        <div className="App" style={{ display: 'flex' }}>
          <div style={{ flex: '1', paddingRight: '10px' }}>
            <img 
              src={data.image} 
              alt="Imagem do medicamento"
              style={{ width: '50%', maxWidth: '100%' }}/>
          </div>
          <div style={{ flex: '1', paddingLeft: '10px' }}>
            <h1>{data.name}</h1>
            <br></br>
            <p>{data.barcode} - {data.brand}</p>
            <br></br>
            <p>{data.price}</p>
            <br></br>
          </div>
      </div>
      <footer style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginLeft: '10px' }} />
      </footer>
    </div>
    
  );
}

export default App;
