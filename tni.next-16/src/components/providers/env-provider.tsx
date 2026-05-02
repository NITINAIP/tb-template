import { ComponentProps } from "@/utils/types";
import { RootProvider } from "./root-provider";

export default function EnvProvider({ children }: ComponentProps) {
  const session = process.env.SESSION_SECRET || "";
  return <RootProvider sessionSecret={session}>{children}</RootProvider>;
}
