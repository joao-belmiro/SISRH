import { Notify } from 'quasar'
export const notify = function (mensagem, cor, icone) {
  Notify.create({
    message: `<strong>${mensagem}</strong>`,
    icon: icone,
    html: true,
    color: cor,
    position: 'top-right',
    progress: true,
    timeout: 4000,
    textColor: 'white',
    actions: [{ color: 'white', icon: 'close', size: 'sm', round: true }]
  })
}
