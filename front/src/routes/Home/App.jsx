import { useState, useEffect } from 'react'
import { set, useForm } from 'react-hook-form'
import { OrderApi, ProductsApi } from '../../api/apis.js'
import { Header } from "../../components/header.jsx"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from 'react-query'
import { uid } from "uid";

const queryClient = new QueryClient();
const apiOrders = new OrderApi();
const apiProducts = new ProductsApi();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

function Main() {
  const [cart, setCart] = useState([])
  const [finalInfo, setFinal] = useState({})
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelected] = useState({})
  const { register, handleSubmit, reset } = useForm();

  const { isPending: isPendingProducts, error: errorProducts } = useQuery({
    queryKey: ['productsData'],
    queryFn: () => apiProducts.products().then((res) => {
      setProducts(res)
    })
  })

  const setProduct = (e) => {
    let a = products.find((item) => item.code == e.target.value)
    setSelected(a)
  }

  const getProduct = (id) => {
    return products.find((item) => item.code == id)
  }

  const addToCart = (product) => {
    if (selectedProduct === 0) {
      console.log("Please select a product and quantity before adding.");
      return;
    }

    const updatedCart = [...cart]; // Create a copy to avoid mutation
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.product.code === product.product.code
    );

    if (existingProductIndex !== -1) {
      // Update quantity for existing product
      if (updatedCart[existingProductIndex].quantity + product.bought > product.product.amount) {
        alert("There are no more stock Available for this product")
        return;
      } else {
        updatedCart[existingProductIndex].quantity =
          updatedCart[existingProductIndex].quantity + product.bought;
      }
    } else {
      // Add new product to cart
      updatedCart.push({
        product: product.product,
        quantity: product.bought,
      });
    }

    let finalPrice = 0
    let finalTax = 0
    updatedCart.forEach((item) => {
      finalPrice += parseFloat(item.product.price * item.quantity)
      finalTax += parseFloat(item.product.tax_value * item.quantity)
    })
    setFinal({
      finalPrice,
      finalTax
    })
    setCart(updatedCart); // Update state to trigger re-render  
  };

  const finish = () => {
    if (cart.length < 1) {
      alert("Pleasy buy something.");
      throw new Error("otto");
    }

    setSelected("")
    setCart([])
    setFinal([])

    console.log("finishing")
    let data = new FormData();
    data.append("tax", finalInfo.finalTax);
    data.append("total", finalInfo.finalPrice);
    data.append("code", uid(8).replace(/[a-zA-Z]/gm, ""));

    apiOrders.createOrder(data, cart)
    reset()
  }

  if (isPendingProducts) return "Loading";
  if (errorProducts) return "Sorry, something went wrong"

  return (
    <>
      <Header />
      <main className='w-screen h-screen grid grid-cols-2'>
        <div className='border-2 border-dashed h-screen flex-row justify-center p-10'>
          <div>
            <form onSubmit={handleSubmit((data) => {
              console.log(data)
              addToCart({ product: getProduct(data.selectedProductInput), bought: parseInt(data.bought) })
            })}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an item</label>
                  <select {...register('selectedProductInput')} id="products" defaultValue={0} onChange={(e) => { setProduct(e) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="0" disabled>Select something</option>
                    {products.map((item) => {
                      if (item.amount > 0) {
                        return <option key={item.code} value={parseInt(item.code)}>{item.name}</option>
                      } else {
                        return <option key={item.code} value={parseInt(item.code)} disabled>{item.name} (NO STOCK)</option>
                      }
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="Quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input {...register('bought')} defaultValue={1} type="number" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" min='1' max={selectedProduct.amount} />
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </form>
          </div>
          <div className='mt-10 flex justify-center'>
            <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{selectedProduct.name}</h5>
              </a>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>
                  {/* dont forget to do the quantity calc */}
                  Price: ${selectedProduct.products_without_tax}
                </li>
                <li>
                  Without taxes: ${selectedProduct.price}
                </li>
                <li>
                  x{selectedProduct.amount} Available
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
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" >
                  {cart.length === 0 ? (
                    <li>Your cart is empty.</li>
                  ) : (
                    cart.map((item) => (
                      <li key={item.product.code}>
                        {item.product.name} x {item.quantity}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="pt-32">
                <p className="text-2xl text-gray-900 dark:text-white">Total: ${finalInfo.finalPrice?.toFixed(2)}</p>
                <p className="text-2xl text-gray-900 dark:text-white">Taxes: ${finalInfo.finalTax?.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-evenly pt-80">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => {
                finish()
              }}>Finish buy</button>
              <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => {
                setCart([])
                setSelected("")
                setFinal([])
                reset()
              }}>Clean cart</button>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default App
