import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { router } from './router.tsx'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
  },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
