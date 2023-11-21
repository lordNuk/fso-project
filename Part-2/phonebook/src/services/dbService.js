import axios from 'axios'

const baseUrl = 'http://localhost:3002/persons';

const getAll = () => {
  const result = axios.get(baseUrl);
  return result
    .then(res => {
      return {
      persons: res.data, 
      message: "retrived data successfully",
    }})
    .catch(e => {
      return {
      message: `error type: ${e.name}\nmessage: ${e.message}`,
      presons: null,
    }})
}
const insert = (obj) => {
  const result = axios.post(baseUrl, obj);
  return result
    .then(res => {
      return {
        data: res.data,
        message: `${res.data.name} added successfully`,
      }
    })
    .catch(e => {
      return {
        data: null,
        message: e.message,
      }
  })
}
const replace = (obj) => {
  const result = axios.put(baseUrl+'/'+obj.id, obj);
  return result
    .then(res => {
      return {
        data: res.data,
        message: `${res.data.name} updated successfully`,
      }
    })
    .catch(e => {
      return {
        data: null,
        message: `Information of ${obj.name} has already been removed from the server.`,
        status: e.response.status,
      }
  })
}
const remove = (id) => {
  const result = axios.delete(baseUrl + '/' + id);
  return result
    .then(res => res.status)
    .catch(e => e.response.status )
}

export default {getAll, insert, remove, replace};
