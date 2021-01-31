import {effectWatch} from './reactivity/index.js'
import {createElement} from './renderer/index.js'

export function createApp(App) {
  return {
    mount(root) {
      const context = App.setup()
      effectWatch(() => {
        root.innerHTML = ''
        const vDom = App.render(context)
        createElement(vDom, root)
        // console.log(createElement(vDom, root))
        // root.append(createElement(vDom))
      })
    }
  }
}
Object.defineProperty()
