import { MutationsTestStorage } from "./test-cases/mutations/data";

export interface Env {
  MUTATIONS: DurableObjectNamespace<MutationsTestStorage>;
  PUNISH_FOR_POOR_PLANS?: "true" | "false";
}

export function shouldPunishForPoorPlans(context: { env: Env }) {
  console.log(
    "punishing for poor plans?",
    context.env.PUNISH_FOR_POOR_PLANS === "true" ? "yes" : "no"
  );
  return context.env.PUNISH_FOR_POOR_PLANS === "true";
}
