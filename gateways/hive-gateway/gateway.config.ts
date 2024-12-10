import {
  createInlineSigningKeyProvider,
  createRemoteJwksSigningKeyProvider,
  defineConfig,
  extractFromHeader,
} from "@graphql-hive/gateway";

const signingKey = "my-secret-key";

export const gatewayConfig = defineConfig({
  deferStream: true,
  jwt: {
    tokenLookupLocations: [
      extractFromHeader({ name: "authorization", prefix: "Bearer" }),
    ],
    singingKeyProviders: [
      createInlineSigningKeyProvider(signingKey),
      createRemoteJwksSigningKeyProvider({
        jwksUri: "http://localhost:4200/.well-known/jwks.json",
      }),
    ],
    tokenVerification: {
      issuer: "http://localhost:4200",
      audience: "audit",
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
