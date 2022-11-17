/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_END_POINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
