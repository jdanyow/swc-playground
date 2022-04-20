import * as fs from 'node:fs/promises'
import { fetch } from 'undici'

const response = await fetch(
  'https://data.jsdelivr.com/v1/package/npm/@swc/binding_core_wasm'
)
const {
  tags: { latest },
} = (await response.json()) as { tags: { latest: string } }

const envFile = await fs.readFile('.env', 'utf8')
const current = /NEXT_PUBLIC_SWC_VERSION=(?<current>\d+\.\d+\.\d+)/.exec(
  envFile
).groups.current
if (current !== latest) {
  await fs.writeFile(
    '.env',
    envFile.replace(
      `NEXT_PUBLIC_SWC_VERSION=${current}`,
      `NEXT_PUBLIC_SWC_VERSION=${latest}`
    )
  )
}