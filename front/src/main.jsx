import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/Home/App.jsx'
import History from './routes/History/History.jsx'
import Categories from './routes/Categories/Categories.jsx'
import Products from './routes/Products/Products.jsx'
import Auth from './routes/Auth/Auth.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import PrivateRoute from './routes/config/PrivateRoutes.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export const userState = atom({
  key: 'userState',
  default: '',
});


import './index.css'

function HistoryWithProtection() {
  return (<PrivateRoute><History /></PrivateRoute>)
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App /></PrivateRoute>
  },
  {
    path: "/history",
    element: <HistoryWithProtection />
  },
  {
    path: "/categories",
    element: <PrivateRoute><Categories /></PrivateRoute>
  },
  {
    path: "/products",
    element: <PrivateRoute><Products /></PrivateRoute>
  },
  {
    path: "/login",
    element: <Auth />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </AuthProvider>
  </React.StrictMode>,
)
