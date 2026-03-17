import { defineConfig } from 'vitepress'
import Theme from '@sugarat/theme'
export default defineConfig({
  title: "Eric Tech Lab",
  description: "网络 | Linux | 运维",

  lang: "zh-CN",

  themeConfig: {

    nav: [
      { text: "首页", link: "/" },
      { text: "网络", link: "/network/" },
      { text: "Linux", link: "/linux/" }
    ],

    sidebar: {

      "/network/": [
        {
          text: "网络",
          collapsed: true,
          items: [
            { text: "防火墙", link: "/network/ros/firewall" },
            { text: "WireGuard", link: "/network/ros/wireguard" },
            { text: "QoS", link: "/network/ros/qos" }
          ]
        },
        {
          text: "代理",
          items: [
            { text: "Sing-box", link: "/network/singbox" }
          ]
        }
      ],

      "/linux/": [
        {
          text: "Linux",
          collapsed: true,
          items: [
            { text: "Docker", link: "/linux/docker" },
            { text: "System", link: "/linux/system" }
          ]
        }
      ]

    }

  }

})
