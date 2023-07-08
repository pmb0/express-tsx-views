import { fileURLToPath } from 'node:url'

export const dirname = fileURLToPath(new URL('.', import.meta.url))
