import shell from 'shelljs'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Ensure we're in the project root
const DIR = process.cwd()
shell.cd(DIR)

// Step 1: Build the project
shell.cd('packages/client/src')
const config = require(resolve(DIR, 'packages/client/src/config.ts')).default
shell.mv('config.ts', '_config.ts')
writeFileSync('config.ts', `export default ${JSON.stringify({ ...config, url: '/api' }, null, 2)}`)
shell.cd(DIR)

if (shell.exec('pnpm build').code !== 0) {
  shell.echo('Error: Build failed')
  shell.exit(1)
}

shell.cd('packages/client/src')
shell.rm('config.ts')
shell.mv('_config.ts', 'config.ts')
shell.cd(DIR)

// Step 2: Delete assets directory and index.html
shell.rm('-rf', 'packages/core/public/assets', 'packages/core/public/index.html')

// Step 3: Move files from client/dist to core/public
shell.mv('packages/client/dist/*', 'packages/core/public/')

// Step 4: Rename files
shell.cd('packages/core/')
shell.mv('.env', '_.env')

// Step 5: Write new .env file
const envContent = `# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# MoeHub server port

PORT=5000

# MoeHub logger level

LOG_LEVEL=30
`

writeFileSync('.env', envContent)

// Step 6: Package the core
if (shell.exec('pnpm pack').code !== 0) {
  shell.echo('Error: Packaging failed')
  shell.exit(1)
}

// Step 7: Clean up .env files
shell.rm('.env')
shell.mv('_.env', '.env')

// Step 8: Move the packed file to project root

shell.mv('*.tgz', '../../')

shell.echo('Script completed successfully')
