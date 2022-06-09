import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function PhoneList() {
    const [listPhones, setListPhones] = useState([])
    useEffect(() => {
        try {
          api.get(`https://phones--melhorcom.repl.co/phone/`)
          .then((response) => {
             setListPhones(response.data)
            
          });
        } catch (error) {
          console.log(error)
        }
        
      }, [])
      while(listPhones.length <= 0) {
          return <h1>Carregando página</h1>
      }
    return(
        <div>
            <h1>lista de celulares</h1>
            <header>
        <h1>Produtos</h1>
        <Link to="/create">
          <button>ADICIONAR</button>
        </Link>
      </header>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo</th>
            <th>Preço</th>
            <th>Marca</th>
            <th>Cor</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {listPhones.map((data) => (
            <tr key={data._id}>
              <td>{data.code}</td>
              <td>{data.model}</td>
              <td>{data.price}</td>
              <td>{data.brand}</td>
              <td>{data.color}</td>
              <td>
                <Link to={`/update/${data._id}`}>
                  <button></button>  
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}