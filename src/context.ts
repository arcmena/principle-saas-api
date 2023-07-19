import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

type ContextParams = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

export interface Context extends ContextParams {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const context = async ({
  req,
  res,
}: ContextParams): Promise<Context> => {
  return {
    prisma,
    req,
    res,
  };
};
