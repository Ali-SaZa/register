<script setup>
import EmailIcon from './components/icons/EmailIcon.vue';
import PhoneIcon from './components/icons/PhoneIcon.vue';
import KeyIcon from './components/icons/KeyIcon.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from './components/Input.vue';
import { useI18n } from 'vue-i18n';
import Header from './Header.vue';
import { onMounted } from 'vue';

const { t, locale } = useI18n();

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('validation.email').required('validation.required'),
    phone: yup.string().matches(/^09\d{9}$/, 'validation.phone_format').required('validation.required'),
    password: yup.string().required('validation.required'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [phone, phoneAttrs] = defineField('phone');
const [password, passwordAttrs] = defineField('password');

onMounted(() => {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    locale.value = savedLang;
  } else {
    locale.value = 'en';
  }
});

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
});

</script>

<template>
  <Header/>
  <div class="flex justify-center">
    <div class="card w-96 bg-base-100 shadow-xl my-20">
      <div class="card-body">
        <h2 class="font-bold text-xl text-center">{{ t('title') }}</h2>
        <Input v-model="email" v-bind="emailAttrs" :error="errors.email" type="email" :label="t('inputs.email')">
          <template #icon>
            <EmailIcon/>
          </template>
        </Input>
        <Input v-model="phone" v-bind="phoneAttrs" :error="errors.phone" type="tel" :label="t('inputs.phone')">
          <template #icon>
            <PhoneIcon/>
          </template>
        </Input>
        <Input v-model="password" v-bind="passwordAttrs" :error="errors.password" type="password"
               :label="t('inputs.password')">
          <template #icon>
            <KeyIcon/>
          </template>
        </Input>
        <div class="card-actions justify-end">
          <button @click="onSubmit" class="btn btn-primary w-full">
            {{ t('button.register') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>
