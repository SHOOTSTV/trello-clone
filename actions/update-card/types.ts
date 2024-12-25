import { z } from "zod";

import type { Card } from "@prisma/client";
import type { ActionState } from "@/lib/create-safe-action";

import { UpdateCard } from "./schema";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>;
