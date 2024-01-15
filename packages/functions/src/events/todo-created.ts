import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@sqs-v-ebridge/core/src/eBridge/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
