import fs from 'fs'
import { parseArgs } from 'util'
import { Glob } from 'bun'

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true
})

const scrapers = positionals.slice(2)

const glob = new Glob('./scrapers/**/*.ts')

for await (const file of glob.scan('.')) {
  const match = file.match(/scrapers\/(?<id>\w+).ts/)
  const id = match?.groups?.id

  if (scrapers.length) {
    if (id && scrapers.includes(id)) {
      console.log(`Scraping ${id}...`)

      const { default: scrape } = await import(file)
      const stream = fs.createWriteStream(`./data/${id}.ndjson`, 'utf8')

      for await (const item of await scrape()) {
        console.log(item)
        stream.write(`${JSON.stringify(item)}\n`)
      }

      stream.end()
    }
  } else {
    console.log('Available scraper:', id)
  }
}
