import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/lists'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    console.log("frontend responsedata", response.data)
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (code, newObject) => {
  const request = axios.put(`${baseUrl}/${code}`, newObject)
  return request.then(response => response.data)
}

const dele = (code) => {
    const deleUrl = baseUrl + "/" + code
    axios.delete(deleUrl)
}
export default { getAll, create, update, dele }