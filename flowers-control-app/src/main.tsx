import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { ErrorPage } from './pages/errorPage.tsx'
import { DetailPage } from './pages/detailPage.tsx'
import { HomePage } from './pages/homePage.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config.ts';
import { theme } from './theme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'home',
				element: <HomePage />
			},
			{
				path: 'detail/:id',
				element: <DetailPage />
			},
			{
				path: '*',
				element: <Navigate to={'/home'} />,
			},
			{
				path: '',
				element: <Navigate to={'/home'} />,
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<ThemeProvider theme={theme}>
			<GoogleOAuthProvider clientId={config.clientId}>
				<CssBaseline>
					<RouterProvider router={router} />
				</CssBaseline>
			</GoogleOAuthProvider>
		</ThemeProvider>
)
