import { useState } from 'react'
import { Header } from "../../components/header.jsx"

function App() {
  return (
    <>
      <Header />
      <main className='w-screen h-screen grid grid-cols-2'>
        <div className='border-2 border-dashed h-screen flex-row justify-center p-10'>
          <div>
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an item</label>
                  <select id="products" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Choose a country</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" min='1' />
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar</button>
            </form>
          </div>
          <div className='mt-10 flex justify-center'>
            <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Product name</h5>
              </a>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>
                  Price product
                </li>
                <li>
                  Without tax
                </li>
                <li>
                  Available
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className='bg-emerald-200 border-dashed pt-10 flex-row justify-center items-center'>
          <div className='flex justify-evenly'>
            <div className="w-96 h-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cart</h5>
                </a>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <li>
                    P x7 units
                  </li>
                  <li>
                    P x8 units
                  </li>
                  <li>
                    P x9 units
                  </li>
                </ul>
              </div>
              <div className="pt-32">
                <p className="text-2xl text-gray-900 dark:text-white">Total:</p>
                <p className="text-2xl text-gray-900 dark:text-white">Taxes:</p>
              </div>
            </div>
            <div className="flex justify-evenly pt-80">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Finish buy</button>
              <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Clean cart</button>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
