import React, {useEffect, useState} from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards";

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterHort = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      quant: values.quant,
      total: values.quant * values.cost,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        quant: values.quant,
        total: values.quant * values.cost,
    }).then((response) => {
      setListCard([
        ...listCard,
        {
          id: response.data[0].id,
          name: values.name,
          cost: values.cost,
          quant: values.quant,
          total: values.quant * values.cost,
        },
      ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };
  


  return (
    <div className="app-container" id="fundo">
      <h1 className="Nome">HortiMais</h1>
      <div className="register-container">
        
        <h1 className="register-tittle">Controle de estoque do HortiMais</h1>

        <label>Nome do produto: </label>
        <input type="text" name="name" placeholder="Nome do produto" className="register-input" onChange={handleaddValues} />

        <label>Valor do produto: </label>
        <input type="text" name="cost" placeholder="Valor" className="register-input" onChange={handleaddValues} />
        
        <label>Quantidade do produto: </label>
        <input type="text" name="quant" placeholder="Quantidade" className="register-input" onChange={handleaddValues} />
        
        <button onClick={handleRegisterHort} className="register-button">Cadastrar</button>
      </div>

      {listCard.map((val) => (
        <Card 
          listCard={listCard} 
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          quant={val.quant}
          total={val.total}
        />
      ))}
    </div>
  );
}

export default App;
