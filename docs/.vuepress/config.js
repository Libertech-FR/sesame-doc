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
             'installation-taiga',
              'gestion-mdp'
          ],
        },{
          text: 'Configuration',
          prefix: '/configuration',
          children: [ 
             'architecture',
             'data',
             'validation',
             'formulaire',
              'config-gestion-mdp'
          ]
	},
        {
          text: 'Importation',
          prefix: '/import',
          children: [
             'configuration',
             'configyml',
             'importtaiga'
          ]
        },
       {
          text: 'Backends',
          prefix: '/backends',
          children: [
             'backends',
             'backend_AD',
             'backend_LDAP'
          ]
        }

      ],
    },
  }),
  bundler: viteBundler(),
})
