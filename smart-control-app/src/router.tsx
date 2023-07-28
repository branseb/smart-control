import { Navigate } from "react-router-dom";
import { App } from "./App";
import { DetailPage } from "./pages/detailPage";
import { ErrorPage } from "./pages/errorPage";
import { HomePage } from "./pages/homePage";

export const routes = [
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
]