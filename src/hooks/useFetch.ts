/* eslint-disable consistent-return */
export function useFetch() {
  const request = async (url: string) => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return { request }
}

export function useAllFetch() {
  const request = async (fetchPromises: Promise<Response>[]) => Promise.all(fetchPromises)
    .then(responses =>
      Promise.all(responses.map(response => response.json()))
    )
    .catch(error => {
      console.error('Произошла ошибка при выполнении запросов:', error);
    });

  return { request };
}

