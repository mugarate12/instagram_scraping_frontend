import axios from "axios"

console.log(process.env.BASE_URL);

const api = axios.create({
  baseURL: String(process.env.BASE_URL)
})

export default api