<script setup>
const props = defineProps ({
    hahaha: String
})
</script>

<template>
<input type="text" name="test">
<button type="button" name="aaa">ボタンです。</button>
<h1>{{ props.hahaha }}</h1>

</template>