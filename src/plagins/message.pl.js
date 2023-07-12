export default {
  install (app, options) {
    /* app.config.globalProperties.$newmess = (text) => {
      window.M.toast({ html: text })
    }
    app.config.globalProperties.$error = function (html) {
      window.M.toast({ html: `[Ошибка]: ${html}` })
    } */
    app.config.globalProperties.testi = 'test'
  }
}
