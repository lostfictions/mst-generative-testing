/* global describe:false */
import { types, destroy, clone, getSnapshot } from './mst-src' //'mobx-state-tree'
/* global deepEqual:false */ import deepEqual = require('deep-equal') //eslint-disable-line no-undef

import { property } from './mst-property'


const SHOW_ALL = 'show_all'
const SHOW_COMPLETED = 'show_completed'
const SHOW_ACTIVE = 'show_active'

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal))
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo : typeof Todo.Type) => !todo.completed,
  [SHOW_COMPLETED]: (todo : typeof Todo.Type) => todo.completed
}

const Todo = types
  .model({
    text: types.string,
    completed: false,
    id: types.identifier(types.number)
  })
  .actions(self => ({
    remove() {
      destroy(self)
    },
    edit(text: string) {
      self.text = text
    },
    complete() {
      self.completed = !self.completed
    }
  }))

const TodoStore = types
  .model({
    todos: types.array(Todo),
    filter: types.optional(filterType, SHOW_ALL)
  })
  .views(self => ({
    get completedCount() {
      return self.todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
    },
    get activeCount() {
      return self.todos.length - (self as any).completedCount
    },
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[ self.filter ])
    }
  }))
  .actions(self => ({
    // actions
    addTodo(text: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      self.todos.unshift({
        id,
        text
      } as any)
    },
    completeAll() {
      const areAllMarked = self.todos.every(todo => todo.completed)
      self.todos.forEach(todo => (todo.completed = !areAllMarked))
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter(todo => todo.completed === false))
    },
    setFilter(filter : typeof filterType.Type) {
      self.filter = filter
    }
  }))


describe('todos', () => {
  property('toggling a todo twice leaves it in its original state', Todo, todo => {
    const cloned = clone(todo)
    cloned.complete()
    cloned.complete()

    return deepEqual(getSnapshot(cloned), getSnapshot(todo))
  })

  property('marking all todos completed leaves none active', TodoStore, store => {
    store.completeAll()
    return store.activeCount === 0
  })


  //....
})

/////////////////
/////////////////

import { hasParent, getParent } from 'mobx-state-tree'

const Box = types
  .model('Box', {
    id: types.identifier(),
    name: 'hal',
    x: 0,
    y: 0
  })
  .views(self => ({
    get width() {
      return self.name.length * 15
    },
    get isSelected() {
      if (!hasParent(self)) return false
      return getParent(self, 2).selection === self
    }
  }))
  .actions(self => ({
    move(dx : number, dy : number) {
      self.x += dx
      self.y += dy
    },
    setName(newName : string) {
      self.name = newName
    }
  }))

describe('boxes', () => {
  property('width is always be greater than 0', Box, box => box.width > 0)
})
