import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './Custom.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
