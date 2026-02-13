# CLAUDE.md

## Обзор проекта

YT-Observer — приложение для мониторинга YouTube-каналов через **yt-dlp** (без официального YouTube API).
Отслеживает изменения на каналах (добавление/удаление видео), собирает метаданные, хранит историю снапшотов.

## Структура монорепо

```
packages/
├── yt-server/           # Backend: HTTP API + Worker (NestJS 11, Fastify 5)
├── yt-client/           # Frontend: UI (React 19, MUI 7, Tailwind 4)
├── store-sql/           # Слой БД (Prisma 7, PostgreSQL)
├── config-typescript/   # Общие конфиги TypeScript
└── config-eslint/       # Общие конфиги ESLint
```

## Команды

### Корень (Turborepo)
```bash
npm run dev    # Запуск всех пакетов в dev-режиме
npm run build  # Сборка всех пакетов
```

### yt-server (`packages/yt-server`)
```bash
npm run dev          # nest start --watch
npm run build        # nest build
npm run start:prod   # node dist/main
npm run start:debug  # nest start --debug --watch
```

### yt-client (`packages/yt-client`)
```bash
npm run dev      # vite (dev-сервер с прокси на localhost:3000)
npm run build    # tsc -b && vite build
npm run lint     # eslint .
npm run preview  # vite preview
```

### store-sql (`packages/store-sql`)
```bash
npm run prisma:generate  # prisma generate
npm run build            # prisma generate && tsc
```

## Архитектура сервера

Два независимых процесса:

- **API** (`packages/yt-server/src/main.ts`) — HTTP-сервер на NestJS + Fastify, обрабатывает REST-запросы
- **Worker** (`packages/yt-server/src/worker.ts`) — BullMQ-воркер, выполняет фоновые задачи (вызов yt-dlp, обработка данных)

Поток данных: Client -> API -> (PostgreSQL + BullMQ Queue) -> Worker -> yt-dlp CLI -> PostgreSQL

Очереди BullMQ:
- `QUEUE_CHANNEL_CREATE` — первичное получение данных канала
- `QUEUE_CHANNEL_UPDATE` — обновление списка видео канала

## Схема базы данных

Основные модели (Prisma, `packages/store-sql/prisma/schema.prisma`):

- **User** — пользователи, роли `USER` / `ADMIN`
- **Channel** — YouTube-каналы, статусы: `PENDING`, `UPDATING`, `ACTIVE`, `NOT_FOUND`, `ERROR`
- **ChannelInfo** — метаданные канала (JSONB от yt-dlp), связь 1:1 с Channel
- **ChannelData** — снапшоты списка видео (JSONB), флаг `isCurrent` для актуального
- **ChannelTask** — фоновые задачи (`CREATE` / `UPDATE`), статусы: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`
- **UserChannel** — связь many-to-many между User и Channel

Все модели имеют `createdAt`, `updatedAt`, `deletedAt`. Имена таблиц в snake_case (`@@map`), колонки тоже (`@map`).

## API

Базовый путь: `/api/v1`

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/auth/signup` | Регистрация |
| POST | `/auth/login` | Авторизация (JWT) |
| POST | `/channel` | Добавить канал (202 новый / 200 существующий) |
| GET | `/channel` | Список каналов пользователя |
| GET | `/channel/:id` | Детали канала |
| POST | `/channel/:id/update` | Запустить обновление канала |
| GET | `/channel/:id/data` | Текущий список видео |
| GET | `/channel/:id/data/history` | Все снапшоты |
| GET | `/channel/:id/data/:dataId` | Конкретный снапшот |
| GET | `/channel/:id/task` | Задачи канала |
| GET | `/channel/:id/task/:taskId` | Детали задачи |

Все эндпоинты (кроме auth) требуют заголовок `Authorization: Bearer <token>`.

## Соглашения по коду

- **Модули**: ESM (`"type": "module"` во всех package.json)
- **TypeScript**: strict mode, target ESNext, декораторы включены (NestJS)
- **Валидация**: Zod для рантайм-валидации (env, DTO)
- **Аутентификация**: JWT + bcrypt, guard-ы NestJS, декораторы `@Auth()`, `@Roles()`
- **Стиль БД**: таблицы и колонки в snake_case, UUID v7 как первичные ключи
- **Фронтенд**: серверный стейт через TanStack Query, роутинг через TanStack Router, UI — MUI компоненты + Tailwind

## Внешние зависимости

- **PostgreSQL** — основная БД
- **Redis** — кеш + бэкенд очередей BullMQ
- **yt-dlp** — CLI-утилита для получения данных с YouTube (вызывается через `execa`)

## Переменные окружения

Шаблон: `.env.example`

| Переменная | Назначение |
|-----------|-----------|
| `YTOBS_SALT` | Соль для паролей |
| `YTOBS_HASH_ROUND` | Раунды bcrypt |
| `YTOBS_JWT_SECRET` | Секрет подписи JWT |
| `YTOBS_JWT_EXPIRES` | Время жизни JWT |
| `YTOBS_STORE_PG` | PostgreSQL connection string |
| `YTOBS_STORE_REDIS_HOST` | Redis хост (кеш) |
| `YTOBS_STORE_REDIS_PORT` | Redis порт (кеш) |
| `YTOBS_BULL_HOST` | Redis хост (BullMQ) |
| `YTOBS_BULL_PORT` | Redis порт (BullMQ) |
