import { html } from 'lit-html'
import { classes, pluralize } from '~/utils'

import state from '~/state'

const isVisible = filter => {
  return state.visibility === filter
}

//bottom row filter buttons
const filterItem = (filter, label) => {
  return html`
    <li>
      <a
        href="#/${filter}"
        class=${classes({ selected: isVisible(filter) })}
        >${label}</a
      >
    </li>
  `
}

const removeCompleted = event => {
  state.todos = state.todos.filter(todo => !todo.completed)
}

// clear completed button
const clearBtn = _ => {
  if (state.todos.length > state.remaining) {
    return html`
      <button class="clear-completed" @click="${removeCompleted}">
        Clear completed
      </button>
    `
  }
}

// app footer template
export const todoFooter = _ => {
  if (!state.todos.length) {
    return ''
  }

  return html`
    <footer class="footer">
      <span class="todo-count">
        <strong>${state.remaining}</strong>
        ${pluralize('item', state.remaining)} left
      </span>
      <ul class="filters">
        ${filterItem('all', 'All')}
        ${filterItem('active', 'Active')}
        ${filterItem('completed', 'Completed')}
      </ul>
      ${clearBtn()}
    </footer>
  `
}
