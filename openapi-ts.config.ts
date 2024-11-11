import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input:
    'http://localhost:8000/openapi.json',
    // 'https://raw.githubusercontent.com/FelizCoder/crewstand.backend/refs/heads/main/openapi/openapi.json',
  output: {
    path: './app/api',
    format: 'prettier',
    lint: 'eslint',
  },
  types: {
    enums: 'typescript',
  },
});
