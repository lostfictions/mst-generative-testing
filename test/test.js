/* global describe:false */
const { types, clone, getSnapshot } = require('mobx-state-tree')
const jsc = require('jsverify')
const deepEqual = require('deep-equal')

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


describe("todos", () => {
  jsc.property("toggling a todo twice", jscTodo, t => {
    const todo = Todo.create(t)

    const cloned = clone(todo)
    cloned.toggle()
    cloned.toggle()

    return deepEqual(getSnapshot(cloned), getSnapshot(todo))
  })

  //....
})
