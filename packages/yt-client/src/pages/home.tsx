import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const SCREENSHOTS = [
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-17-03.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-21-12.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-21-31.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-22-59.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-23-11.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-23-29.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-23-36.png',
  'https://s3.ru1.storage.beget.cloud/88e425097463-yt-obs-static-public/Screenshot%20From%202026-02-19%2016-23-42.png',
]

export function HomePage() {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="static" color="default" variant="outlined" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className="grow">
            Yt-Obs
          </Typography>
          <Button variant="outlined" size="medium" onClick={() => navigate({ to: '/login' })}>
            Войти
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="py-10">

        {/* Hero */}
        <Box className="mb-8 text-center">
          <Box
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '0.45rem', sm: '0.65rem', md: '0.8rem' },
              lineHeight: 1.4,
              overflowX: 'auto',
              color: 'text.primary',
              display: 'inline-block',
              textAlign: 'left',
              mb: 2,
            }}
          >{`__  ________    ____  __
\\ \\/ /_  __/   / __ \\/ /_  ________  ______   _____  _____
 \\  / / /_____/ / / / __ \\/ ___/ _ \\/ ___/ | / / _ \\/ ___/
 / / / /_____/ /_/ / /_/ (__  )  __/ /   | |/ /  __/ /
/_/ /_/      \\____/_.___/____/\\___/_/    |___/\\___/_/`}</Box>
          <Typography variant="subtitle1" color="text.secondary">
            Приложение для работы с YouTube при помощи yt-dlp без использования официального API
          </Typography>
        </Box>

        <Divider className="mb-8" />

        {/* Описание */}
        <Box className="mb-8">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Описание
          </Typography>
          <List dense>
            {[
              'Добавление каналов и отслеживание изменений (добавление/удаление видеороликов)',
              'Скачивание и хранение видео/аудио материалов',
              'Работа с метаданными каналов/роликов: тэги, описание, просмотры, длительность роликов, частота постинга каналов',
            ].map((item) => (
              <ListItem key={item} disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider className="mb-8" />

        {/* Tech Stack */}
        <Box className="mb-8">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Tech Stack
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Клиент-серверное приложение на Node.js / React / TypeScript, BullMQ для запуска yt-dlp.
          </Typography>

          <Box className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Server */}
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Сервер
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {[
                  'Node.js 24',
                  'TypeScript 5.9',
                  'NestJS 11',
                  'Fastify 5',
                  'PostgreSQL',
                  'Prisma 7',
                  'Redis',
                  'BullMQ',
                  'Turborepo',
                ].map((tech) => (
                  <Chip key={tech} label={tech} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            {/* Client */}
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Клиент
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {[
                  'React 19',
                  'MUI 7',
                  'Tailwind 4',
                  'TanStack Query',
                  'TanStack Router',
                  'ky',
                ].map((tech) => (
                  <Chip key={tech} label={tech} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider className="mb-8" />

        {/* Архитектура */}
        <Box className="mb-8">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Архитектура
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Серверная часть состоит из двух независимо запускающихся процессов:
          </Typography>
          <List dense>
            <ListItem disableGutters sx={{ py: 0.5, alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<><Box component="code" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', px: 0.5, borderRadius: 1 }}>main.ts</Box>{' — HTTP API server (NestJS + Fastify), отвечает за работу с данными и взаимодействие с FE приложением'}</>}
              />
            </ListItem>
            <ListItem disableGutters sx={{ py: 0.5, alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<><Box component="code" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', px: 0.5, borderRadius: 1 }}>worker.ts</Box>{' — BullMQ worker (NestJS application context без HTTP), запускает и обрабатывает вывод yt-dlp'}</>}
              />
            </ListItem>
          </List>
          <Typography variant="body2" color="text.secondary" className="mt-2">
            Клиентская часть взаимодействует с сервером по RESTful API.
          </Typography>
        </Box>

        <Divider className="mb-8" />

        {/* Скриншоты */}
        <Box className="mb-8">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Скриншоты
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {SCREENSHOTS.map((src, i) => (
              <Box
                key={i}
                component="img"
                src={src}
                alt={`Screenshot ${i + 1}`}
                onClick={() => setLightbox(src)}
                sx={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'opacity 0.15s',
                  '&:hover': { opacity: 0.85 },
                }}
              />
            ))}
          </Box>
        </Box>

      </Container>

      <Dialog
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        maxWidth="xl"
        fullWidth
        slotProps={{ paper: { sx: { bgcolor: 'black' } } }}
      >
        <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {lightbox && (
            <Box
              component="img"
              src={lightbox}
              onClick={() => setLightbox(null)}
              sx={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', cursor: 'zoom-out' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
