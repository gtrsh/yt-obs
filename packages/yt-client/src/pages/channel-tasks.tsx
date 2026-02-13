import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import { Header } from '../components/header.tsx'
import { fetchChannelTasks } from '../api/channels.ts'

const statusColorMap: Record<string, 'default' | 'primary' | 'success' | 'error'> = {
  PENDING: 'default',
  PROCESSING: 'primary',
  COMPLETED: 'success',
  FAILED: 'error',
}

const typeColorMap: Record<string, 'info' | 'secondary'> = {
  CREATE: 'info',
  UPDATE: 'secondary',
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

const SKELETON_ROWS = 3

export function ChannelTasksPage() {
  const { channelId } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data: channelTasks, isLoading, error } = useQuery({
    queryKey: ['channel-tasks', channelId],
    queryFn: () => fetchChannelTasks(channelId!),
    enabled: !!channelId,
    refetchInterval: 5000,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Container className="py-6">
        <Breadcrumbs className="mb-4">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate({ to: '/' })
            }}
          >
            Каналы
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/channel/${channelId}`}
            onClick={(e) => {
              e.preventDefault()
              navigate({ to: '/channel/$channelId', params: { channelId: channelId! } })
            }}
          >
            {channelId}
          </Link>
          <Typography color="text.primary">Задачи</Typography>
        </Breadcrumbs>

        {error && <Alert severity="error">Не удалось загрузить задачи канала</Alert>}

        {isLoading && (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={50}>#</TableCell>
                  <TableCell width={130}>Тип</TableCell>
                  <TableCell width={130}>Статус</TableCell>
                  <TableCell>Ошибка</TableCell>
                  <TableCell width={160}>Создана</TableCell>
                  <TableCell width={160}>Обновлена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: SKELETON_ROWS }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton width={30} /></TableCell>
                    <TableCell><Skeleton width={90} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton width={120} /></TableCell>
                    <TableCell><Skeleton width={120} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {channelTasks && !channelTasks.length && (
          <Typography color="text.secondary">Задачи не найдены</Typography>
        )}

        {channelTasks && channelTasks.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" className="mb-3">
              Всего задач: {channelTasks.length}
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={50}>#</TableCell>
                    <TableCell width={130}>Тип</TableCell>
                    <TableCell width={130}>Статус</TableCell>
                    <TableCell>Ошибка</TableCell>
                    <TableCell width={160}>Создана</TableCell>
                    <TableCell width={160}>Обновлена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {channelTasks.map((task, index) => (
                    <TableRow key={task.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.type}
                          color={typeColorMap[task.type] ?? 'default'}
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          color={statusColorMap[task.status] ?? 'default'}
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        {task.error ? (
                          <Typography variant="body2" color="error" sx={{ fontSize: '0.8rem' }}>
                            {task.error}
                          </Typography>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell>{formatDate(task.createdAt)}</TableCell>
                      <TableCell>{formatDate(task.updatedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </div>
  )
}
