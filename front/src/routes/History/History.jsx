import { useState } from 'react'
import { Header } from "../../components/header.jsx"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation
} from 'react-query'
import { Button, Modal } from 'flowbite-react';

import {
    OrderApi
} from "../../api/apis.js"
import axios from 'axios';
import { uid } from 'uid';

const queryClient = new QueryClient();
const apiOrders = new OrderApi();


function History() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    )
}

function Main() {
    const [details, setOpen] = useState(false)
    const [orders, setOrders] = useState([])
    const [infoId, setInfoId] = useState()
    const [info, setInfo] = useState()

    const { isPending: isPendingOrders, error: errorOrders } = useQuery({
        queryKey: ['ordersData'],
        queryFn: async () => apiOrders.getAllOrders().then((res) => {
            setOrders(res)
            return res
        })
    })

    const openModal = (id) => {
        setInfoId(id)
        apiOrders.getDetails(id).then((res) => {
            console.log(res)
            setInfo(res)
            setOpen(true)
        })
    }

    if (isPendingOrders) return (<div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>);
    if (errorOrders) return "Sorry, something went wrong"

    return (
        <>
            <Header />
            <main className='h-screen flex justify-center items-center'>
                {/* {details ?
                    <div>
                        <div id="default-modal" data-modal-toggle="static-modal" data-modal-placement="top-center" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Details
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => {
                                            setOpen(!details)
                                        }}>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 space-y-4">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                            Product name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Taxes
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                            Amount
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Price
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {info.map((item) => {
                                                        return (
                                                            <tr className="border-b border-gray-200 dark:border-gray-700" key={uid()}>
                                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                    {item.product_name}
                                                                </th>
                                                                <td className="px-6 py-4">
                                                                    ${item.order_tax}
                                                                </td>
                                                                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                                    {item.order_item_amount}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    ${item.orders_total}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> </div> : <p></p>
                } */}
                {
                    <Modal dismissible show={details} onClose={() => setOpen(false)}>
                        <Modal.Header>Details</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                Product name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Taxes
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {info?.map((item) => {
                                            return (
                                                <tr className="border-b border-gray-200 dark:border-gray-700" key={uid()}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                        {item.product_name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        ${item.order_tax}
                                                    </td>
                                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                        {item.order_item_amount}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        ${(item.order_item_price)}
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Taxes
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Total post-taxes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Buyer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((item) => {
                                return (
                                    <tr key={item.code} className="hover:bg-green-200 border-b border-gray-200 dark:border-gray-700" onClick={() => { openModal(item.code) }}>
                                        <th scope="row" className="hover:bg-green-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {item.code}
                                        </th>
                                        <td className="px-6 py-4">
                                            ${item.tax}
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            ${item.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.user_code}
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

            </main>




        </>
    )
}

export default History
