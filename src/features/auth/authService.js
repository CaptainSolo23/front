import axios from 'axios'
const API_URL = 'https://beautiful-moth-loincloth.cyclic.cloud/api/users'

const registrar = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}

// hacer login
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// hacer logout
const logout = () => {
  localStorage.removeItem('user')
}

// exportamos
const authService = {
  registrar,
  login,
  logout
}

export default authService
