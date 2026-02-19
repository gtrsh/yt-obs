import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { isAuthenticated } from './lib/auth.ts'
import { LoginPage } from './pages/login.tsx'
import { HomePage } from './pages/home.tsx'
import { ChannelsPage } from './pages/channels.tsx'
import { ChannelPage } from './pages/channel.tsx'
import { ChannelVideosPage } from './pages/channel-videos.tsx'
import { ChannelTasksPage } from './pages/channel-tasks.tsx'

const rootRoute = createRootRoute({
  component: Outlet,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/channels' })
    }
  },
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/channels' })
    }
  },
  component: LoginPage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/channels',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChannelsPage,
})

const channelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/channel/$channelId',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChannelPage,
})

const channelVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/channel/$channelId/videos',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChannelVideosPage,
})

const channelTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/channel/$channelId/tasks',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChannelTasksPage,
})

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, indexRoute, channelRoute, channelVideosRoute, channelTasksRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
