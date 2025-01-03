import { z } from "zod";

import type { Card } from "@prisma/client";
import type { ActionState } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
