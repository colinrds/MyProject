// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import css from './css/index.css'

Vue.config.productionTip = false

var filters = {
    all(todos) {
        return todos
    },
    active(todos) {
        return todos.filter((todo) => {
            return !todo.completed
        })
    },
    completed(todos) {
        return todos.filter((todo) => {
            return todo.completed
        })
    }
}

/* eslint-disable no-new */
let app = new Vue({
    el: '#todo',
    data: {
        addText: '',
        todos: [],
        editList: null,
        hashName: 'all'
    },
    computed: {
        remain() {
            return filters.active(this.todos).length
        },
        isAll: {
            get() {
                return this.remain === 0
            },
            set(value) {
                this.todos.forEach((todo) => {
                    todo.completed = value
                })
            }
        },
        filteredTodos() {
            return filters[this.hashName](this.todos);
        }
    },
    methods: {
        addNew(e) {
            if (!this.addText) {
                return;
            }
            this.todos.push({
                title: this.addText,
                completed: false
            });
            this.addText = '';
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        },
        editTodo(todo) {
            this.editCache = todo.title;
            this.editList = todo;
        },
        doneEdit(todo, index) {
            this.editList = null;
            if (!todo.title) {
                this.removeTodo(index)
            }
        },
        cancleEdit(todo) {
            this.editList = null;
            console.log(this.editCache);
            todo.title = this.editCache;
        },
        clear() {
            this.todos = filters.active(this.todos);
        }
    },
    directives: {
        focus(el, value) {
            if (value) {
                el.focus();
            }
        }
    }
})

function hashChange() {
    let hashName = location.hash.replace(/#\/?/, '');
    if (filters[hashName]) {
        app.hashName = hashName
    } else {
        location.hash = '';
        app.hashName = 'all';
    }
}
window.addEventListener('hashchange', hashChange)
// new Vue({
//   el: '#info',
//   template: '<info/>',
//   components: { info }
// })