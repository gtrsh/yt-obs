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
  'https://private-user-images.githubusercontent.com/7301893/552137798-0a4fa08f-6733-4fab-93ae-7f830102363e.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzc5OC0wYTRmYTA4Zi02NzMzLTRmYWItOTNhZS03ZjgzMDEwMjM2M2UucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MmE2NjFjNjg5Y2IxOWEwZDMwNzUyOTlmZDMwNDQzNzc0ZjYwYThlNDBmYWE1MjQxMjlhYzM2ZjM4OGU0YmZlNCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.GI-879xn26ar5rAjULY3W-_KdsAdc9JXZkeJfmiLaHY',
  'https://private-user-images.githubusercontent.com/7301893/552137805-6b120db3-5955-4008-8c4e-cdc48cec67c4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNS02YjEyMGRiMy01OTU1LTQwMDgtOGM0ZS1jZGM0OGNlYzY3YzQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9OTRiMDllMTUyNDliNjg1Y2FhZTE4YmEzZTY5ZTZiZmU5NDlmZmQ1YTNmN2VkYWNkYjczZTE1MGUxMDNmZmRkMSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.fETK7yjdrJC-3JODIVFOBNWn9tQqFvK7-ot9IJbiJR0',
  'https://private-user-images.githubusercontent.com/7301893/552137804-86f15d16-98ee-4f13-8a07-8ab9597b72f9.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNC04NmYxNWQxNi05OGVlLTRmMTMtOGEwNy04YWI5NTk3YjcyZjkucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MDZkYWZiZTI2MDA4OGNlNGNiZmFjOWE3NTRhMDg4ZDM5ZjU3YTUxYTZlMGY3OTFmMDBlMmQ5ZmZiMWFiYTgzZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.pi7W9B_NiCkomEOZMhFujmhKocCRJhD-hMNvGb_Plhc',
  'https://private-user-images.githubusercontent.com/7301893/552137806-03250c00-cb9e-4791-8b45-bf50dc7b98b8.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNi0wMzI1MGMwMC1jYjllLTQ3OTEtOGI0NS1iZjUwZGM3Yjk4YjgucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NGEwZmIwY2EyYTQ1Njg2OTM0MzNjNzM1OTk0ZGNkY2MxMTY0MmQ1OGJlYzg5MDZjODBlNmY1ZWE1OGFjZjQ2ZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.W7ZJ2_dEHkLQ9o_NZUXX6V75yXeVQ7pGp7Qj2IPMh2Q',
  'https://private-user-images.githubusercontent.com/7301893/552137801-4074913c-4d0d-4c8c-9cf1-b7d26556500f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMS00MDc0OTEzYy00ZDBkLTRjOGMtOWNmMS1iN2QyNjU1NjUwMGYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NjBhMWE3OGVjYjRmNDQ0NTI5ZjI1OGNjNjZmNDg5MjQ2Njg4MjhiZGFmNTVkYWI2NjY1YzEzNDY2NjlkOGRmNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.5oKIPytlldDd5IseHTTn1CQ63-0ejz97usZnhnkzLvQ',
  'https://private-user-images.githubusercontent.com/7301893/552137803-084125d4-d7d6-468c-8bb6-3f5a65e79cd3.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMy0wODQxMjVkNC1kN2Q2LTQ2OGMtOGJiNi0zZjVhNjVlNzljZDMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YTlkNjk0YzBkY2ZlMjkxNTcxOTM5ZjM4ZmJkYTEyMDliYTgzZGY2NGRhMjc3NjFjZDgwODYzNjQyYWRjNjYzMCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.AFLNoPBrDdUsU8TprDoQE_lNxSWnIbzigVRjgFvQalk',
  'https://private-user-images.githubusercontent.com/7301893/552137799-65733bfd-5b23-4b61-b44b-496eb3001477.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzc5OS02NTczM2JmZC01YjIzLTRiNjEtYjQ0Yi00OTZlYjMwMDE0NzcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZjY5MWViZWUwZWRkZmVlYmFhMTM4MWI5ZjcxZjc3NmYxNGUyZDllZjI0MmY2ZjhkNWRkZjYxNzYzNmVkM2EwNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.craAA0_OXokps-ebvgsQmMjlo7CyvtZxkshleTM4fgs',
  'https://private-user-images.githubusercontent.com/7301893/552137802-c1c4996c-7bb2-4acf-9ac0-20bd2e47e116.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMi1jMWM0OTk2Yy03YmIyLTRhY2YtOWFjMC0yMGJkMmU0N2UxMTYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MTg2Y2NmNDZhMzgwOGZhMDA3YjA4NGFmNDg2MmE3Y2U5ZDE4YmU2YzkxMTNjMGVmNTJkZjhkZGU5YzcwMjZjMyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.xwD1pxOZ6vYrx-ZbGTLQLThfX5rzjtOFm-HgvJchfxY',
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
