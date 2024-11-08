import { httpLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../../currapay-backend/src/trpc/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 4000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts: any) {
    return {
      links: [
        httpLink({
          url: `http://localhost:4000/trpc`,

          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },

        }),
      ],
    };
  },
  ssr: false,
});