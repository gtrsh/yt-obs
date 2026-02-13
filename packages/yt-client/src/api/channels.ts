import { api } from './client.ts'

export interface Channel {
  id: string
  url: string
  status: 'PENDING' | 'UPDATING' | 'ACTIVE' | 'NOT_FOUND' | 'ERROR'
  createdAt: string
  updatedAt: string
}

export interface ChannelDetail {
  id: string
  info: Record<string, unknown>
  channelId: string
  createdAt: string
  updatedAt: string
}

export async function fetchChannels(): Promise<Channel[]> {
  return api.get('channel').json<Channel[]>()
}

export async function fetchChannel(channelId: string): Promise<ChannelDetail> {
  return api.get(`channel/${channelId}`).json<ChannelDetail>()
}

export interface ChannelData {
  id: string
  data: Record<string, unknown> | null
  playlistType: string | null
  createdAt: string
  updatedAt: string | null
}

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
  return api.get(`channel/${channelId}/data`).json<ChannelData>()
}

export interface ChannelTask {
  id: string
  type: string
  status: string
  error: string | null
  createdAt: string
  updatedAt: string
}

export async function fetchChannelTasks(channelId: string): Promise<ChannelTask[]> {
  return api.get(`channel/${channelId}/task`).json<ChannelTask[]>()
}

export async function updateChannel(channelId: string): Promise<Channel> {
  return api.post(`channel/${channelId}/update`).json<Channel>()
}

export async function createChannel(url: string): Promise<Channel> {
  return api.post('channel', { json: { url, playlistType: 'videos' } }).json<Channel>()
}
