import { httpLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "../../currapay-backend/src/trpc/_app";

function getBaseUrl() {
  // use localhost or production url
  const apiBaseUrl = process.env.API_BASE_URL;
  const baseUrl = apiBaseUrl ?? `http://localhost:4000`;

  return baseUrl;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts: any) {
    return {
      links: [
        httpLink({
          url: `${getBaseUrl()}/trpc`,

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
