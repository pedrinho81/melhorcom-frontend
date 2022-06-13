import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from "../../services/api";
export default function UpdatePhone() {
    const { _id } = useParams();
    const [values, setValues] = useState({})
    useEffect(() => {
        try {
            api.get(`/phone/${_id}`)
                .then((res) => {
                    setValues(res.data)
                })
        } catch (err) {
              console.log(err)
        }
    }, [])

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

    function updatePhone(e) {
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
                api.patch(`/phone/${_id}`, {
                    model: values.model,
                    price: parseInt(values.price),
                    brand: values.brand,
                    color: values.color,
                    date: startDate(),
                    endDate: endDate(),
                    code: values.code
                })
                    .then(res => res.status != 200 ? alert("Ops, tivemos erros internos, tente novamente") : alert("Produto atualizado com sucesso!"))
                return true
            } catch (error) {
                alert("Erro ao atualizar, por favor, verique todos os campos! ")
                setStatus({ type: "error", message: "Por favor, verifique a autenticidade de todos os campso!" })
                return false
            }
        };


        function validateForm() {
            if (values.model.length < 2 || values.model.length > 255) return setStatus({ type: "error", message: "Erro: o campo Modelo! precisa ter entre 2 e 255 caracteres!" })
            if (values.price <= 0) return setStatus({ type: "error", message: "Erro: o campo Preço precisa ser maior do que 0!" })
            if (values.brand.length < 2 || values.brand.length > 255) return setStatus({ type: "error", message: "Erro: o campo Marca precisa ter entre 2 e 255 caracteres!" })
            if (!values.color) return setStatus({ type: "error", message: "Erro: o campo Cor deve ser selecionado" })

            function isValidateDate(inputStartDate, inputEndDate) {

                const convertInitDate = new Date(inputStartDate);
                const convertFinalDate = new Date(inputEndDate);
                const startDateLimit = 1546221600000 //DEFININDO EM MILISEGUNDOS A DATA DE 31/12/2018 COMO LIMITE 
                const startDate = Date.parse(convertInitDate);
                const finalDate = Date.parse(convertFinalDate); //PEGANDO O INPUT DO USUÁRIO EM MILISECUNDOS PARA SER POSSÍVEL COMPARAR COM A DATA INICIAL

                console.log(startDate)
                console.log(startDateLimit)
                if (!startDate || !finalDate) return alert("preencha as datas corretamente");
                if (startDate > startDateLimit && finalDate > startDate) {
                    console.log("Datas válidas!");
                    return true;
                } else {
                    return false
                }

            }

            if (isValidateDate(values.date, values.endDate) === true) {
                return true
            } else {
                alert("ERRO: O campo data precisa atender a alguns requisitos como: \n 1 - Início das vendas deve ser posterior a 31/12/2018 \n 2- Fim das vendas deve ser posterior ao campo Início das vendas \n 3 - Data deve ser inserida no formato (dd/MM/yyyy) ")
                setStatus({ type: "error", message: "Preencha os campos de Data corretamente!" })
                return false
            } 
        }


        if (saveDataForm()) {
            setStatus({
                type: "success",
                message: "Produto atualizado com sucesso!"
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
                message: "Erro: Phone não atualizado"
            })
        }
    }
    return (
        <div className="flex flex-col justify-center  gap-2">
            <h1 className="text-center font-bold text-xl py-6">Detalhes do produto</h1>
            <div className="">
                {status.type === "success" ? <p className="text-center text-md text-green-600">{status.message}</p> : ""}
                {status.type === "error" ? <p className="text-center text-md underline text-red-600">{status.message}</p> : ""}
                <form onSubmit={updatePhone}
                    className="flex flex-wrap gap-7 justify-center  md:w-[85%]">
                    <div className="flex flex-col gap-1 justify-between">
                        <label className="font-semibold">Modelo</label>
                        <input type="text"
                            name='model'
                            placeholder='XT2041-1'
                            value={values.model || ""}
                            onChange={handleChangeValues}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2" />

                        <label className="font-semibold">Cor </label>
                        <select name="color"
                            onChange={handleChangeValues}
                            value={values.color || ""}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2">
                            <option value="">Selecione a cor</option>
                            <option value="BLACK">Preto</option>
                            <option value="WHITE">Branco</option>
                            <option value="GOLD">Dourado</option>
                            <option value="PINK">Rosa</option>
                        </select>

                        <label className="font-semibold">Início das vendas</label>
                        <input type="date"
                            name='date'
                            value={values.date || ""}
                            onChange={handleChangeValues}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2"
                            min={"25-12-2018"} />
                    </div>

                    <div className="flex gap-1 mt-1 flex-col">
                        <label className="font-semibold">Marca</label>
                        <input type="text"
                            name='brand'
                            placeholder='Motorola'
                            value={values.brand || ""}
                            onChange={handleChangeValues}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2" />

                        <label className="font-semibold">Preço</label>
                        <input type="number"
                            name='price'
                            min={0}
                            value={values.price || ""}
                            placeholder='1400,00'
                            onChange={handleChangeValues}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2" />

                        <label className="font-semibold">Fim das vendas</label>
                        <input type="date"
                            name='endDate'
                            value={values.endDate || "0000-00-00"}
                            onChange={handleChangeValues}
                            className="border-[1px] border-black w-48 rounded-[5px] py-2 placeholder:pl-2" />
                    </div>
                </form>

                <div className="flex justify-center mt-9 mb-14 laptop:ml-[13.6rem] gap-5"> 
                    <Link to={"/"}>
                        <button className="ml-1 font-semibold bg-[#DAE3ED] hover:bg-[#b7c2ce] transition-colors py-1 px-5 rounded-[5px] border-[1px] border-black">Voltar</button>
                    </Link>
                    <button type="button"
                        className="font-semibold bg-[#DAE3ED] hover:bg-[#b7c2ce] transition-colors py-1 px-5 my-auto rounded-[5px] border-[1px] border-black"
                        onClick={updatePhone}>Salvar</button>
                </div>
            </div>
        </div>
    )
}


