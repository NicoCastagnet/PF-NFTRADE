// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default async function refreshData(url: string) {
  return await fetch(url).then((res) => res.json())
}
