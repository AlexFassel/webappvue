module.exports = {
    title: 'Hello VuePress',
    base: "/webappvue/",
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/devops/test.md' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' }
          ],
        sidebar: "auto"
        }
  }
