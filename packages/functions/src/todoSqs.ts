import { ApiHandler } from "sst/node/api";
import { TodoSqs } from "@sqs-v-ebridge/core/src/sqs/todo";

export const create = ApiHandler(async (_evt) => {
  await TodoSqs.create();

  return {
    statusCode: 200,
    body: "Todo created",
  };
});

export const list = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify(TodoSqs.list()),
  };
});
