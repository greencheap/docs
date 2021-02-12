const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'GreenCheap CMS',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: 'https://res.cloudinary.com/dwmejslx5/image/upload/c_scale,w_250/v1613158157/greencheap/greencheap-logo_ikeypq.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    locales:{
      '/':{
        label: 'English',
        nav:[
          {
            text: 'Getting Started',
            link: '/getting-started/',
          },
          {
            text: 'User Interface',
            link: '/user-interface/'
          },
          {
            text: 'Developer',
            link: '/developer/'
          },
          {
            text: 'Extensions',
            link: '/extensions/'
          },
          {
            text: '3rd Party',
            link: '/3rd-party/'
          },
          {
            text: 'GreenCheap Site',
            link: 'https://greencheap.net'
          }
        ],
        sidebar: {
          '/getting-started/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
        }
      },
      '/tr/':{
        label: 'Türkçe',
        nav:[
          {
            text: 'Başlangıç',
            link: '/baslangic/',
          },
          {
            text: 'Kullanıcı Arayüzü',
            link: '/kullanici-arayuzu/'
          },
          {
            text: 'Geliştirici',
            link: '/gelistirici/'
          },
          {
            text: 'Eklentiler',
            link: '/eklentiler/'
          },
          {
            text: '3\'üncü Parti Uygulamalar',
            link: '/3rd-parti-uygulamalar/'
          },
          {
            text: 'GreenCheap Site',
            link: 'https://greencheap.net'
          }
        ],
        sidebar: {
          '/tr/guide/': [
            {
              title: 'Başlangıç',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
        }
      }
    }
  },

  locales: {
    '/': {
      lang: 'en-US',
      title: 'GreenCheap CMS',
      description: 'GreenCheap Documentations',
    },
    '/tr/': {
      lang: 'tr-TR',
      title: 'GreenCheap CMS',
      description: 'GreenCheap Dokümantasyon'
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
