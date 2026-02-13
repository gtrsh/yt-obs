import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { createChannel } from '../api/channels.ts'

interface AddChannelDialogProps {
  open: boolean
  onClose: () => void
}

export function AddChannelDialog({ open, onClose }: AddChannelDialogProps) {
  const queryClient = useQueryClient()
  const [url, setUrl] = useState('')

  const mutation = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      setUrl('')
      onClose()
    },
  })

  const handleSubmit = () => {
    const trimmed = url.trim()
    if (!trimmed) return
    mutation.mutate(trimmed)
  }

  const handleClose = () => {
    if (mutation.isPending) return
    setUrl('')
    mutation.reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить канал</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="YouTube URL"
          placeholder="https://www.youtube.com/@channel"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={mutation.isPending}
          error={mutation.isError}
          helperText={mutation.isError ? 'Не удалось добавить канал' : undefined}
          className="mt-2"
        />
        <div className="mt-4 flex justify-end">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!url.trim() || mutation.isPending}
          >
            Добавить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
