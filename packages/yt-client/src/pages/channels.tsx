import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Header } from '../components/header.tsx'
import { ChannelsTable } from '../components/channels-table.tsx'
import { AddChannelDialog } from '../components/add-channel-dialog.tsx'

export function ChannelsPage() {
  const queryClient = useQueryClient()
  const [addOpen, setAddOpen] = useState(false)

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Container className="py-6">
        <ChannelsTable />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="contained" onClick={() => setAddOpen(true)}>
            Добавить
          </Button>
          <IconButton color="primary" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </div>

        <AddChannelDialog open={addOpen} onClose={() => setAddOpen(false)} />
      </Container>
    </div>
  )
}
