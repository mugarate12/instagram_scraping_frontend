import axios from "axios"

const api = axios.create({
  baseURL: String(process.env.BASE_URL)
})

export default api