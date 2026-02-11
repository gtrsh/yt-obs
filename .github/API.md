# Api Yt-obs

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

## Rest Api примеры запросов/ответов

```
POST      /api/v1/auth/signup
REQ:
{"username": "gt", "password": "123123"}
RESP:
{
  "id": "019c4d89-a46c-704a-bf62-15b2f6ac2186",
  "role": "USER",
  "name": "gt",
  "email": null,
  "createdAt": "2026-02-11T16:29:52.108Z",
  "updatedAt": "2026-02-11T16:29:52.108Z"
}

POST      /api/v1/auth/login
REQ:
{"username": "user", "password": "userpass"}
RESP:
{
  "access_token": "<JWT-token>"
}

POST      /api/v1/channel
REQ:
{
  "url": "https://www.youtube.com/@trkv17",
  "playlistType": "videos"
}
RESP:
202:
{
  "id": "019c4d82-be1f-7400-a374-12d09606de5a",
  "url": "https://www.youtube.com/@trkv17",
  "status": "PENDING",
  "createdAt": "2026-02-11T16:22:19.935Z",
  "updatedAt": "2026-02-11T16:22:19.935Z"
}
200:
{
  "id": "019c4d82-be1f-7400-a374-12d09606de5a",
  "url": "https://www.youtube.com/@trkv17",
  "status": "ACTIVE",
  "createdAt": "2026-02-11T16:22:19.935Z",
  "updatedAt": "2026-02-11T16:35:03.083Z"
}

POST      /api/v1/channel/<channelId>/update
REQ:
NULL
RESP:
201
{
  "id": "019c4d82-be1f-7400-a374-12d09606de5a",
  "url": "https://www.youtube.com/@trkv17",
  "status": "ACTIVE",
  "createdAt": "2026-02-11T16:22:19.935Z",
  "updatedAt": "2026-02-11T16:22:21.165Z"
}
409:
{
  "message": "channel tasks in progress",
  "channelId": "019c4d82-be1f-7400-a374-12d09606de5a"
}

GET       /api/v1/channel
REQ:
NULL
RESP:
200:
[
  {
    "id": "019c4d82-be1f-7400-a374-12d09606de5a",
    "url": "https://www.youtube.com/@trkv17",
    "status": "ACTIVE",
    "createdAt": "2026-02-11T16:22:19.935Z",
    "updatedAt": "2026-02-11T16:35:03.083Z"
  }
]

GET       /api/v1/channel/<channelId>
REQ:
NULL
RESP:
200:
{
  "id": "019c4d82-be27-700a-9228-4faa9ae488a2",
  "info": {
    "id": "UCpFgagrLoMphB7niycVzXJQ",
    "tags": [
      "trkv17",
      "обзор игр"
    ],
    "_type": "playlist",
    "epoch": 1770826941,
    "title": "trkv17 - Видео",
    "channel": "trkv17",
    "_version": {
      "version": "2026.02.04",
      "repository": "yt-dlp/yt-dlp",
      "current_git_head": null,
      "release_git_head": "c677d866d41eb4075b0a5e0c944a6543fc13f15d"
    },
    "uploader": "trkv17",
    "extractor": "youtube:tab",
    "channel_id": "UCpFgagrLoMphB7niycVzXJQ",
    "thumbnails": [
      {
        "id": "banner_uncropped",
        "url": "https://yt3.googleusercontent.com/Y8ggtJQ2iqZ98c0TULNBmyEnEp-ZmfkDeEMQ15Z1wReAoU3ZdsdhfyFSxGnH7BixC8k9ptlfgQ=s0",
        "preference": -5
      },
      {
        "id": "avatar_uncropped",
        "url": "https://yt3.googleusercontent.com/KKDeoq2YOVXHSO8GJpFBXwNE72sCimwRNKy8vHxl4UdKaHWb2bS-YH-FaHHuVAv8vW47pdZ4=s0",
        "preference": 1
      }
    ],
    "view_count": null,
    "channel_url": "https://www.youtube.com/channel/UCpFgagrLoMphB7niycVzXJQ",
    "description": "Рассказываю о том, что мне интересно.\n\nПо вопросам рекламы и сотрудничества:\nTG: @trkv17_advert_bot\n\n№ 5020651424\n",
    "uploader_id": "@trkv17",
    "webpage_url": "https://www.youtube.com/@trkv17/videos",
    "availability": null,
    "original_url": "https://www.youtube.com/@trkv17/videos",
    "release_year": null,
    "uploader_url": "https://www.youtube.com/@trkv17",
    "extractor_key": "YoutubeTab",
    "modified_date": null,
    "playlist_count": 46,
    "__files_to_move": {},
    "webpage_url_domain": "youtube.com",
    "webpage_url_basename": "videos",
    "channel_follower_count": null
  },
  "channelId": "019c4d82-be1f-7400-a374-12d09606de5a",
  "createdAt": "2026-02-11T16:22:19.943Z",
  "updatedAt": "2026-02-11T16:22:21.143Z"
}

GET       /api/v1/channel/<channelId>/data
REQ:
NULL
RESP:
200:
{
  "id": "019c4d8e-5e8b-768d-86c0-afcc4161d0ca",
  "data": [
    {
      "id": "VJ9nhL2N2O4",
      "url": "https://www.youtube.com/watch?v=VJ9nhL2N2O4",
      "_type": "url",
      "title": "САМОЕ ТОКСИЧНОЕ КОММЬЮНИТИ HOI4",
      "ie_key": "Youtube",
      "channel": null,
      "duration": 506,
      "uploader": null,
      "timestamp": null,
      "channel_id": null,
      "thumbnails": [
        {
          "url": "https://i.ytimg.com/vi/VJ9nhL2N2O4/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAbjiMqtkAIakT7mts6lhh9tIaCvg",
          "width": 336,
          "height": 188
        }
      ],
      "view_count": 78,
      "channel_url": null,
      "description": "Ну, речь пройдет про одно, довольно-таки... самобытное отделение русскоязычного Hearts of Iron 4 коммьюнити.\n\nПрошу...",
      "live_status": null,
      "uploader_id": null,
      "availability": null,
      "uploader_url": null,
      "release_timestamp": null,
      "channel_is_verified": true,
      "__x_forwarded_for_ip": null
    },
    {
      "id": "HVn7FrYfxnk",
      "url": "https://www.youtube.com/watch?v=HVn7FrYfxnk",
      "_type": "url",
      "title": "Это Больше Не Марио.",
      "ie_key": "Youtube",
      "channel": null,
      "duration": 1119,
      "uploader": null,
      "timestamp": null,
      "channel_id": null,
      "thumbnails": [
        {
          "url": "https://i.ytimg.com/vi/HVn7FrYfxnk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCfASm_mXEukTPygWzuOhfDmIKHQA",
          "width": 336,
          "height": 188
        }
      ],
      "view_count": 89,
      "channel_url": null,
      "description": "Видео про ром хак к Super Mario World - Coronation Day или 'the. Немного выбиваюсь из своего привычного формата видеоэссе,...",
      "live_status": null,
      "uploader_id": null,
      "availability": null,
      "uploader_url": null,
      "release_timestamp": null,
      "channel_is_verified": true,
      "__x_forwarded_for_ip": null
    }
  ],
  "playlistType": "videos",
  "createdAt": "2026-02-11T16:35:01.899Z",
  "updatedAt": "2026-02-11T16:35:03.074Z"
}

GET       /api/v1/channel/<channelId>/data/history
REQ:
NULL
RESP:
200:
[
  { <RESP FROM /api/v1/channel/<channelId>/data> },
  { <RESP FROM /api/v1/channel/<channelId>/data> }
]

GET       /api/v1/channel/<channelId>/data/<dataId>
REQ:
NULL
RESP:
200:
{ <RESP FROM /api/v1/channel/<channelId>/data/history BY ID> }

GET       /api/v1/channel/<channelId>/task
REQ:
NULL
RESP:
200:
[
  {
    "id": "019c4d82-be22-77e2-831e-4ebbcec3eb00",
    "type": "CREATE",
    "status": "COMPLETED",
    "error": null,
    "createdAt": "2026-02-11T16:22:19.938Z",
    "updatedAt": "2026-02-11T16:22:21.163Z"
  },
  {
    "id": "019c4d85-dad1-77c8-8970-3624784f5f5e",
    "type": "UPDATE",
    "status": "COMPLETED",
    "error": null,
    "createdAt": "2026-02-11T16:25:43.889Z",
    "updatedAt": "2026-02-11T16:25:45.027Z"
  },
  {
    "id": "019c4d8d-f7a9-724f-8c20-6c7be19710a3",
    "type": "UPDATE",
    "status": "COMPLETED",
    "error": null,
    "createdAt": "2026-02-11T16:34:35.561Z",
    "updatedAt": "2026-02-11T16:34:36.841Z"
  },
  {
    "id": "019c4d8e-5e8a-760f-80e0-da5d4577fc24",
    "type": "UPDATE",
    "status": "COMPLETED",
    "error": null,
    "createdAt": "2026-02-11T16:35:01.898Z",
    "updatedAt": "2026-02-11T16:35:03.083Z"
  }
]

GET       /api/v1/channel/<channelId>/task/<taskId>
REQ:
NULL
RESP:
200:
{
  "id": "019c4d82-be22-77e2-831e-4ebbcec3eb00",
  "type": "CREATE",
  "status": "COMPLETED",
  "error": null,
  "createdAt": "2026-02-11T16:22:19.938Z",
  "updatedAt": "2026-02-11T16:22:21.163Z"
}
```
