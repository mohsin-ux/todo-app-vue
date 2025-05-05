<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps(["todo", "index", "editingIndex", "modelValue"]);
const emit = defineEmits([
  "update:modelValue",
  "update-completed",
  "onDelete",
  "saveEdit",
  "onClickOutside",
  "onEdit",
]);

const inputRefs = ref([]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const completedValue = computed({
  get: () => props.todo.completed,
  set: (value) => emit("update-completed", props.todo.id, value),
});
</script>

<template>
  <div
    v-if="editingIndex !== index"
    class="flex items-center justify-between bg-green-50 px-3"
  >
    <div class="flex">
      <input
        class="text-cyan-500 border-cyan-500"
        type="checkbox"
        v-model="completedValue"
      />
      <div
        @click="$emit('onEdit', index, inputRefs)"
        class="m-2"
        :class="{ 'line-through': todo.completed }"
      >
        {{ todo.title }}
      </div>
    </div>
    <div class="flex">
      <button
        class="border bg-blue-500 text-white rounded m-2 px-2 py-1 cursor-pointer"
        @click="$emit('onEdit', index, inputRefs)"
      >
        Edit
      </button>
      <button
        @click="$emit('onDelete', index)"
        class="bg-red-600 text-white rounded px-4 py-1 m-2 cursor-pointer"
      >
        Delete
      </button>
    </div>
  </div>
  
  <div v-else class="flex items-center justify-between bg-green-50 p-2">
    <input
    :ref="(ref) => (inputRefs[index] = ref)"
    @keyup.enter="$emit('saveEdit', index)"
    @blur="
        () => {
          $emit('onClickOutside');
        }
        "
      type="text"
      v-model="inputValue"
      class="border px-2 py-1"
      />
      <button
      class="border bg-cyan-500 m-2 px-2 py-1"
      @click="$emit('saveEdit', index)"
      >
      edit
    </button>
  </div>
  <div class="m-2 p-2 inline-block border rounded " :class="{ 'bg-green-500 text-white': todo.completed === true }" >Done</div>
  <div class="m-2 p-2 inline-block border rounded" :class="{ 'bg-yellow-400 text-white border-yellow-400': todo.completed === false }" >In Progress</div>
</template>
