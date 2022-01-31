<template>
  <div class="register-form">
    <Card>
      <template #title> Регистрация </template>
      <template #content>
        <div class="p-inputgroup mb-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            placeholder="Имя"
            v-model="v$.name.$model"
            :class="{ 'p-invalid': v$.name.$invalid && submitted }"
          />
        </div>

        <div class="p-inputgroup mb-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            placeholder="Email"
            v-model="v$.email.$model"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }"
          />
        </div>

        <div class="p-inputgroup mb-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <InputText
           type="password"
            placeholder="Пароль"
            v-model="v$.password.$model"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
          />
        </div>

        <div class="p-inputgroup mb-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <InputText
           type="password"
            placeholder="Потвердите пароль"
            v-model="v$.password_confirmation.$model"
            :class="{ 'p-invalid': v$.password_confirmation.$invalid && submitted }"
          />
        </div>
        <div class="register-form__footer">
          <Button
            icon="pi pi-sign-in"
            @click.prevent="handleSubmit(!v$.$invalid)"
            label="Регистрация"
          />
          <router-link to="/login">Войти</router-link>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { email, required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Register',
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      },
      password_confirmation: {
        required,
        sameAs: sameAs(this.password)
      }
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      submitted: false
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    handleSubmit(isFormValid) {
      var self = this
      self.submitted = true
      if (!isFormValid) {
        return false
      }
      self
        .register({
          name: self.name,
          email: self.email,
          password: self.password,
          password_confirmation: self.password_confirmation
        })
        .then((data) => {
          if (data.success) {
            self.$router.push('/')
          } else {
            let messageKeys = Object.keys(data.response.message)
            if (typeof data.response.message === 'object') {
              for (let i = 0; i < messageKeys.length; i++) {
                self.$toast.add({
                  severity: 'error',
                  summary: 'Error Message',
                  detail: data.response.message[messageKeys[i]].join('. '),
                  life: 3000
                })
              }
            }
          }
        }).catch((err) => {
          self.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: err.message,
            life: 3000,
          });
        })
    }
  }
})
</script>

<style lang="scss">
.register-form {
  height: 100vh;
  display: flex;
  align-items: center;
  .p-card {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.mb-1 {
  margin-bottom: 1rem;
}
</style>
