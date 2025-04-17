
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore("todoStore", () => {
  // State
  const todos = ref(JSON.parse(localStorage.getItem("todos") || "[]"));

  // Watcher to auto-save to localStorage whenever todos change
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  // Actions
  async function fetchTodos() {
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    todos.value = data;
    saveToLocalStorage();
  }

  async function addTodo(title) {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    await fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    await fetchTodos();
  }

  async function updateTodo(id, updatedTodo) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    await fetchTodos();
  }

  return {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  };
});