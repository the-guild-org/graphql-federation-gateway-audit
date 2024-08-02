import { config } from "dotenv";

export const env = config().parsed ?? {
  PUNISH_FOR_POOR_PLANS: "1",
};

export interface Env {
  PUNISH_FOR_POOR_PLANS?: "1" | "0";
}

export function shouldPunishForPoorPlans(context: { env: Env }) {
  return context.env.PUNISH_FOR_POOR_PLANS === "1";
}
