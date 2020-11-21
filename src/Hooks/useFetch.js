import { useState, useEffect } from "react"

export const useFetch = (url) => {
  const [response, setResponse] = useState({
    data: { response_code: 0, result: [] },
    loading: true,
    error: false,
  })
  const sendRequest = async (url) => {
    setResponse({ data: { response_code: 0, result: [] }, loading: true, error: false })
    let response = await fetch(url)
    if (response.status >= 200 && response.status <= 299) {
      let data = await response.json()
      return data
    } else {
      throw new Error(response.statusText)
    }
  }
  useEffect(() => {
    sendRequest(url)
      .then((response) => {
        setResponse({ data: response, loading: false, error: false })
      })
      .catch((error) => {
        setResponse({ data: null, loading: false, error: true })
        console.log(error)
      })
  }, [url])
  return response
}
