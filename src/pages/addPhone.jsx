import { useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

export default function AddPhone() {
    const [values, setValues] = useState({
        model: "",
        price: 0,
        brand: "",
        color: "",
        date: "",
        endDate: "",
        code: Math.floor(Math.random() * 100000000).toString()  //GERA NÚMERO ALEATÓRIO DE 8 DÍGITOS
    })



    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }



    const [status, setStatus] = useState({
        type: "",
        message: ""
    })


    function addPhone(e) {
        e.preventDefault();

        if (!validateForm()) return;




        const saveDataForm = () => {
            const startDate = () => {
                const invalidStartDate = values.date
                const [day, month, year] = invalidStartDate.split("-")
                const date = `${day}/${month}/${year}`
                return date
            }
            const endDate = () => {
                const invalidendDate = values.date
                const [day, month, year] = invalidendDate.split("-")
                const date = `${day}/${month}/${year}`
                return date
            }
            try {
                const startDate = () => {
                    const invalidStartDate = values.date
                    const [year, month, day] = invalidStartDate.split("-")
                    const date = `${day}/${month}/${year}`
                    return date
                }
                const endDate = () => {
                    const invalidendDate = values.endDate
                    const [year, month, day] = invalidendDate.split("-")
                    const date = `${day}/${month}/${year}`
                    return date
                }
                api.post("/phone", {
                    model: values.model,
                    price: parseInt(values.price),
                    brand: values.brand,
                    color: values.color,
                    date: startDate(),
                    endDate: endDate(),
                    code: values.code
                })
                
                return true
            } catch (error) {
                
                return false
            }
        };


        function validateForm() {
            if (values.model.length < 2 || values.model.length > 255) return setStatus({ type: "error", message: "Erro: o campo Modelo! precisa ter entre 2 e 255 caracteres!" })
            if (values.price <= 0) return setStatus({ type: "error", message: "Erro: o campo Preço precisa ser maior do que 0!" })
            if (values.brand.length < 2 || values.brand.length > 255) return setStatus({ type: "error", message: "Erro: o campo Marca precisa ter entre 2 e 255 caracteres!" })
            if (!values.color) return setStatus({ type: "error", message: "Erro: o campo Cor deve ser selecionado" })

            function isValidateDate(inputStartDate, inputEndDate) {
               
                let a = new Date(inputStartDate)
               
                let b = Date.parse(a)
                
                const convertInitDate = new Date(inputStartDate);
                const convertFinalDate = new Date(inputEndDate);
                const startDateLimit = 1545696000000   //DEFININDO EM MILISEGUNDOS A DATA DE 25/12/2018 COMO LIMITE 
                const startDate = Date.parse(convertInitDate)
                const finalDate = Date.parse(convertFinalDate) //PEGANDO O INPUT DO USUÁRIO EM MILISECUNDOS PARA SER POSSÍVEL COMPARAR COM A DATA INICIAL


                if (!startDate || !finalDate) return console.log("preencha as datas corretamente");
                if (startDate > startDateLimit && finalDate > startDate) {
                    console.log("Data correta!");
                    return true;
                } else {
                    setStatus({ type: "Error", message: "o campo Data deve ser preenchido corretamente!  Verifique os possíveis erros:  1 - Início das vendas inferior a 16/12/2018  2 - Fim das vendas inferior a Início das vendas  3 - Dados inseridos no formato diferente de (DD/MM/YYYY)" });
                    return false
                }

            }

            if (isValidateDate(values.date, values.endDate) === true) {
                return true
            } else {
                setStatus({ type: "error", message: "Preencha os campos de Data corretamente!" })
                return false
            }



            return true;
        }

        
        if (saveDataForm()) {
            setStatus({
                type: "success",
                message: "Phone cadastrado com sucesso!"
            });
            setValues({
                model: "",
                price: 0,
                brand: "",
                color: "",
                date: "",
                endDate: "",
                code: Math.floor(Math.random() * 100000000)  //GERA NÚMERO ALEATÓRIO DE 8 DÍGITOS
            })
        } else {
            setStatus({
                type: "error",
                message: "Erro: Phone não cadastrado"
            })
        }
    }
    return (
        <div className="flex flex-col justify-around gap-2">
            <h1 className="text-center font-bold text-xl py-6">Detalhes do produto</h1>
            {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}
            {status.type === "error" ? <p style={{ color: "red" }}>{status.message}</p> : ""}
            <form onSubmit={addPhone}>
                <div className="flex justify-between">
                    <label className="">
                        Modelo
                        <input type="text"
                            name='model'
                            placeholder='XT2041-1'
                            value={values.model}
                            onChange={handleChangeValues}
                            className="border-2" />
                    </label>

                    <label>
                        Marca
                        <input type="text"
                            name='brand'
                            placeholder='Motorola'
                            value={values.brand}
                            onChange={handleChangeValues}
                            className="border-2" />
                    </label>
                </div>
                <div className="flex justify-between">
                    <label>
                        Cor
                        <select name="color"
                            onChange={handleChangeValues}
                            value={values.color}
                            className="border-2">
                            <option value="">Selecione a cor</option>
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
                            value={values.price}
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
                            value={values.date}
                            onChange={handleChangeValues}
                            className="border-2"
                            min={"25-12-2018"} />
                    </label>
                    <label>
                        Fim das vendas
                        <input type="date"
                            name='endDate'
                            value={values.endDate}
                            onChange={handleChangeValues}
                            className="border-2" />
                    </label>
                </div>

                <div className="flex justify-end">
                    <button type="button" onClick={addPhone}>Cadastrar</button>




                    <Link to={"/"}>
                        <button>Voltar</button>
                    </Link>
                </div>
            </form>
        </div>

    )
}