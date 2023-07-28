import { CssBaseline, ThemeProvider } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { config } from './config.ts'
import { routes } from './router.tsx'
import { theme } from './theme.ts'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider theme={theme}>
		<GoogleOAuthProvider clientId={config.clientId}>
			<CssBaseline>
				<RouterProvider router={router} />
			</CssBaseline>
		</GoogleOAuthProvider>
	</ThemeProvider>
)
