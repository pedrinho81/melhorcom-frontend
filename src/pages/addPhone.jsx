import { useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

export default function AddPhone() {
    const [values, setValues] = useState()

    const handleChangeValues = (value) => {
        if (value.target.name === "date" || value.target.name === "endDate") {
            const invalidDate = value.target.value;
            const [year, month, day] = invalidDate.split("-");
            const date = `${day}/${month}/${year}`
            setValues(prevValue => ({
                ...prevValue,
                [value.target.name]: date,
            }))
        } else {
            setValues(prevValue => ({
                ...prevValue,
                [value.target.name]: value.target.value,
            }));

        }

        console.log(values)

    }

    const [code, setCode] = useState(1)

    const [status, setStatus] = useState({
        type: "",
        message: ""
    })


    const handleClickButton = () => {

        function validate() {
            if (!values.name) return setStatus({
                type: "error",

            })
        }

        try {
            api.post("/phone", {
                model: values.model,
                price: parseInt(values.price),
                brand: values.brand,
                color: values.color,
                date: values.date,
                endDate: values.endDate,
                code: code
            })
            console.log("Phone cadastrado")
        } catch (error) {
            console.log(error + "Phone não cadastrado!")
        }

    }
    return (
        <div className="flex flex-col justify-around gap-2">
            <h1 className="text-center font-bold text-xl py-6">Detalhes do produto</h1>
            <div className="flex justify-between">
            <label className="">
                Modelo
                <input type="text"
                    name='model'
                    placeholder='XT2041-1'
                    onChange={handleChangeValues}

                className="border-2"/>
            </label>
            
            <label>
                Marca
                <input type="text"
                    name='brand'
                    placeholder='Motorola'
                    onChange={handleChangeValues}
                    className="border-2" />
            </label>
            </div>
            <div className="flex justify-between">
            <label>
                Cor
                <select name="color"
                    onChange={handleChangeValues}
                    defaultValue="BLACK"
                    className="border-2">
                    <option value="BLACK">Preto</option>
                    <option value="WHITE">Branco</option>
                    <option value="GOLD">Dourado</option>
                    <option value="PINK">Rosa</option>
                </select>
            </label>

            <label>
                Preço
                <input type="number"
                name='price'
                min={0}
                placeholder='1400,00'
                onChange={handleChangeValues}
                className="border-2" />
            </label>
            </div>
            
            <div className="flex justify-between">
            <label>
                Início das vendas
                <input type="date"
                name='date'
                onChange={handleChangeValues}
                className="border-2" />
            </label>
            <label>
                Fim das vendas
                <input type="date"
                name='endDate'
                onChange={handleChangeValues}
                className="border-2" />
            </label>
            </div>
            
           <label>
                código
                <input type="number"
                name='code'
                onChange={handleChangeValues}
                value={code}
                disabled={true}
                className="border-2" />
           </label>
            
        <div className="flex justify-end">
             <button onClick={() => {
                handleClickButton();
                setCode(() => {
                    code + 1
                });
                console.log(code)
            }}>Cadastrar</button>
            <Link to={"/"}>
                <button>Voltar</button>
            </Link>
        </div>
           

        </div>

    )
}