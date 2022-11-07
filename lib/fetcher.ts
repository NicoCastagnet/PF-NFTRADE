// TODO: update for post data
const fetcher = (url: string, queryParams = '') =>
  fetch(`${url}${queryParams}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': '*',
    },
  }).then((res) => res.json())

export default fetcher
