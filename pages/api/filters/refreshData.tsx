export default async function refreshData(url) {
  return await fetch(url).then((res) => res.json())
}
