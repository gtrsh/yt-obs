import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import { useNavigate } from '@tanstack/react-router'
import { fetchChannels, updateChannel, type Channel } from '../api/channels.ts'

const SKELETON_ROWS = 3

const statusColorMap: Record<Channel['status'], 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  PENDING: 'default',
  UPDATING: 'primary',
  ACTIVE: 'success',
  NOT_FOUND: 'warning',
  ERROR: 'error',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ChannelsTable() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: channels, isLoading, error } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
    refetchInterval: 5000,
  })

  const updateMutation = useMutation({
    mutationFn: updateChannel,
    onSuccess: (updated) => {
      queryClient.setQueryData<Channel[]>(['channels'], (old) =>
        old?.map((ch) => (ch.id === updated.id ? updated : ch)),
      )
    },
  })

  const handleDetails = (id: string) => {
    navigate({ to: '/channel/$channelId', params: { channelId: id } })
  }

  if (isLoading) {
    return (
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Создано</TableCell>
              <TableCell>Обновлено</TableCell>
              <TableCell>Обновление данных</TableCell>
              <TableCell>Подробнее</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: SKELETON_ROWS }, (_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton width={80} /></TableCell>
                <TableCell><Skeleton width={120} /></TableCell>
                <TableCell><Skeleton width={120} /></TableCell>
                <TableCell><Skeleton width={100} /></TableCell>
                <TableCell><Skeleton width={100} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  if (error) {
    return <Alert severity="error">Не удалось загрузить каналы</Alert>
  }

  if (!channels?.length) {
    return <Typography color="text.secondary">Каналы не найдены</Typography>
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Создано</TableCell>
            <TableCell>Обновлено</TableCell>
            <TableCell>Обновление данных</TableCell>
            <TableCell>Подробнее</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id} hover>
              <TableCell>{channel.url}</TableCell>
              <TableCell>
                <Chip
                  label={channel.status}
                  color={statusColorMap[channel.status]}
                  size="small"
                  variant="filled"
                />
              </TableCell>
              <TableCell>{formatDate(channel.createdAt)}</TableCell>
              <TableCell>{formatDate(channel.updatedAt)}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={channel.status !== 'ACTIVE' || (updateMutation.isPending && updateMutation.variables === channel.id)}
                  onClick={() => updateMutation.mutate(channel.id)}
                >
                  {updateMutation.isPending && updateMutation.variables === channel.id
                    ? 'Обновление...'
                    : 'Обновить'}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDetails(channel.id)}
                >
                  Подробнее...
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
