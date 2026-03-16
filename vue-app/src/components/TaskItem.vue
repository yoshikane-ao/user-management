<script setup lang="ts">
type Task = { id:number; title:string; done:boolean }

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits([
  "toggle",
  "remove",
  "edit"
])
</script>

<template>
  <li>
    <label>
      <input
        type="checkbox"
        v-bind:checked="props.task.done"
        @change="emit('toggle', props.task.id, !props.task.done)"
      />
      {{ props.task.title }}
    </label>

    <button @click="emit('remove', props.task.id)">
      削除
    </button>

    <button @click="emit('edit', props.task.id)">
        編集
    </button>
  </li>
</template>