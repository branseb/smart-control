import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './pages/errorPage.tsx'
import { DetailPage } from './pages/detailPage.tsx'
import { HomePage } from './pages/homePage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path:'home',
        element:<HomePage/>
      },
      {
        path: 'detail/:id',
        element: <DetailPage />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
