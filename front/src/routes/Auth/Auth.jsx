import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Login } from '../../api/apis';
import { useNavigate } from "react-router-dom";
import { userState } from "../../main.jsx"
import { useRecoilState } from 'recoil';

const loginApi = new Login()

function Auth() {
    const [logged, setLogged] = useRecoilState(userState)
    const [isRegistering, setRegister] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitLogin = async (user) => {
        let request = await loginApi.login(user);

        if (request.data.status == "ok") {
            if (user.remember) {
                console.log("sim");
                setLogged(request.data.profile)
                navigate('/');
            } else {
                setLogged(request.data.profile)
                navigate('/');
            }
        } else {
            setSuccess(false)
            setError(await request.data.msg)
        }

    }

    const submitRegister = async (user) => {
        let request = await loginApi.register(user)

        if (request.data.status == "ok") {
            setSuccess(true)
            setRegister(false)
        } else {
            setSuccess(false)
            setError(await request.data.msg)
        }

    }


    return (
        <>
            <div className='h-screen bg-slate-400 flex justify-center items-center gap-8'>
                {isRegistering ? <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {error ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">Someting went wrong.</span> {error}.
                        </div> : <p></p>
                    }
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit((data) => {
                        submitRegister(data);
                    })}>
                        <h1>Register</h1>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input {...register("username")} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input {...register("pass")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required min="8" />
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <a className='hover:text-gray-900 text-gray-500 text-sm' onClick={() => {
                                setRegister(false)
                                setError(false)
                            }}>Already have an account?</a>
                        </div>
                    </form>

                </div>
                    :
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {success ?
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span className="font-medium">Success!</span> You can login now.
                            </div> : <p></p>
                        }
                        {error ?
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Someting went wrong.</span> {error}.
                            </div> : <p></p>
                        }
                        <form className="max-w-sm mx-auto" onSubmit={handleSubmit((data) => {
                            submitLogin(data);
                        })}>
                            <h1>Login</h1>
                            <div className="mb-5">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                <input {...register("username")} type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required min="8" />
                            </div>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    <input {...register("remember")} id="remember" type="checkbox" value="true" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <a className='hover:text-gray-900 text-gray-500 text-sm' onClick={() => {
                                    setRegister(true)
                                    setError(false)

                                }}>Don't have an account?</a>
                            </div>
                        </form>

                    </div>
                }
            </div >
        </>
    )
}

export default Auth
