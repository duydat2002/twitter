<template>
  <div>
    <label
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <input
      @input="(event) => emits('update:modelValue', event.target.value)"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</template>
<script setup>
const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
