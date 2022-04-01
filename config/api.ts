import axios from "axios"
import dotenv from "dotenv"

const api = axios.create({
  baseURL: String(process.env.BASE_URL)
})

export default api