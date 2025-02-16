<script setup>
import { useI18n } from 'vue-i18n';
import { ref, watchEffect } from 'vue';

const { t } = useI18n();

const { locale } = useI18n();
const languages = ref([
  { code: 'en', label: 'English' },
  { code: 'fa', label: 'فارسی' },
]);

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('language', lang);
};

watchEffect(() => {
  document.documentElement.dir = locale.value === 'fa' ? 'rtl' : 'ltr';
});
</script>

<template>
  <header class="navbar bg-base-100 shadow-md p-4">
    <div class="flex-1">
      <h1 class="text-xl font-bold">{{ t('company_title') }}</h1>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost" tabindex="0">
          🌍 {{ locale === 'fa' ? 'فارسی' : 'English' }}
        </button>
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
          <li v-for="lang in languages" :key="lang.code">
            <button @click="changeLanguage(lang.code)">
              {{ lang.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
