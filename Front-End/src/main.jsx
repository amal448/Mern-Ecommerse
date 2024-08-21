import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { store } from '../../Front-End/src/redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      {/* <React.StrictMode> */}
    <RouterProvider router={router}/>
  {/* </React.StrictMode>, */}
  </Provider>

)
