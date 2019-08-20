import axios from 'axios'

const api = axios.create({
    baseURL: 'https://tindevgit.herokuapp.com'
})

export default api
