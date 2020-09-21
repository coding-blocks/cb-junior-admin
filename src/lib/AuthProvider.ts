import axios from 'axios'
import config from "../config";

type LoginCreds = {
  username: string,
  password: string
}

const ax = axios.create({
  baseURL: config.apiEndpoint,
  timeout: 2000,
})

export default {
  login,
  logout,
  checkAuth,
  checkError,
  getPermissions
}


async function login({username, password}: LoginCreds) {
  const {data: {jwt}} = await ax.post('/login', {username, password})
  localStorage.setItem("login_jwt", jwt)
}

async function logout () {
  localStorage.removeItem("login_jwt")
}

async function checkError (error: any) {
  const status = error.status;
  if (status === 401 || status === 403) {
    localStorage.removeItem('token');
    throw new Error('Unauthorized request')
  }
}

function checkAuth () {
  return localStorage.getItem("login_jwt") ? Promise.resolve() : Promise.reject()
}

function getPermissions (params: any) {
  return Promise.resolve()
}

