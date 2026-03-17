import { defineConfig } from 'vitepress'
import Theme from '@sugarat/theme'
import fs from 'fs'
import path from 'path'

function getSidebarItems(dirPath: string, basePath: string): any[] {
  const items: any[] = []
  if (!fs.existsSync(dirPath)) return items

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subItems = getSidebarItems(path.join(dirPath, entry.name), `${basePath}/${entry.name}`)
      if (subItems.length > 0) {
        items.push({ text: entry.name, items: subItems })
      }
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const name = entry.name.replace('.md', '')
      items.push({ text: name, link: `${basePath}/${name}` })
    }
  }
  return items
}

function generateSidebar() {
  const docsPath = path.join(process.cwd(), 'docs')
  const sidebar: Record<string, any[]> = {}

  const entries = fs.readdirSync(docsPath, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      const dirPath = path.join(docsPath, entry.name)
      const items = getSidebarItems(dirPath, `/${entry.name}`)
      if (items.length > 0) {
        sidebar[`/${entry.name}/`] = [
          { text: entry.name, collapsed: true, items }
        ]
      }
    }
  }
  return sidebar
}

export default defineConfig({
  title: "Eric Tech Lab",
  description: "网络 | Linux | 运维",
  base: "/word/",

  lang: "zh-CN",

  themeConfig: {

    nav: [
      { text: "首页", link: "/" },
      { text: "网络", link: "/network/" },
      { text: "Linux", link: "/linux/" }
    ],

    sidebar: generateSidebar()

  }

})
