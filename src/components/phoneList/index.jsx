import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import IconPhone from "../../assets/icons/iconPhone.svg";
import IconAdd from "../../assets/icons/add.png";
import IconEdit from "../../assets/icons/edit-24px.svg";
import IconDelete from "../../assets/icons/delete-24px.svg";

export default function PhoneList() {
  const [listPhones, setListPhones] = useState([])
  useEffect(() => {
    try {
      api.get(`/phone/`)
        .then((res) => {
          setListPhones(res.data);
        });
    } catch (error) {
      console.log(error);
    }

  }, [listPhones])


  function deletePhone(_id) {
    try {
      if (confirm("Deseja deletar o produto?")) {
        api.delete(`/phone/${_id}`);
      }
    } catch (e) {
      console.error(e);
    }
    
  }

  return (
    <div className="laptop:w-[864px] md:w-[864px]  overflow-y-auto flex flex-col mx-auto">
      <header className="flex justify-evenly laptop:justify-between sm:text-pink-600 items-baseline">
        <h1 className="text-xl font-semibold mt-16 mb-4">Produtos</h1>
        <Link to="/add-phone">
          <button className="flex items-baseline  mt-16 mb-6 bg-[#DAE3ED] hover:bg-[#b7c2ce] transition-colors py-2  pr-3 pl-4 rounded-[5px] border-2 border-black">
            <img src={IconAdd} alt="ícone de sinal mais"
              className="my-auto w-4" />
            <img src={IconPhone} alt="ícone de celular"
              className="my-auto"
            />
            <span className="text-base ml-1 font-semibold">ADICIONAR</span>
          </button>
        </Link>
      </header>

      <div className="relative border-2 mb-32 border-[#1d1d1d] rounded-md overflow-x-auto  overflow-y-visible  shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left text-black ">
          <thead className="text-xs text-black uppercase bg-1">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Preço
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Cor
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listPhones.map((phone, key) => {
              return (
                <tr className="border-b-2 border-[#1d1d1d] " key={key}>
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {phone.code}
                  </td>
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {phone.model}
                  </td>
                  <td className="px-6 py-4 font-medium">        
                     {`R$ ${phone.price},00` }
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {phone.brand}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {phone.color}
                  </td>
                  <td className="px-6 py-4 text-right min-w-[78px] ">
                    <button onClick={() => deletePhone(phone._id)}>
                      <img src={IconDelete} 
                      alt="ícone de lixeira (apagar celular)"
                      className="hover:opacity-50"/>
                      
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right min-w-[78px] transition-opacity">
                    <Link to={`/update-phone/${phone._id}`}>
                      <img src={IconEdit} 
                      alt="ícone de edição (editar celular)"
                      className="hover:opacity-50"/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}