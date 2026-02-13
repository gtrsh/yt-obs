import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import { Header } from '../components/header.tsx'
import { fetchChannel } from '../api/channels.ts'

export function ChannelPage() {
  const { channelId } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data: channel, isLoading, error } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => fetchChannel(channelId!),
    enabled: !!channelId,
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
          <Typography color="text.primary">
            {isLoading ? <Skeleton width={220} /> : channelId}
          </Typography>
        </Breadcrumbs>

        {error && <Alert severity="error">Не удалось загрузить канал</Alert>}

        {isLoading && <Skeleton variant="rounded" height={200} />}

        {channel && (
          channel.info ? (
            (() => {
              const channelName = channel.info.channel as string
              const thumbnails = channel.info.thumbnails as Array<{ id: string; url: string }> | undefined
              const avatar = thumbnails?.find((t) => t.id === 'avatar_uncropped')
              return (
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={avatar?.url}
                        sx={{ width: 48, height: 48 }}
                      >
                        {channelName.slice(0, 2)}
                      </Avatar>
                      <Typography variant="h5">
                        {channelName}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      ID канала
                    </Typography>
                    <Typography variant="body2">
                      {channel.info.channel_id as string}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Ссылка на канал
                    </Typography>
                    <Typography variant="body2">
                      <Link
                        href={channel.info.uploader_url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {channel.info.uploader_url as string}
                      </Link>
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Описание
                    </Typography>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                      {channel.info.description as string}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <ButtonGroup variant="outlined" size="medium">
                      <Button onClick={() => navigate({ to: '/channel/$channelId/videos', params: { channelId: channelId! } })}>Видео канала</Button>
                      <Button onClick={() => navigate({ to: '/channel/$channelId/tasks', params: { channelId: channelId! } })}>Задачи канала</Button>
                    </ButtonGroup>
                  </CardContent>
                </Card>
              )
            })()
          ) : (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">Данные отсутствуют</Typography>
              </CardContent>
            </Card>
          )
        )}
      </Container>
    </div>
  )
}
