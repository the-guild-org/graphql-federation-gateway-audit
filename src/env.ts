import { MutationsTestStorage } from "./test-cases/mutations/data";

export interface Env {
  MUTATIONS: DurableObjectNamespace<MutationsTestStorage>;
}
