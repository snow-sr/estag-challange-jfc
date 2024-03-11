import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/Home/App.jsx'
import History from './routes/History/History.jsx'
import Categories from './routes/Categories/Categories.jsx'
import Products from './routes/Products/Products.jsx'
import Auth from './routes/Auth/Auth.jsx'


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


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/history",
    element: <History />
  },
  {
    path: "/categories",
    element: <Categories />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/login",
    element: <Auth />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)
