import { Spinner } from '../Components/spinner/spinner'
export async function apiFetch(endpoint, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
  /*const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://proyecto10-skillshare.onrender.com/api/v1'
  // const baseUrl = 'http://localhost:3000/api/v1'*/
  const token = localStorage.getItem('token')

  const defaultHeaders = {}

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  if (options.body instanceof FormData) {
    delete defaultHeaders['Content-Type']
  } else {
    defaultHeaders['Content-Type'] = 'application/json'
  }

  const config = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },

    body: options.body
  }
  showSpinner()
  try {
    console.log('URL completa:', `${baseUrl}${endpoint}`)
    console.log('Configuración de la solicitud:', config)
    const response = await fetch(`${baseUrl}${endpoint}`, config)

    console.log('Respuesta:', response)

    let responseData

    try {
      responseData = await response.json()
    } catch (e) {
      console.error('Detalles del error:', e.message)
      responseData = null
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || 'Error en la solicitud'
      throw new Error(errorMessage)
    }
    hideSpinner()
    return responseData || response
  } catch (error) {
    console.error('Error en fetch:', error.message)
    throw error
  }
}

function showSpinner() {
  const spinnerContainer = document.querySelector('.spinner')
  console.log('Mostrando spinner:', spinnerContainer)
  if (spinnerContainer) {
    spinnerContainer.style.display = 'flex'
  }
}

function hideSpinner() {
  const spinnerContainer = document.querySelector('.spinner')
  if (spinnerContainer) {
    spinnerContainer.style.display = 'none'
  }
}
