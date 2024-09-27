# Map Collection Scrapers

Scrapers for various IIIF map collections.

Built with https://bun.sh/.

## Usage

List available scrapers:

```sh
bun index.ts
```

Run a scraper:

```sh
bun index.ts <scraper>
```

This will output a NDJSON file in the `data` directory.

Merge scraped data into a single JSON array:

```sh
bun run merge
```
