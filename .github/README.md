# YT-Observer

```
__  ________    ____  __
\ \/ /_  __/   / __ \/ /_  ________  ______   _____  _____
 \  / / /_____/ / / / __ \/ ___/ _ \/ ___/ | / / _ \/ ___/
 / / / /_____/ /_/ / /_/ (__  )  __/ /   | |/ /  __/ /
/_/ /_/      \____/_.___/____/\___/_/    |___/\___/_/
```

## Описание

Приложение для работы с youtube, при помощи yt-dlp (без использования оффициального api)

Основые функции:
- Добавление каналов и отслеживание изменений (добавление/удаление видеороликов)
- Скачивание и хранение видео/аудио материалов
- Работа с метаданными каналов/роликов, таких как: тэги, описание, просмотры, длительность роликов, частота постинга каналов

## Tech Stack

Клиент-серверное приложение, написанное на node.js/react/ts, BullMQ для запуска yt-dlp.

Сервер:
- **Runtime:** Node.js 24 with TypeScript 5.9
- **Framework:** NestJS 11 + Fastify 5
- **Databases:** PostgreSQL via Prisma 7, Redis cache
- **Queue:** BullMQ + Redis
- **Monorepo tool:** Turborepo

Клиент:
- **Framework:** React 19
- **Components system:** Mui 7
- **Css:** tailwind 4
- **Main libs:** TanStack Query/Router, ky

## Архитектура

Серверная часть состоит из двух независимо запускающихся и работающих процессов:
- `main.ts` — HTTP API server (NestJS + Fastify) отвечает за работу с данными + взаимодействие с FE приложением
- `worker.ts` — BullMQ worker (NestJS application context без HTTP) запускает и обрабатывает вывод yt-dlp (cli утилита для работы с youtube и другими видео-хостингами)

Клиентская часть стандартно взаимодействует с сервером по rest-ful api

## Backlog

На текущий момент реализовано добавление канала, получение информации о нём (существует ли канал, который пытаются отслеживать, его описание), получение списка видео канала и обновление данного списка.
Для получения более подробной информации о видео (более подробные мета-данные) и скачивания требуется разработать отдельный сервис создающий и обновляющий youtube-куки, так как youtube ужесточил политики и отдаёт информацию/видео только залогиненому пользователю

- [x] Каналы
  - [x] Проверка существования канала
  - [x] Получение списка видео канала
  - [x] Обновление списка видео канала
  - [ ] Diff списков видео
  - [ ] Поиск (advanced) по каналу и метаданным
- [ ] Видео
  - [ ] Получение всей metadata по видео
  - [ ] Скачивание видео/аудио
  - [ ] Работа с видео/аудио при помощи ffmpeg
- [ ] Сервис для получения/обновления cookies

## Скриншоты

