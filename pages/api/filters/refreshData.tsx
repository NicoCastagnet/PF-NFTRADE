export default async function refreshData(url: string) {
  return await fetch(url).then((res) => res.json())
}
