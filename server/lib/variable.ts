import type { Branch, Session } from "@/types/schemas";

export type Variables = {
  Variables: {
    user: Branch | null;
    session: Session | null;
  };
};
