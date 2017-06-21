<template>
  <div id="todo">
    <div class="add_new">
      <input type="text" class="add_text" placeholder="What needs to be done?" v-model="addText" @keyup.enter="addNew">
      <input type="checkbox" class="all_btn" v-model="isAll"></input>
    </div>
    <div class="todo_list">
      <ul>
        <li v-for="(todo,index) in filteredTodos" :class="{edit_text:todo == editList}">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label :class="{completed:todo.completed}" @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button class="delete" @click="removeTodo(index)"></button>
          <input type="text" v-model="todo.title" v-focus="todo == editList" @blur="doneEdit(todo)" @keyup.esc="cancleEdit(todo)" @keyup.enter="doneEdit(todo)">
        </li>
      </ul>
    </div>
    <div class="footer" v-show="todos.length">
      <a href="#/all" :class="{hover:hashName=='all'}">全部</a>
      <a href="#/active" :class="{hover:hashName=='active'}">未完成</a>
      <a href="#/completed" :class="{hover:hashName=='completed'}">已完成</a>
      <div class="info">{{remain}} {{todos.length > 1 ? 'items' : 'item'}} left</div>
      <div class="clear_completed" @click="clear"></div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      addText: '',
      todos: [
        {
          title: 'vue',
          completed: false
        },
        {
          title: 'vuex',
          completed: false
        }
      ],
      editList: null,
      hashName: 'all'
    }
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
}
</script>