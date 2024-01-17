import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as TeacherRouteImport } from './routes/teacher/route'
import { Route as StudentRouteImport } from './routes/student/route'
import { Route as SecretaryRouteImport } from './routes/secretary/route'
import { Route as AdminRouteImport } from './routes/admin/route'

const TeacherTeacherComponentImport = new FileRoute(
  '/teacher/teacher',
).createRoute()
const StudentStudentComponentImport = new FileRoute(
  '/student/student',
).createRoute()
const SecretarySecretaryComponentImport = new FileRoute(
  '/secretary/secretary',
).createRoute()
const AdminAdminComponentImport = new FileRoute('/admin/admin').createRoute()

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const TeacherRouteRoute = TeacherRouteImport.update({
  path: '/teacher',
  getParentRoute: () => rootRoute,
} as any)

const StudentRouteRoute = StudentRouteImport.update({
  path: '/student',
  getParentRoute: () => rootRoute,
} as any)

const SecretaryRouteRoute = SecretaryRouteImport.update({
  path: '/secretary',
  getParentRoute: () => rootRoute,
} as any)

const AdminRouteRoute = AdminRouteImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const TeacherTeacherComponentRoute = TeacherTeacherComponentImport.update({
  path: '/teacher',
  getParentRoute: () => TeacherRouteRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/teacher/teacher.component'),
    'component',
  ),
})

const StudentStudentComponentRoute = StudentStudentComponentImport.update({
  path: '/student',
  getParentRoute: () => StudentRouteRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/student/student.component'),
    'component',
  ),
})

const SecretarySecretaryComponentRoute =
  SecretarySecretaryComponentImport.update({
    path: '/secretary',
    getParentRoute: () => SecretaryRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./routes/secretary/secretary.component'),
      'component',
    ),
  })

const AdminAdminComponentRoute = AdminAdminComponentImport.update({
  path: '/admin',
  getParentRoute: () => AdminRouteRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/admin/admin.component'),
    'component',
  ),
})
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/admin': {
      preLoaderRoute: typeof AdminRouteImport
      parentRoute: typeof rootRoute
    }
    '/secretary': {
      preLoaderRoute: typeof SecretaryRouteImport
      parentRoute: typeof rootRoute
    }
    '/student': {
      preLoaderRoute: typeof StudentRouteImport
      parentRoute: typeof rootRoute
    }
    '/teacher': {
      preLoaderRoute: typeof TeacherRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/admin/admin': {
      preLoaderRoute: typeof AdminAdminComponentImport
      parentRoute: typeof AdminRouteImport
    }
    '/secretary/secretary': {
      preLoaderRoute: typeof SecretarySecretaryComponentImport
      parentRoute: typeof SecretaryRouteImport
    }
    '/student/student': {
      preLoaderRoute: typeof StudentStudentComponentImport
      parentRoute: typeof StudentRouteImport
    }
    '/teacher/teacher': {
      preLoaderRoute: typeof TeacherTeacherComponentImport
      parentRoute: typeof TeacherRouteImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  AdminRouteRoute.addChildren([AdminAdminComponentRoute]),
  SecretaryRouteRoute.addChildren([SecretarySecretaryComponentRoute]),
  StudentRouteRoute.addChildren([StudentStudentComponentRoute]),
  TeacherRouteRoute.addChildren([TeacherTeacherComponentRoute]),
  AuthRoute,
  LoginRoute,
])
