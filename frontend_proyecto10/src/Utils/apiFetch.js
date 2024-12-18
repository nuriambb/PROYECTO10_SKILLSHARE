export async function apiFetch(endpoint, options = {}) {
  const baseUrl = 'http://localhost:3000/api/v1'
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

  try {
    console.log('URL completa:', `${baseUrl}${endpoint}`)
    console.log('Configuración de la solicitud:', config)
    const response = await fetch(`${baseUrl}${endpoint}`, config)

    let responseData

    try {
      responseData = await response.json()
    } catch (e) {
      console.error('Detalles del error:', error.message)
      responseData = null
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || 'Error en la solicitud'
      throw new Error(errorMessage)
    }

    return responseData || response
  } catch (error) {
    console.error('Error en fetch:', error.message)
    throw error
  }
}
