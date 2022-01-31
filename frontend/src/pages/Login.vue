<template>
  <div class="login-form">
    <Card>
      <template #title> Войти </template>
      <template #content>
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
        <div class="login-form__footer">
          <Button
            icon="pi pi-sign-in"
            @click.prevent="handleSubmit(!v$.$invalid)"
            label="Войти"
          />
          <router-link to="/register">Регистрация</router-link>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup: () => ({
    v$: useVuelidate()
  }), 
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  validations() {
    return {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  data() {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      init: 'auth/init'
    }),
    handleSubmit(isFormValid) {
      var self = this
      self.submitted = true
      if (!isFormValid) {
        return false
      }
      self
        .login({
          email: self.email,
          password: self.password
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
.login-form {
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
