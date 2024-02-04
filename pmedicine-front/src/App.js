import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { TextField } from "@mui/material";

function ErrorMessage({ message }) {
  return <div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '25vh', // Set to full height of the viewport
      color: 'red'}}
    >
    {message}
  </div>;
}

function MedicineData({ data }) {

  const materialUITextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Valor do produto",
    multiline: true,
    maxRows: 4,
    variant: "filled"
  };

  return (
    <div className="medicine-data" style={{ display: 'flex' }}>
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
          disabled={true}
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
  )
}

function PillLogo() {
  const pillLogo = "https://pill.com.br/cdn/shop/t/51/assets/header-union.svg?v=4551551774730843711689454729"

  return <img src={pillLogo} alt="Logo" style={{ width: '100px', marginRight: '10px' }} />
}

function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [textInput, setTextInput] = useState('');
  const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:4001';
  

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`${apiHost}/api/medicines?url=${textInput}`);
      setTextInput('')
      if(response.status !== 200) {
        setError(response.data.code)
      } else {
        setError(null);
        setData(response.data);
      }
    } catch (error) {
      setData(null)
      setError(error.response.data.message)
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ maxWidth: '100%', display: 'flex', alignItems: 'center' }}>
        <PillLogo/>
      </header>
        { error && <ErrorMessage message={error}/> }
        <div className="App" style={{ display: 'flex', paddingBottom: '50px' }}>
          <div style={{ flex: '1'}}>
            <input
              type="text"
              value={textInput}
              onChange={handleTextChange}
              placeholder="Digite a url aqui"
              style={{ width: '80%', boxSizing: 'border-box', padding: '8px', margin: '16px' }}
            />
            <button 
              onClick={handleButtonClick}
              style={{ boxSizing: 'border-box', padding: '8px'}}>
                Buscar
              </button>
            { data && <MedicineData data={data} /> }
          </div>
      </div>
      <footer style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
        <PillLogo/>
      </footer>
    </div>
    
  );
}

export default App;
