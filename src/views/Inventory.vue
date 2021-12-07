<template>
  <div class="inventory">
    <div class="head-content">
      <h1>Inventario</h1>
      <span>*no es posible editar los atributos desde este apartado</span>
    </div>
    <div class="table-inventory">
      <Table :books="dataInPage" />
    </div>
    <nav class="pagination">
      <router-link
        class="page-item | previuos"
        :to="{
          name: 'Inventory',
          params: { id: actualPage == 1 ? 1 : actualPage - 1 },
        }"
        :class="isActive(actualPage - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
        </svg>
      </router-link>
      <router-link
        v-for="(page, index) in totalPages()"
        :key="index"
        class="page-item"
        :to="{ name: 'Inventory', params: { id: page } }"
        :class="isActive(page)"
      >
        <span class="page-container">
          {{ page }}
        </span>
      </router-link>
      <router-link
        class="page-item | next"
        :to="{
          name: 'Inventory',
          params: { id: actualPage == pages ? actualPage : actualPage + 1 },
        }"
        :class="isActive(actualPage + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </router-link>
    </nav>
    <Confirmation
      :msg="modalDelete.message"
      :animation="modalDelete.animation"
      :successMsg="modalDelete.successMsg"
      :errorMsg="modalDelete.errorMsg"
      :finish="modalDelete.finish"
      :error="modalDelete.error"
      v-show="modalDelete.visible"
      @accept="deleteBook"
      @close="modalDelete.visible = false"
    />
  </div>
</template>

<script>
import Confirmation from "@/components/Confirmation.vue";
import Table from "@/components/Table.vue";
import gql from "graphql-tag";

export default {
  name: "Inventory",
  components: {
    Table,
    Confirmation,
  },
  data() {
    return {
      books: [],
      elementsPerPage: 13,
      dataInPage: [],
      actualPage: 1,
      pages: null,
      modalDelete: {
        visible: false,
        message: "¿Eliminar Registro?",
        animation: false,
        successMsg: "¡Registro Eliminado!",
        errorMsg: "¡Algo Fallo!",
        finish: false,
        error: false,
      },
    };
  },
  apollo: {
    InventoriesDetail: {
      query: gql`
        query InventoriesDetail {
          inventoriesDetail {
            id
            title
            author
            year
            category
            editorial
            poster
          }
        }
      `,
      update: (data) => data.inventoriesDetail,
      result() {
        this.getData();
      },
    },
  },
  methods: {
    totalPages() {
      return Math.ceil(this.books.length / this.elementsPerPage);
    },
    async getData() {
      this.books = this.InventoriesDetail;
      this.pages = Math.ceil(this.books.length / this.elementsPerPage);
      if (this.actualPage > this.pages) {
        this.$router.push({
          name: "NotFound",
          params: { catchAll: "NotFound" },
        });
      }
      this.getDataPage(this.actualPage);
    },
    getDataPage(numPage) {
      if (numPage > 0 && numPage <= this.pages) {
        this.actualPage = numPage;
        let start = numPage * this.elementsPerPage - this.elementsPerPage;
        let end = numPage * this.elementsPerPage;
        this.dataInPage = this.books.slice(start, end);
      }
      window.scrollTo(0, 0);
    },
    isActive(numPage) {
      return numPage == this.actualPage ? "active" : "";
    },
    deleteBook() {},
  },
  mounted() {
    this.actualPage = parseInt(this.$route.params.id);
  },
  beforeUpdate() {
    this.actualPage = parseInt(this.$route.params.id);
    this.getData();
  },
};
</script>

<style scoped>
.inventory {
  display: flex;
  flex-direction: column;
  margin: 0 10vw;
  gap: 1rem;
}
.head-content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.table-inventory {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  min-height: 55vh;
  align-items: flex-start;
}
span {
  text-align: initial;
}
.pagination {
  bottom: 1;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.page-item {
  display: flex;
  background-color: var(--bc-book);
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  color: var(--color-clear);
  border-right: 0.1rem solid var(--color-clear);
}
.page-item:hover {
  background-color: var(--color-dark);
}
.active {
  background-color: var(--color-dark) !important;
}
svg {
  width: 2rem;
  fill: var(--color-clear);
}
.previuos {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
.next {
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
a {
  text-decoration: none;
}
</style>