|||||
| -------- | ---------- | ------------ | ------------ |
|![](https://private-user-images.githubusercontent.com/7301893/552137798-0a4fa08f-6733-4fab-93ae-7f830102363e.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzc5OC0wYTRmYTA4Zi02NzMzLTRmYWItOTNhZS03ZjgzMDEwMjM2M2UucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MmE2NjFjNjg5Y2IxOWEwZDMwNzUyOTlmZDMwNDQzNzc0ZjYwYThlNDBmYWE1MjQxMjlhYzM2ZjM4OGU0YmZlNCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.GI-879xn26ar5rAjULY3W-_KdsAdc9JXZkeJfmiLaHY)|![](https://private-user-images.githubusercontent.com/7301893/552137805-6b120db3-5955-4008-8c4e-cdc48cec67c4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNS02YjEyMGRiMy01OTU1LTQwMDgtOGM0ZS1jZGM0OGNlYzY3YzQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9OTRiMDllMTUyNDliNjg1Y2FhZTE4YmEzZTY5ZTZiZmU5NDlmZmQ1YTNmN2VkYWNkYjczZTE1MGUxMDNmZmRkMSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.fETK7yjdrJC-3JODIVFOBNWn9tQqFvK7-ot9IJbiJR0)|![](https://private-user-images.githubusercontent.com/7301893/552137804-86f15d16-98ee-4f13-8a07-8ab9597b72f9.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNC04NmYxNWQxNi05OGVlLTRmMTMtOGEwNy04YWI5NTk3YjcyZjkucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MDZkYWZiZTI2MDA4OGNlNGNiZmFjOWE3NTRhMDg4ZDM5ZjU3YTUxYTZlMGY3OTFmMDBlMmQ5ZmZiMWFiYTgzZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.pi7W9B_NiCkomEOZMhFujmhKocCRJhD-hMNvGb_Plhc)|![](https://private-user-images.githubusercontent.com/7301893/552137806-03250c00-cb9e-4791-8b45-bf50dc7b98b8.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwNi0wMzI1MGMwMC1jYjllLTQ3OTEtOGI0NS1iZjUwZGM3Yjk4YjgucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NGEwZmIwY2EyYTQ1Njg2OTM0MzNjNzM1OTk0ZGNkY2MxMTY0MmQ1OGJlYzg5MDZjODBlNmY1ZWE1OGFjZjQ2ZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.W7ZJ2_dEHkLQ9o_NZUXX6V75yXeVQ7pGp7Qj2IPMh2Q)|
|![](https://private-user-images.githubusercontent.com/7301893/552137801-4074913c-4d0d-4c8c-9cf1-b7d26556500f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMS00MDc0OTEzYy00ZDBkLTRjOGMtOWNmMS1iN2QyNjU1NjUwMGYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NjBhMWE3OGVjYjRmNDQ0NTI5ZjI1OGNjNjZmNDg5MjQ2Njg4MjhiZGFmNTVkYWI2NjY1YzEzNDY2NjlkOGRmNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.5oKIPytlldDd5IseHTTn1CQ63-0ejz97usZnhnkzLvQ)|![](https://private-user-images.githubusercontent.com/7301893/552137803-084125d4-d7d6-468c-8bb6-3f5a65e79cd3.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMy0wODQxMjVkNC1kN2Q2LTQ2OGMtOGJiNi0zZjVhNjVlNzljZDMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YTlkNjk0YzBkY2ZlMjkxNTcxOTM5ZjM4ZmJkYTEyMDliYTgzZGY2NGRhMjc3NjFjZDgwODYzNjQyYWRjNjYzMCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.AFLNoPBrDdUsU8TprDoQE_lNxSWnIbzigVRjgFvQalk)|![](https://private-user-images.githubusercontent.com/7301893/552137799-65733bfd-5b23-4b61-b44b-496eb3001477.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzc5OS02NTczM2JmZC01YjIzLTRiNjEtYjQ0Yi00OTZlYjMwMDE0NzcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZjY5MWViZWUwZWRkZmVlYmFhMTM4MWI5ZjcxZjc3NmYxNGUyZDllZjI0MmY2ZjhkNWRkZjYxNzYzNmVkM2EwNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.craAA0_OXokps-ebvgsQmMjlo7CyvtZxkshleTM4fgs)|![](https://private-user-images.githubusercontent.com/7301893/552137802-c1c4996c-7bb2-4acf-9ac0-20bd2e47e116.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE1MDgyMTQsIm5iZiI6MTc3MTUwNzkxNCwicGF0aCI6Ii83MzAxODkzLzU1MjEzNzgwMi1jMWM0OTk2Yy03YmIyLTRhY2YtOWFjMC0yMGJkMmU0N2UxMTYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjAyMTlUMTMzMTU0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MTg2Y2NmNDZhMzgwOGZhMDA3YjA4NGFmNDg2MmE3Y2U5ZDE4YmU2YzkxMTNjMGVmNTJkZjhkZGU5YzcwMjZjMyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.xwD1pxOZ6vYrx-ZbGTLQLThfX5rzjtOFm-HgvJchfxY)|
