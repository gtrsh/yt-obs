```
__  ________    ____  __
\ \/ /_  __/   / __ \/ /_  ________  ______   _____  _____
 \  / / /_____/ / / / __ \/ ___/ _ \/ ___/ | / / _ \/ ___/
 / / / /_____/ /_/ / /_/ (__  )  __/ /   | |/ /  __/ /
/_/ /_/      \____/_.___/____/\___/_/    |___/\___/_/
```

## REST Api описание

```
POST      /api/v1/auth/signup    | Создание нового пользователя
POST      /api/v1/auth/login     | Аутентификация пользователя, получение JWT токена

POST      /api/v1/channel                             | Добавление нового youtube канала для отслеживания видео
POST      /api/v1/channel/<channelId>/update          | Обновление списка видео на youtube канале
GET       /api/v1/channel                             | Каналы добавленные пользователем
GET       /api/v1/channel/<channelId>                 | Информация о добавленном канале
GET       /api/v1/channel/<channelId>/data            | Актуальные видео канала
GET       /api/v1/channel/<channelId>/data/history    | Список всех видео канала (snapshots)
GET       /api/v1/channel/<channelId>/data/<dataId>   | Конкретный список видео канала
GET       /api/v1/channel/<channelId>/task            | Таски созданные для канала (bullmq worker)
GET       /api/v1/channel/<channelId>/task/<taskId>   | Конкретный таск для канала (bullmq worker)
```
