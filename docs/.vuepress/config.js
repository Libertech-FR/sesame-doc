import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  base: '/sesame-doc',
  title: 'Sesame',
  description: "Sesame gestionnaire d'identités",
theme: defaultTheme({
    // sidebar object
    // pages under different sub paths will use different sidebar
    sidebar: {

      '/': [
        {
          text: "Introduction",
          link: "/"
        },
        {
          text: 'Installation',
          // prefix will be prepended to relative paths
          prefix: "/installation/",
          children: [
             'installation-server',  
             'installation-daemon',
             'installation-taiga' 
          ],
        },{
          text: 'Configuration',
          prefix: '/configuration',
          children: [ 
             'architecture',
             'data',
             'validation',
             'exemple'
          ]
	}
      ],
    },
  }),
  bundler: viteBundler(),
})
