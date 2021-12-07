<template>
  <div class="loans">
    <div class="head-content">
      <h1>Seguimiento de Prestamos</h1>
    </div>
    <div class="table-loans">
      <TableLending :loans="dataInPage" />
    </div>
    <nav class="pagination">
      <router-link
        class="page-item | previuos"
        :to="{
          name: 'InLending',
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
        :to="{ name: 'InLending', params: { id: page } }"
        :class="isActive(page)"
      >
        <span class="page-container">
          {{ page }}
        </span>
      </router-link>
      <router-link
        class="page-item | next"
        :to="{
          name: 'InLending',
          params: { id: actualPage == pages ? actualPage : actualPage + 1 },
        }"
        :class="isActive(actualPage + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </router-link>
    </nav>
  </div>
</template>

<script>
import TableLending from "@/components/TableLending.vue";
import gql from "graphql-tag";

import "@/loans.js";
import "@/data.js";
import "@/users.js";
import moment from "moment";

export default {
  name: "InLending",
  components: {
    TableLending,
  },
  data() {
    return {
      loans: [],
      filterLoans: [],
      loansF: [],
      dataInPage: [],
      users: [],
      books: [],
      elementsPerPage: 13,
      actualPage: 1,
      pages: null,
    };
  },
  apollo: {
    LoansDetail: {
      query: gql`
        query LoansDetail {
          loansDetail {
            id
            idUser
            idBook
            dateStart
            dateFinish
          }
        }
      `,
      update: (data) => data.loasnDetail,
      result() {
        this.getData();
      },
    },
    InventoriesDetail: {
      query: gql`
        query InventoriesDetail {
          inventoriesDetail {
            title
          }
        }
      `,
      update: (data) => data.inventoriesDetail,
    },
  },
  methods: {
    totalPages() {
      return Math.ceil(this.loansF.length / this.elementsPerPage);
    },
    async getData() {
      // !HACER LA PETICIÓN DE LOS PRESTAMOS
      this.books = registers;
      this.users = usersData;
      this.loans = this.LoansDetail;
      let theDate = new Date().toLocaleString("es-CO");
      this.filterLoans = this.loans.filter(
        (loan) => loan.dateFinish <= theDate
      );
      this.loansF = [];
      for (const key in this.filterLoans) {
        const element = this.filterLoans[key];
        let loan = {
          id: element.id,
          idUser: element.idUser,
          user: `${
            this.users.find((user) => user.id == element.idUser).firstname
          } ${this.users.find((user) => user.id == element.idUser).lastname}`,
          idBook: element.idBook,
          title: this.books
            .find((book) => book.id == element.idBook)
            .title.toString(),
          status: this.books.find((book) => book.id == element.idBook).status,
          dateStart: element.dateStart,
          dateFinish: element.dateFinish,
        };
        this.loansF.push(loan);
      }
      moment.locale("es-CO");
      this.loansF = this.loansF
        .sort(
          (a, b) =>
            moment(a.dateFinish, "DD/MM/YYYY").unix() -
            moment(b.dateFinish, "DD/MM/YYYY").unix()
        )
        .reverse();
      this.pages = this.totalPages();
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
        this.dataInPage = this.loansF.slice(start, end);
      }
      window.scrollTo(0, 0);
    },
    isActive(numPage) {
      return numPage == this.actualPage ? "active" : "";
    },
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
.loans {
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
.table-loans {
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