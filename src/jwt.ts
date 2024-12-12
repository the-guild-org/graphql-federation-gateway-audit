import { generateKeyPairSync } from "node:crypto";
import jwt from "jsonwebtoken";

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

export { publicKey, privateKey };

export function createJWT(scopes: string[]) {
  return jwt.sign(
    {
      scope: scopes.join(" "),
      sub: "12345",
      iat: Math.floor(Date.now() / 1000),
    },
    privateKey.export({ format: "pem", type: "pkcs8" }),
    {
      expiresIn: "1y",
      algorithm: "RS256",
    }
  );
}
