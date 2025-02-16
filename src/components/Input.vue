<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();
const { locale } = useI18n();

const emit = defineEmits(['update:modelValue', 'blur']);

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
  },
});

const direction = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'));

const initialPlaceholder = computed(() => {
  if (props.placeholder)
    return props.placeholder;
  else {
    if (direction === 'ltr') {
      return t('inputs.placeholder') + ' ' + props.label;
    } else {
      return props.label + ' ' + t('inputs.placeholder');
    }
  }
});
</script>

<template>
  <div :dir="direction" class="w-full">
    <span>
      {{ label }}
    </span>
    <label class="input input-bordered flex items-center gap-2" :dir="type !== 'password'?'ltr':direction">
      <slot name="icon"></slot>
      <input
        :value="modelValue"
        :type="type"
        :placeholder="initialPlaceholder"
        class="grow focus:outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      />
    </label>
    <span v-if="error" class="text-red-500 text-sm mt-1">{{ t(error) }}</span>
  </div>
</template>
<style>

:dir(ltr) input::placeholder {
  text-align: left !important;
}

:dir(rtl) input::placeholder {
  text-align: right !important;
}


</style>
