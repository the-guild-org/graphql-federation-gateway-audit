import {
  createRemoteJwksSigningKeyProvider,
  defineConfig,
  extractFromHeader,
} from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  deferStream: true,
  jwt: {
    tokenLookupLocations: [
      extractFromHeader({ name: "authorization", prefix: "Bearer" }),
    ],
    singingKeyProviders: [
      createRemoteJwksSigningKeyProvider({
        jwksUri: "http://localhost:4200/.well-known/jwks.json",
      }),
    ],
    tokenVerification: {
      algorithms: ["HS256", "RS256"],
    },
    reject: {
      missingToken: false,
      invalidToken: false,
    },
  },
  genericAuth: {
    mode: "protect-granular",
    resolveUserFn: (ctx) => ctx.jwt?.payload,
    rejectUnauthenticated: false,
  },
});
