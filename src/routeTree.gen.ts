/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CalendarImport } from './routes/calendar'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as SessionsIndexImport } from './routes/sessions/index'
import { Route as ExercisesIndexImport } from './routes/exercises/index'
import { Route as ExercisesCreateIndexImport } from './routes/exercises/create/index'

// Create/Update Routes

const CalendarRoute = CalendarImport.update({
  id: '/calendar',
  path: '/calendar',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SessionsIndexRoute = SessionsIndexImport.update({
  id: '/sessions/',
  path: '/sessions/',
  getParentRoute: () => rootRoute,
} as any)

const ExercisesIndexRoute = ExercisesIndexImport.update({
  id: '/exercises/',
  path: '/exercises/',
  getParentRoute: () => rootRoute,
} as any)

const ExercisesCreateIndexRoute = ExercisesCreateIndexImport.update({
  id: '/exercises/create/',
  path: '/exercises/create/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/calendar': {
      id: '/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof CalendarImport
      parentRoute: typeof rootRoute
    }
    '/exercises/': {
      id: '/exercises/'
      path: '/exercises'
      fullPath: '/exercises'
      preLoaderRoute: typeof ExercisesIndexImport
      parentRoute: typeof rootRoute
    }
    '/sessions/': {
      id: '/sessions/'
      path: '/sessions'
      fullPath: '/sessions'
      preLoaderRoute: typeof SessionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/exercises/create/': {
      id: '/exercises/create/'
      path: '/exercises/create'
      fullPath: '/exercises/create'
      preLoaderRoute: typeof ExercisesCreateIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/calendar': typeof CalendarRoute
  '/exercises': typeof ExercisesIndexRoute
  '/sessions': typeof SessionsIndexRoute
  '/exercises/create': typeof ExercisesCreateIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/calendar': typeof CalendarRoute
  '/exercises': typeof ExercisesIndexRoute
  '/sessions': typeof SessionsIndexRoute
  '/exercises/create': typeof ExercisesCreateIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/calendar': typeof CalendarRoute
  '/exercises/': typeof ExercisesIndexRoute
  '/sessions/': typeof SessionsIndexRoute
  '/exercises/create/': typeof ExercisesCreateIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/calendar'
    | '/exercises'
    | '/sessions'
    | '/exercises/create'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/calendar'
    | '/exercises'
    | '/sessions'
    | '/exercises/create'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/calendar'
    | '/exercises/'
    | '/sessions/'
    | '/exercises/create/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  CalendarRoute: typeof CalendarRoute
  ExercisesIndexRoute: typeof ExercisesIndexRoute
  SessionsIndexRoute: typeof SessionsIndexRoute
  ExercisesCreateIndexRoute: typeof ExercisesCreateIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  CalendarRoute: CalendarRoute,
  ExercisesIndexRoute: ExercisesIndexRoute,
  SessionsIndexRoute: SessionsIndexRoute,
  ExercisesCreateIndexRoute: ExercisesCreateIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/calendar",
        "/exercises/",
        "/sessions/",
        "/exercises/create/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/calendar": {
      "filePath": "calendar.tsx"
    },
    "/exercises/": {
      "filePath": "exercises/index.tsx"
    },
    "/sessions/": {
      "filePath": "sessions/index.tsx"
    },
    "/exercises/create/": {
      "filePath": "exercises/create/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
