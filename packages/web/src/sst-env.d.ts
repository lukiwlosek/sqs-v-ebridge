/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly SQS_QUEUE_ARN: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}