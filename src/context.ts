import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

import { prismaClient } from "./prismaClient";

type ContextParams = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

export interface Context extends ContextParams {
  prisma: PrismaClient;
}

export const context = async ({
  req,
  res,
}: ContextParams): Promise<Context> => {
  return {
    prisma: prismaClient,
    req,
    res,
  };
};
