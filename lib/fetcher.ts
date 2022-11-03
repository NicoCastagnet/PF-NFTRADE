// TODO: update for post data
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': '*',
    },
  }).then((res) => res.json())

export default fetcher
