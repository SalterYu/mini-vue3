import {effectWatch, reactive} from './core/reactivity/index.js'
import {h} from './core/h/index.js'

// const user = reactive({
//   age: 19,
//   info: {
//     a: 1
//   }
// })
//
// effectWatch(() => {
//   // const b = user.age
//   const info = user.info
//   const a = info.a
// })
//
// user.info.a = 2
export default {
  render(context) {
    return h('div', {
      id: 'aaa',
      class: 'class'
    }, [h('p', null, `${context.state.count}`)])
    // const div = document.createElement('div')
    // div.innerText = context.state.count
    // return div
  },
  setup() {
    const state = reactive({
      count: 1
    })
    window.state = state
    return {state}
  }
}

// App.render(App.setup())
