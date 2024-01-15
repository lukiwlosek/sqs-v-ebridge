import { StackContext, Api, EventBus, Queue, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const sqs = new Queue(stack, 'queue')

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo-e-bridge": "packages/functions/src/todo.list",
      "GET /todo-sqs": "packages/functions/src/todoSqs.list",
      "POST /todo-e-bridge": "packages/functions/src/todo.create",
      "POST /todo-sqs": "packages/functions/src/todoSqs.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      SQS_QUEUE_ARN: sqs.queueArn
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
