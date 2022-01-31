<template>
  <div class="shorter-history" v-if="authenticated" >
    <DataTable :value="links">
      <Column field="id" header="ID"></Column>
      <Column header="URL" class="column-url">
      <template #body="{ data }">
          <span v-text="data.url" :title="data.url"></span>
      </template>
      </Column>
      <Column header="Сокращенная ссылка">
        <template #body="{ data }">
          <a :href="data.short" v-text="data.short"></a>
        </template>
      </Column>
      <Column header="Удалить">
        <template #body="{ data }">
          <Button
            icon="pi pi-copy"
            class="mr-1 p-button-success"
            @click.prevent="copy(data.short)"
          />
          <Button
            icon="pi pi-trasch"
            @click="deleteItem(data.id)"
            :disabled="clicked.includes(data.id)"
            label="Удалить"
            class="p-button-danger"
          />
        </template>
      </Column>
      <template #empty> Нет ссылок </template>
    </DataTable>
  </div>
  <Toast />
</template>
<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "History",
  data() {
    return {
      clicked: [],
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      links: "links/links",
    }),
  },
  methods: {
    ...mapActions({
      deleteLink: "links/deleteLink",
    }),
    deleteItem(id) {
      this.clicked.push(id);
      this.deleteLink(id);
    },
    copy(text) {
      var self = this;
      this.$copyText(text).then(
        function () {
          self.$toast.add({
            severity: "success",
            summary: "Успешно",
            detail: "Ссылка скопирована в буфер обмена",
            life: 3000,
          });
        },
        function () {
          self.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Не удалось скопировать ссылку",
            life: 3000,
          });
        }
      );
    },
  },
});
</script>

<style lang="scss"  >
.shorter-history {
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}
.column-url{
  span{
    display: block;
    overflow: hidden;
    max-width: 400px;
  }
}

.p-column-title{
  margin-right: 1rem;
}

.mr-1 {
  margin-right: 1rem;
}
</style>
