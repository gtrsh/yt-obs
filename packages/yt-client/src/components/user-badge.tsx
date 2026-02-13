import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { getUsername } from '../lib/auth.ts'

export function UserBadge() {
  const name = getUsername()
  const initial = name?.charAt(0).toUpperCase() ?? '?'

  return (
    <div className="flex items-center gap-2 mr-4">
      <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
        {initial}
      </Avatar>
      <Typography variant="subtitle1" fontWeight={600} color="text.primary">
        {name}
      </Typography>
    </div>
  )
}
