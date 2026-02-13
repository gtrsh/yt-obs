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
import Box from '@mui/material/Box'
import { Header } from '../components/header.tsx'
import { fetchChannelData } from '../api/channels.ts'

interface VideoEntry {
  id: string
  title: string
  url: string
  duration: number | null
  view_count: number | null
  thumbnails?: Array<{ url: string; height?: number; width?: number }>
}

function formatDuration(seconds: number | null): string {
  if (seconds == null) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatViewCount(count: number | null): string {
  if (count == null) return '—'
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return String(count)
}

const SKELETON_ROWS = 5

export function ChannelVideosPage() {
  const { channelId } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data: channelData, isLoading, error } = useQuery({
    queryKey: ['channel-data', channelId],
    queryFn: () => fetchChannelData(channelId!),
    enabled: !!channelId,
  })

  const videos = (channelData?.data as VideoEntry[] | null) ?? []

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
          <Typography color="text.primary">Видео</Typography>
        </Breadcrumbs>

        {error && <Alert severity="error">Не удалось загрузить данные канала</Alert>}

        {isLoading && (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={50}>#</TableCell>
                  <TableCell width={120}>Превью</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell width={100}>Длительность</TableCell>
                  <TableCell width={100}>Просмотры</TableCell>
                  <TableCell width={120}>YouTube ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: SKELETON_ROWS }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton width={30} /></TableCell>
                    <TableCell><Skeleton variant="rounded" width={100} height={56} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton width={60} /></TableCell>
                    <TableCell><Skeleton width={60} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {channelData && !videos.length && (
          <Typography color="text.secondary">Видео не найдены</Typography>
        )}

        {videos.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" className="mb-3">
              Всего видео: {videos.length}
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={50}>#</TableCell>
                    <TableCell width={120}>Превью</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell width={100}>Длительность</TableCell>
                    <TableCell width={100}>Просмотры</TableCell>
                    <TableCell width={120}>YouTube ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {videos.map((video, index) => {
                    const thumb = video.thumbnails?.at(0)
                    return (
                      <TableRow key={video.id} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {thumb ? (
                            <Box
                              component="img"
                              src={thumb.url}
                              alt={video.title}
                              sx={{ width: 100, height: 56, objectFit: 'cover', borderRadius: 1 }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 100,
                                height: 56,
                                borderRadius: 1,
                                bgcolor: 'grey.200',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="caption" color="text.secondary">—</Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                          >
                            {video.title}
                          </Link>
                        </TableCell>
                        <TableCell>{formatDuration(video.duration)}</TableCell>
                        <TableCell>{formatViewCount(video.view_count)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            {video.id}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </div>
  )
}
