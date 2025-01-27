
import { writeFile } from "fs/promises"
import { globby } from "globby"
import prettier from "prettier"

const WEBSITE_URL = "https://cccv-painel.vercel.app"

async function generateSitemapAndRobots() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js")

  // Gerar Sitemap
  const pages = await globby([
    "app/**/*.tsx",
    "app/**/*.ts",
    "app/**/*.js",
    "app/**/*.jsx",
    "!app/**/_*.tsx",
    "!app/**/_*.ts",
    "!app/**/_*.js",
    "!app/**/_*.jsx",
    "!app/api/**/*",
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page: string) => {
          const path = page
            .replace("app", "")
            .replace(/(.tsx|.ts|.js|.jsx)/, "")
            .replace("/page", "")
          const route = path === "/index" ? "" : path
          return `
            <url>
              <loc>${`${WEBSITE_URL}${route}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join("")}
    </urlset>
  `

  const formattedSitemap = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  })

  // Escrever sitemap.xml
  await writeFile("public/sitemap.xml", formattedSitemap)

  // Gerar Robots.txt
  const robots = `
    User-agent: *
    Allow: /

    Sitemap: ${WEBSITE_URL}/sitemap.xml
  `

  const formattedRobots = await prettier.format(robots, {
    ...prettierConfig,
    parser: "babel",
  })

  // Escrever robots.txt
  await writeFile("public/robots.txt", formattedRobots)

  console.log("Sitemap e Robots.txt gerados com sucesso!")
}

generateSitemapAndRobots()

