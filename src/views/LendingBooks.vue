<template>
  <div class="lending">
    <div class="in-lending">
      <h1>En Prestamo</h1>
      <SlideLoans
        class="slide_loans"
        :books="booksInLending"
        :inLending="true"
      />
    </div>
    <div class="history">
      <h1>Historial de Prestamos</h1>
      <SlideLoans
        class="slide_loans"
        :books="booksHistory"
        :inLending="false"
      />
    </div>
  </div>
</template>

<script>
import SlideLoans from "@/components/SlideLoans.vue";
import gql from "graphql-tag";
import moment from "moment";

export default {
  name: "LendingBooks",
  components: {
    SlideLoans,
  },
  data() {
    return {
      id: null,
      booksUser: [],
      booksInLending: [],
      booksHistory: [],
      loansLoad: false,
      booksLoad: false,
      InventoriesDetail:null,
      LoansByUserId:null,
    };
  },
  apollo: {
    LoansByUserId: {
      query: gql`
        query LoansDetailById($userId: String!) {
          loansDetailById(userId: $userId) {
            id
            idUser
            idBook
            dateStart
            dateFinish
          }
        }
      `,
      variables() {
        return {
          userId: "1",
        };
      },
      update: (data) => data.loansDetailById,
      result() {
        this.loansLoad = true;
        this.getData();
      },
    },
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
        this.booksLoad = true;
        this.getData();
      },
    },
  },
  methods: {
    getData() {
      if (this.booksLoad && this.loansLoad) {
        let books = this.InventoriesDetail;
        let loans = this.LoansByUserId;
        for (const key in loans) {
          const element = loans[key];
          console.log(element);
          let book = {
            title: books.find((book) => book.id == element.idBook).title,
            author: books.find((book) => book.id == element.idBook).author,
            poster: books.find((book) => book.id == element.idBook).poster,
            dateFinish: element.dateFinish,
          };
          this.booksUser.push(book);
        }
      for (const key in this.booksUser) {
        const element = this.booksUser[key];
        moment.locale("es-CO");
        let dateFinish = moment(element.dateFinish, "DD/MM/YYYY");
        let datePast = moment(
          moment().subtract(20, "days").calendar(),
          "DD/MM/YYYY"
        );
        if (dateFinish < datePast) {
          this.booksHistory.push(element);
        } else {
          this.booksInLending.push(element);
        }
      }
      let bookNothing = [
        {
          title: "No Tienes Libros",
          author: null,
          poster:
            "https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d",
          dateFinish: null,
        },
      ];
      this.booksInLending =
        this.booksInLending.length == 0 ? bookNothing : this.booksInLending;
      this.booksHistory =
        this.booksHistory.length == 0 ? bookNothing : this.booksHistory;
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  h1 {
    text-align: initial;
    padding-left: 4.3rem;
  }
  .lending {
    margin: 0 6vw;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  h1 {
    text-align: center;
  }
  .lending {
    margin: 0 6vw;
  }
}
@media only screen and (max-width: 768px) {
  h1 {
    text-align: center;
  }
  .lending {
    margin: 0 14vw;
  }
}
@media only screen and (max-width: 550px) {
  h1 {
    text-align: center;
  }
}
.lending {
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  align-items: center;
}
.in-lending,
.history {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
h1 {
  width: 100%;
}
</style>