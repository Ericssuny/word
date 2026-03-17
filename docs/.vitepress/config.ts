import { defineConfig } from 'vitepress'
import Theme from '@sugarat/theme'
import fs from 'fs'
import path from 'path'

function getSidebar(dir: string) {
  const items: any[] = []
  const dirPath = path.join(process.cwd(), 'docs', dir)
  
  if (!fs.existsSync(dirPath)) return []

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subItems: any[] = []
      const subDirPath = path.join(dirPath, entry.name)
      const subEntries = fs.readdirSync(subDirPath, { withFileTypes: true })
      
      for (const subEntry of subEntries) {
        if (subEntry.name.endsWith('.md')) {
          const name = subEntry.name.replace('.md', '')
          subItems.push({ 
            text: name, 
            link: `/${dir}/${entry.name}/${name}` 
          })
        }
      }
      
      if (subItems.length > 0) {
        items.push({ text: entry.name, items: subItems })
      }
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const name = entry.name.replace('.md', '')
      items.push({ text: name, link: `/${dir}/${name}` })
    }
  }
  
  return items
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

    sidebar: {
      "/network/": getSidebar('network'),
      "/linux/": getSidebar('linux')
    }

  }

})
