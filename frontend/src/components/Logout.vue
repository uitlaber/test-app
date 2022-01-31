<template>
  <Button
    v-if="authenticated"
    label="Выход"
    @click.prevent="handleClick"
    class="p-button-help"
  />
</template>
<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "Logout",
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    handleClick() {
      this.logout().then(() => {
        this.$router.push("/login");
      });
    },
  },
});
</script>