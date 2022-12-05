const APP_URL = process.env.NEXT_PUBLIC_APP_URL

// TODO: update for post data
const fetcher = (url: string, queryParams = '') =>
  fetch(`${APP_URL}${url}${queryParams}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': '*',
    },
  }).then((res) => res.json())

export default fetcher
