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


function Categories() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    )
}

const api = new CategoriesApi();

function Main() {
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit } = useForm();

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => api.categories().then((res) => {
            setCategories(res)
        })
    })

    if (isPending) return 'Blah'
    if (error) return "puta query pariu"

    const usePostData = useMutation({
        mutationFn: async (category) => {
            let data = await api.create(category).then((res) => {
                console.log(res)
            })
            return data
        },
        onSuccess: (res) => {
            console.log(res)
            queryClient.fetchQuery('repoData')
        }
    });

    const deleteCategory = useMutation({
        mutationFn: async (id) => {
            let data = await api.delete(id).then((res) => {
                console.log(res)
            })
            return data
        },
        onSuccess: () => {
            queryClient.fetchQuery('repoData');
        }
    })


    return (
        <>
            <Header />
            <main className="h-screen bg-gray-100 grid grid-cols-2">
                <div className='flex justify-center pt-10'>
                    <div>
                        <form onSubmit={handleSubmit((data) => {
                            usePostData.mutateAsync({ name: data.name, tax: parseFloat(data.tax), code: uid(10) })
                        })}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Drinks" required {...register("name", { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Taxes (%)</label>
                                    <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15" min='1' step="0.1" {...register("tax", { required: true })} />
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                        </form>
                    </div>
                </div>
                <div className="border flex pt-10 justify-center">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Taxes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item) =>
                                    <tr className="hover:bg-red-300 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.code} onClick={() => {
                                        deleteCategory.mutateAsync(item.code)
                                    }}>
                                        <td className="px-6 py-4">
                                            {item.code}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.tax}%
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Categories
