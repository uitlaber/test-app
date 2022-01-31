<template>
  <div class="shorter">
    <h1>Введите URL для сокращения</h1>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-link"></i>
      </span>
      <InputText
        v-model="v$.url.$model"
        placeholder="Ваш URL"
        :class="{ 'p-invalid': v$.url.$invalid && submitted }"
      />
      <Button
        label="Сократить URL"
        @click.prevent="handleSubmit(!v$.$invalid)"
        :disabled="submitted"
      />
    </div>
  </div>
  <Toast />
</template>
<script>
import { defineComponent } from "vue";
import { required, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions } from "vuex";

export default defineComponent({
  name: "Shorter",
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations() {
    return {
      url: {
        required,
        url,
      },
    };
  },
  data() {
    return {
      url: "",
      submitted: false,
    };
  },
  methods: {
    ...mapActions({
      create: "links/createShortLink",
    }),
    handleSubmit(isFormValid) {
      var self = this;
      self.submitted = true;
      if (!isFormValid) {
        this.submitted = false;
        return false;
      }
      self
        .create({ url: self.url })
        .then((data) => {
          if (!data.success) {
            let messageKeys = Object.keys(data.response.message);
            if (typeof data.response.message === "object") {
              for (let i = 0; i < messageKeys.length; i++) {
                self.$toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: data.response.message[messageKeys[i]].join(". "),
                  life: 3000,
                });
              }
            }
          }
          self.clearForm();
        })
        .catch((err) => {
          self.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: err.message,
            life: 3000,
          });
          self.clearForm();
        });
    },

    clearForm() {
      this.url = "";
      this.submitted = false;
    },
  },
});
</script>

<style lang="scss"  scoped>
.shorter {
  width: 100%;
  margin: 0 auto 1rem;
}
</style>
