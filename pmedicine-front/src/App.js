import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { TextField } from "@mui/material";

function ErrorMessage({ message }) {
  return <div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh', // Set to full height of the viewport
      color: 'red'}}
    >
    {message}
  </div>;
}

function App() {

  const materialUITextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Valor do produto",
    multiline: true,
    maxRows: 4,
    variant: "filled"
  };

  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/medicines?url=https://www.drogasil.com.br/neosaldina-30-drageas.html');
        console.log(response.data.image)
        if(response.status != 200) {
          setError(response.data.code)
        } else {
          setData(response.data);
        }
      } catch (error) {
        setError("Erro ao obter dados da API")
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '0 auto' }}>
      <header style={{ maxWidth: '100%', display: 'flex', alignItems: 'center' }}>
        <img src="https://pill.com.br/cdn/shop/t/51/assets/header-union.svg?v=4551551774730843711689454729" alt="Logo" style={{ width: '100px', marginRight: '10px' }} />
      </header>
      { error ? (
            <ErrorMessage message={error}/>
          ) : (
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
              <NumericFormat 
                disabled="true"
                value={data.price} 
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                prefix="R$"
                defaultValue={0.00}
                customInput={TextField}
                {...materialUITextFieldProps}
                />
              <br></br>
            </div>
        </div>
      )}
      <footer style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <img src="https://pill.com.br/cdn/shop/t/51/assets/header-union.svg?v=4551551774730843711689454729" alt="Logo" style={{ width: '100px', marginLeft: '10px' }} />
      </footer>
    </div>
    
  );
}

export default App;
