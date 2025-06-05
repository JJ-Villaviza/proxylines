import authentication from "./authentication";
import branch from "./branch";

export const routes = [authentication, branch] as const;
