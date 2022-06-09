import axios from "axios";

const api = axios.create({
    baseURL: "https://phones--melhorcom.repl.co",
    headers: {
        cpf: "08152676497"
    },
});

export default api