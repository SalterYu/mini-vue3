let targetEffect = null

class Dep {
  constructor(value) {
    this.effects = new Set()
    this._value = value
  }

  get value() {
    this.depend()
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    dep.notice()
  }

  // 收集依赖
  depend() {
    if (targetEffect) {
      this.effects.add(targetEffect)
    }
  }

  // 触发
  notice() {
    this.effects.forEach(effect => effect())
  }
}

// const dep = new Dep(10)
//
export function effectWatch(effect) {
  targetEffect = effect
  effect()
  // 防止污染
  targetEffect = null
}
//
// let b = undefined
//
// effectWatch(() => {
//   b = dep.value + 10
//   console.log(b)
// })
//
// dep.value = 20

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

const targetMap = new Map()

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // key -> dep
      // dep存放
      const dep = getDep(target, key)
      dep.depend()

      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }
  })
}

