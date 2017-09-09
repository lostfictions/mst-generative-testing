import { types, clone, getSnapshot } from 'mobx-state-tree'
import * as jsc from 'jsverify'
import deepEqual = require('deep-equal')

import { property } from './mst-property'

const Todo = types.model("Todo", {
  title: types.string,
  done: types.boolean
}).actions(self => ({
  toggle() {
    self.done = !self.done
  }
}))

const Store = types.model("Store", {
  todos: types.array(Todo)
})

const jscTodo = jsc.record({
  title: jsc.string,
  done: jsc.bool
})

const jscStore = jsc.record({
  todos: jsc.array(jscTodo)
})


describe("todos using jsc types", () => {
  jsc.property("toggling a todo twice", jscTodo, t => {
    const todo = Todo.create(t)

    const cloned = clone(todo)
    cloned.toggle()
    cloned.toggle()

    return deepEqual(getSnapshot(cloned), getSnapshot(todo))
  })

  //....
})

describe("todos using mst types", () => {
  property("toggling a todo twice", Todo, (todo : typeof Todo.Type) => {
    const cloned = clone(todo)
    cloned.toggle()
    cloned.toggle()

    return deepEqual(getSnapshot(cloned), getSnapshot(todo))
  })

  //....
})

