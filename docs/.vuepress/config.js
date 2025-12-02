import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'fr-FR',
  base: '/sesame-doc',
  title: 'Sesame',
  description: "Sesame gestionnaire d'identités",
  plugins: [
      'vuepress-plugin-mermaidjs'
  ],
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
              'gestion-mdp',
              'architecture-de-securite'
          ],
        },{
          text: 'Configuration',
          prefix: '/configuration',
          children: [ 
             'architecture',
             'data',
             'validation',
             'formulaire',
              'config-gestion-mdp',
              'cyclevie'
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
             'librairie_python',
             'backend_AD',
             'backend_LDAP'
          ]
        },
          {
              text: "Utilisation de l'API",
              prefix: '/Api',
              children: [
                  'filtres',
                  'photo',
                  'exempleapi'
              ]
          },
          {
              text: "Personalisation de l'UI",
              prefix: '/Ui',
              children: [
                  'personalisation_tuiles',
              ]
          },
        {
          text: 'Upgrades',
          prefix: '/upgrades',
          children: [
             'alpha-to-v2'
          ]
        },

      ],
    },
  }),
  bundler: viteBundler(),
})
