<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useTodoStore } from "../stores/todoStore";
import ShowTodo from "./components/ShowTodo.vue";

const store = useTodoStore();
const todoTitle = ref("");
const editingIndex = ref(null);
const editText = ref("");

const arr = [
  "All Completed",
  "All In Progress",
  "All Tasks",
  "Today Tasks",
  "1 Week tasks",
];

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

function updateCompleted(id, completed) {
  store.updateTodo(id, { completed });
}

function onClick(e) {
  console.log("clicked", e.target.value);
}

</script>

<template>
  <p class="text-3xl font-bold p-3">Todo List</p>
  <div class="p-4 h-screen flex">
    <div class="w-[20%] bg-green-50 p-3 mr-6">
      Table Of Content
      <div v-for="i,index in 5">
        <div
          class="bg-cyan-300 my-2 px-2 py-1 text-white rounded cursor-pointer hover:bg-emerald-400"
          @click="onClick"
        >
          {{ arr[index] }}
        </div>
      </div>
    </div>

    <div>
      <input
        placeholder="Add todo"
        @keyup.enter="addTodo"
        type="text"
        v-model="todoTitle"
        class="px-2 w-120 py-1 border bg-white"
      />
      <button
        @click="addTodo"
        class="border bg-cyan-500 px-4 py-1 m-2 hover:bg-cyan-300"
      >
        add
      </button>

      <div class="w-[75%] max-h-120 overflow-y-scroll">
        <div class="" v-for="(todo, index) in store.todos" :key="index">
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
          <p class="border border-cyan-500 mb-5 "></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
