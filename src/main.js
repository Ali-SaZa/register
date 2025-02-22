import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import en from './locals/en.json';
import fa from './locals/fa.json';

const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages: {
    en,
    fa,
  },
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
