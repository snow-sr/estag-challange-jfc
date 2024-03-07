import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CategoriesApi, ProductsApi } from '../../api/apis.js'
import { Header } from "../../components/header.jsx"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation
} from 'react-query'
import { uid } from "uid";

const queryClient = new QueryClient()

function Products() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    )
}

const apiCategory = new CategoriesApi();
const apiProducts = new ProductsApi();

function Main() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { register, handleSubmit } = useForm();

    const { isPending: isPendingCategories, error: errorCategories, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => apiCategory.categories().then((res) => {
            setCategories(res)
        })
    })

    const { isPending: isPendingProducts, error: errorProducts } = useQuery({
        queryKey: ['productsData'],
        queryFn: () => apiProducts.products().then((res) => {
            setProducts(res)
        })
    })


    if (isPendingCategories || isPendingProducts) return 'Loading'
    if (errorCategories || errorProducts) return 'An error has ocurred :('

    const createProductData = useMutation({
        mutationFn: async (product) => {
            let data = await apiProducts.create(product).then((res) => {
                console.log(res)
            })
            return data
        },
        onSuccess: (res) => {
            console.log(res)
            queryClient.fetchQuery('productsData')
        }
    });

    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            let data = await apiProducts.delete(id).then((res) => {
                console.log(res)
            })
            return data
        },
        onSuccess: (res) => {
            queryClient.fetchQuery('productsData')
        }
    })

    return (
        <>
            <Header />
            <main className='h-screen bg-gray-100 grid grid-cols-2'>
                <div className='flex justify-center pt-10'>
                    <div>
                        <form onSubmit={handleSubmit((data) => {
                            createProductData.mutateAsync(data)
                        })}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coca-cola" required {...register("name", { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categorie</label>
                                    <select {...register('category_code')} id="categories" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={null}>
                                        {categories.map(
                                            (item) => <option key={item.code} value={item.code}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available amount</label>
                                    <input {...register('amount')} required type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" min='1' />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input {...register('price')} required type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.50" min='1' step='0.01' />
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar</button>
                        </form>
                    </div>
                </div>
                <div className='flex pt-10'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Available on stock
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {

                                    return <tr className="hover:bg-red-200 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={product.code} onClick={() => {
                                        deleteProduct.mutateAsync(product.code)
                                    }}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            R${product.price}
                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Products
