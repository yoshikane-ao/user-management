<script setup>
const props = defineProps({
  message: String,
  Mybutton: String,
  test: String
})

const emit = defineEmits(["notify"])

function send() {
    emit("notify", props.message)
}
</script>

<template>
  <p>{{ props.message }}</p>
  <button type="button">{{ props.Mybutton }}</button>
  <p>{{ props.test }}</p>

  <p>{{ props.message }}</p>
  <button @click="send">親に通知</button>

</template>