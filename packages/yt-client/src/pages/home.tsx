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
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export function HomePage() {
  const navigate = useNavigate()

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
          <Typography variant="h4" fontWeight={700} gutterBottom>
            YT-Observer
          </Typography>
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

        {/* Backlog */}
        <Box className="mb-8">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Backlog
          </Typography>

          {/* Каналы */}
          <Typography variant="subtitle1" fontWeight={600} className="mt-2">
            Каналы
          </Typography>
          <List dense>
            {[
              { label: 'Проверка существования канала', done: true },
              { label: 'Получение списка видео канала', done: true },
              { label: 'Обновление списка видео канала', done: true },
              { label: 'Diff списков видео', done: false },
              { label: 'Поиск (advanced) по каналу и метаданным', done: false },
            ].map((item) => (
              <ListItem key={item.label} disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {item.done
                    ? <CheckBoxIcon color="primary" fontSize="small" />
                    : <CheckBoxOutlineBlankIcon color="disabled" fontSize="small" />
                  }
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ color: item.done ? 'text.primary' : 'text.secondary' }}
                />
              </ListItem>
            ))}
          </List>

          {/* Видео */}
          <Typography variant="subtitle1" fontWeight={600} className="mt-2">
            Видео
          </Typography>
          <List dense>
            {[
              { label: 'Получение всей metadata по видео', done: false },
              { label: 'Скачивание видео/аудио', done: false },
              { label: 'Работа с видео/аудио при помощи ffmpeg', done: false },
            ].map((item) => (
              <ListItem key={item.label} disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckBoxOutlineBlankIcon color="disabled" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ color: 'text.secondary' }} />
              </ListItem>
            ))}
          </List>

          {/* Сервис куки */}
          <Typography variant="subtitle1" fontWeight={600} className="mt-2">
            Прочее
          </Typography>
          <List dense>
            <ListItem disableGutters sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckBoxOutlineBlankIcon color="disabled" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Сервис для получения/обновления cookies" primaryTypographyProps={{ color: 'text.secondary' }} />
            </ListItem>
          </List>
        </Box>

      </Container>
    </div>
  )
}
