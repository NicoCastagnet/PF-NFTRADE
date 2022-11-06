import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'

const DemoPayment: NextPage = () => {
  const [data, setData] = useState({ quantity: 0, unit_price: 0, idUser: 'cla4vgl930000py3rf0f4hi6n'})

  const payment = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:3000/api/payments', data)
    console.log(res.data.payment)
  }

  console.log(data)

  return (
    <section className="flex items-center text-center justify-center w-full h-screen bg-slate-800">
      <form action="submit" className="m-5" onSubmit={(e) => payment(e)}>
        <input
          type="text"
          placeholder="quantity"
          className="m-5"
          onChange={(e) =>
            setData((value) => ({
              ...value,
              quantity: parseInt(e.target.value),
            }))
          }
        />
        <input
          type="text"
          placeholder="price"
          className="m-5"
          onChange={(e) =>
            setData((value) => ({
              ...value,
              unit_price: Number(e.target.value),
            }))
          }
        />
        <button type="submit" className="bg-green-500">
          Submit
        </button>
      </form>
    </section>
  )
}

export default DemoPayment
