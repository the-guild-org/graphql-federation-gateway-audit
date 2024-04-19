import { HonoRequest } from "hono";

export function getBaseUrl(req: HonoRequest) {
  return new URL(req.url).origin;
}
