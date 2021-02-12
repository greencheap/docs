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
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
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
            text: 'Developers',
            link: '/developers/'
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
        sidebar:{
          '/getting-started/': [
            {
              title: 'Getting Started',
              collapsable: false,
              children: [
                '',
                'configuration',
                'requirements',
                'server'
              ]
            },
            {
              title: 'User Interface',
              collapsable: false,
              children: [
                'site',
                'dashboard'
              ]
            }
          ],
          '/developers/': [
            {
              title: 'Developers',
              collapsable: false,
              children: [
                '',
                'application',
                'cli',
                'database',
                'events',
                'modules',
                'orm',
                'packages',
                'permissions',
                'response',
                'routing',
                'templating',
                'themes',
                'translation',
                'vue',
                'widgets'
              ]
            }
          ],
          '/extensions/': [
            {
              title: 'Extensions',
              collapsable: false,
              children: [
                ''
              ]
            }
          ],
          '/3rd-party/': [
            {
              title: '3rd Party',
              collapsable: false,
              children: [
                '',
                'netgsm'
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
            link: '/tr/baslangic/',
          },
          {
            text: 'Geliştirici',
            link: '/tr/gelistirici/'
          },
          {
            text: 'Eklentiler',
            link: '/tr/eklentiler/'
          },
          {
            text: '3\'üncü Parti Uygulamalar',
            link: '/tr/3rd-parti-uygulamalar/'
          },
          {
            text: 'GreenCheap Site',
            link: 'https://greencheap.net'
          }
        ],
        sidebar:{
          '/tr/baslangic/': [
            {
              title: 'Başlangıç',
              collapsable: false,
              children: [
                '',
                'yapilandirma-dosyasi',
                'gereksinimler',
                'sunucu-yapilandirmasi'
              ]
            },
            {
              title: 'Kullanıcı Arayüzü',
              collapsable: false,
              children: [
                'site',
                'kontrol-paneli'
              ]
            }
          ],
          '/tr/gelistirici/': [
            {
              title: 'Geliştirici',
              collapsable: false,
              children: [
                '',
                'cli',
                'gorunumler-ve-sablon-olusturma',
                'kullanicilar-izinler',
                'moduller',
                'olaylar',
                'orm',
                'paketler',
                'temalar',
                'tercume',
                'uygulama',
                'veritabani',
                'vuejs-webpack',
                'widgetlar',
                'yanit',
                'yonlendirme'
              ]
            }
          ],
          '/tr/eklentiler/': [
            {
              title: 'Eklentiler',
              collapsable: false,
              children: [
                '',
              ]
            }
          ],
          '/tr/3rd-parti-uygulamalar/': [
            {
              title: '3\'üncü Parti Uygulamalar',
              collapsable: false,
              children: [
                ''
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
