import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import IconPhone from "../assets/icons/iconPhone.svg"
import IconAdd from "../assets/icons/add.png"
import IconEdit from "../assets/icons/edit-24px.svg"
import IconDelete from "../assets/icons/delete-24px.svg"

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
  while (listPhones.length <= 0) {
    return <h1>Carregando página</h1>
  } 
  return (
    <div className="laptop:w-[60%] md:w-[85%]  overflow-y-auto flex flex-col mx-auto">
      <header className="flex justify-evenly laptop:justify-between sm:text-pink-600 items-baseline">
        <h1 className="text-xl font-semibold mt-16 mb-4">Produtos</h1>
        <Link to ="/add-phone">
      <button className="flex items-baseline  mt-16 mb-6 bg-[#DAE3ED] py-2  pr-3 pl-4 rounded-[5px] border-2 border-black">
                <img src={IconAdd} alt="ícone de sinal mais"
                className="my-auto w-4" />
                <img src={IconPhone} alt="ícone de celular"
                      className="my-auto"
                      />
                <span className="text-base ml-1 font-semibold">ADICIONAR</span>
                      
              </button>
        </Link>
        
        
           
        
       
      </header>


      <div class="relative border-2 border-[#1d1d1d] rounded-md overflow-x-auto h-[35rem] overflow-y-visible mb-32 shadow-md sm:rounded-lg">
        <table class="w-full  text-sm text-left text-black ">
          <thead class="text-xs text-black uppercase bg-1">
            <tr>
              <th scope="col" class="px-6 py-3">
                Código
              </th>
              <th scope="col" class="px-6 py-3">
                Modelo
              </th>
              <th scope="col" class="px-6 py-3">
                Preço
              </th>
              <th scope="col" class="px-6 py-3">
                Marca
              </th>
              <th scope="col" class="px-6 py-3">
                Cor
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only"></span>
              </th>
             
            </tr>
          </thead>
          <tbody>
            {listPhones.map((phone, key) => {
              return (
                <tr class="border-b-2 border-[#1d1d1d] ">
                  <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                    {phone.code}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                    {phone.model}
                  </th>
                  <td class="px-6 py-4">
                    {phone.price}
                  </td>
                  <td class="px-6 py-4">
                    {phone.brand}
                  </td>
                  <td class="px-6 py-4">
                    {phone.color}
                  </td>
                  <Link to={"/update-phone"}>
                    <td class="px-6 py-4 text-right">
                      <img src={IconDelete }alt="ícone de edição" />
                    </td>
                  </Link>
                  <Link to={"/delete-phone"}>
                    <td class="px-6 py-4 text-right">
                      <img src={IconEdit} alt="ícone de lixeira" />
                    </td>
                  </Link>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>

    </div>
  )
}