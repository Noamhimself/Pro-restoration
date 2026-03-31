/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_WEBHOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
