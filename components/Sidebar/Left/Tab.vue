<template>
  <nuxt-link
    to="/"
    class="flex items-center p-2 rounded-full w-min text-black hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="w-5 h-5 text-dark">
      <slot name="icon" />
    </div>
    <div class="hidden ml-3 text-xl xl:block" :class="textClasses">
      <slot name="name" />
    </div>
  </nuxt-link>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>
