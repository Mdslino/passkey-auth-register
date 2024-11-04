<template>
  <code
    class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6"
  >
    <span class="flex gap-4">
      <span class="flex-1">
        <span>
          {{ code }}
        </span>
      </span>
    </span>

  </code>
</template>
<script setup lang="ts">
defineProps({
  code: String,
});
</script>
