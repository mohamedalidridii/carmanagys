import { appRouter } from "../../../../trpc/index"
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) => {
  console.log('this is an api request')
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware
    createContext: () => ({}),
  });
  console.log('this is the end of api request')
}

export { handler as GET, handler as POST }