import { useNavigate } from '@tanstack/react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { removeToken } from '../lib/auth.ts'
import { UserBadge } from './user-badge.tsx'

export function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate({ to: '/login' })
  }

  return(
    <AppBar position="static" color="default" variant="outlined" elevation={0}>
      <Toolbar>
        <Typography variant="h6" className="grow">
          Yt-Obs
        </Typography>
        <UserBadge />
        <Button variant="outlined" size="medium" className="ml-2" onClick={handleLogout}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  )
}
