<script setup lang="ts">
const fidoSign = useFidoSign();
const fidoAuth = useFidoAuth();

function getCode() {
  if (fidoSign.value) {
    return JSON.stringify(fidoSign.value, null, 2);
  } else if (fidoAuth.value) {
    return JSON.stringify(fidoAuth.value, null, 2);
  } else {
    return "";
  }
}
</script>

<template>
  <Shiki lang="json" :code="getCode()" />
</template>
