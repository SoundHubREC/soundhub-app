import axios from "axios";
import {URLBASE} from "@env"

const api = axios.create({
  baseURL: URLBASE
})

export default api;