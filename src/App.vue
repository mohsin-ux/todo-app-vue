<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useTodoStore } from "../stores/todoStore";
import ShowTodo from "./components/ShowTodo.vue";

const store = useTodoStore();
const todoTitle = ref("");
const editingIndex = ref(null);
const editText = ref("");

onMounted(async () => {
  store.fetchTodos();
});
function addTodo() {
  if (todoTitle.value !== "") {
    store.addTodo(todoTitle.value);
    todoTitle.value = "";
  } else {
    alert("empty todo cannot be created...");
  }
}

function onDelete(todoId) {
  store.deleteTodo(todoId);
}

function onEdit(index, inputRefs) {
  editingIndex.value = index;
  editText.value = store.todos[index].title;
  inputRefs?.[index]?.focus();
}
function saveEdit(index) {
  const todo = store.todos[index];
  store.updateTodo(todo.id, { ...todo, title: editText.value });
  editingIndex.value = null;
  editText.value = "";
}

async function updateCompleted(id, completed) {
  store.updateTodo(id, { completed });
}
</script>

<template>
  <div class="p-4 h-screen bg-green-500">
    <p class="text-3xl font-bold">Todo List</p>

    <div>
      <input
        placeholder="Add todo"
        @keyup.enter="addTodo"
        type="text"
        v-model="todoTitle"
        class="px-2 w-120 py-1 border bg-white"
      />
      <button @click="addTodo" class="border bg-cyan-500 px-4 py-1 m-2">
        add
      </button>

      <div class=" w-150 h-100 overflow-y-scroll bg-amber-600">
        <div
          class=""
          v-for="(todo, index) in store.todos"
          :key="index"
        >
          <ShowTodo
            :editingIndex="editingIndex"
            :index="index"
            :todo="todo"
            @on-edit="onEdit"
            @on-delete="onDelete(todo.id)"
            @save-edit="saveEdit"
            @onClickOutside="editingIndex = null"
            @update:modelValue="editText"
            @update-completed="updateCompleted"
            v-model="editText"
          />
          <p class="border border-cyan-500"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
