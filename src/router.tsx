import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getQueryContext, QueryProvider } from './integrations/query-provider';

export function getRouter() {
  const rqContext = getQueryContext();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: () => <p>Not Found</p>,
    context: { queryClient: rqContext.queryClient },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <QueryProvider {...rqContext}>
          {props.children}
        </QueryProvider>
      )
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}