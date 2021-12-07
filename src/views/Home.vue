<template>
  <div class="home">
    <div class="phrases">
      <Carousel
        :navigation="true"
        :pagination="true"
        :startAutoPlay="true"
        :timeout="12000"
        class="carousel"
        v-slot="{ currentSlide }"
      >
        <Slide v-for="(slide, index) in carouselSlides" :key="index">
          <div v-show="currentSlide === index + 1" class="slide-info">
            <img :src="require(`@/assets/slides/${slide}.svg`)" />
          </div>
        </Slide>
      </Carousel>
    </div>
    <div class="container-search">
      <div class="search">
        <input
          id="search-browser"
          class="browser"
          type="text"
          name="browser"
          placeholder="Buscar"
          v-model="filter"
          @keyup="filterBook"
        />
        <button id="search" @click="filterBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path
              d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="books">
      <div v-if="isVoid" class="nothing">
        <img
          class="tumble"
          :src="require('@/icons/tumbleweed.svg')"
          alt=""
          srcset=""
        />
        Upps! No tenemos ese libro
      </div>
      <button
        class="book"
        v-for="(book, idx) in dataInPage"
        :key="idx"
        @click="open(book.id, book.title)"
        @blur="clean"
      >
        <div class="information">
          <span class="main-span">{{ book.title }}</span>
          <span class="main-span">{{ book.author }}</span>
          <span>Editorial {{ book.editorial }}</span>
          <span>Genero: {{ book.category }}</span>
          <!-- <span>{{}}</span> -->
        </div>
        <img
          class="poster"
          :src="book.poster"
          loading="lazy"
          oncontextmenu="return false"
          :alt="book.title"
          onerror="this.onerror=null; this.src='https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d'"
        />
        <div class="icons">
          <svg
            @click="open(book.id, null)"
            class="edit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            @mouseenter="this.hover = true"
            @mouseleave="this.hover = false"
          >
            <path
              v-if="isAdmin"
              xmlns="http://www.w3.org/2000/svg"
              d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
            />
            <path
              v-if="isAdmin && hover"
              xmlns="http://www.w3.org/2000/svg"
              d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
            <path v-else />
          </svg>
          <span class="year">{{ book.year }}</span>
        </div>
      </button>
    </div>
    <nav class="pagination" v-show="onePage">
      <button
        class="page-item | previuos"
        @click="getDataPage(actualPage - 1)"
        :class="isActive(actualPage - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
        </svg>
      </button>
      <button
        v-for="(page, index) in totalPages"
        :key="index"
        class="page-item"
        @click="getDataPage(page)"
        :class="isActive(page)"
      >
        <span class="page-container">
          {{ page }}
        </span>
      </button>
      <button
        class="page-item | next"
        @click="getDataPage(actualPage + 1)"
        :class="isActive(actualPage + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import gql from "graphql-tag";

export default {
  name: "Home",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      isAdmin: false,
      filterBooks: [],
      dataInPage: [],
      elementsPerPage: 25,
      actualPage: 1,
      totalPages: 0,
      onePage: true,
      hover: false,
      focus: true,
      clickControl: false,
      idFocus: null,
      isVoid: false,
      border: null,
      filter: "",
      carouselSlides: ["S01", "S02"],
      InventoriesDetail: {
        inventoriesDetail: {
          id: "",
          title: "",
          author: "",
          year: "",
          category: "",
          editorial: "",
          poster: "",
        },
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
      error() {
        this.$router.push({ name: "Home" });
      },
    },
  },
  methods: {
    getData() {
      this.books = JSON.parse(JSON.stringify(this.InventoriesDetail));
      
      this.books = this.books.reverse();
      
      this.filterBook();
    },
    filterBook() {
      let value = this.filter;
      this.filterBooks = this.books.filter((book) =>
        book.title.toLowerCase().startsWith(value.toLowerCase())
      );
      this.totalPages = Math.ceil(
        this.filterBooks.length / this.elementsPerPage
      );
      this.onePage = this.totalPages == 1 ? false : true;
      if (!this.onePage) {
        this.actualPage = 1;
      }
      this.isVoid = this.filterBooks.length == 0 ? true : false;
      if (!this.isVoid) {
        this.getDataPage(this.actualPage);
      } else {
        this.dataInPage = [];
        this.onePage = false;
      }
    },
    getDataPage(numPage) {
      let Pages = this.totalPages;
      if (numPage > 0 && numPage <= Pages) {
        this.actualPage = numPage;
        let start = numPage * this.elementsPerPage - this.elementsPerPage;
        let end = numPage * this.elementsPerPage;
        this.dataInPage = this.filterBooks.slice(start, end);
      }
      if (numPage == this.actualPage) {
        window.scrollTo(0, 0);
      }
    },
    isActive(numPage) {
      return numPage == this.actualPage ? "active" : "";
    },
    openBook(id, title) {
      if (navigator.userAgent.indexOf("Mobile") != -1) {
        if (this.focus && this.idFocus == id) {
          this.$router.push({
            name: "OpenBook",
            params: { id: id, title: title },
          });
          window.scrollTo(0, 0);
        } else {
          this.idFocus = id;
          this.focus = true;
        }
      } else {
        this.$router.push({
          name: "OpenBook",
          params: { id: id, title: title },
        });
        window.scrollTo(0, 0);
      }
    },
    openEdit(id) {
      this.$router.push({ name: "UpdateBook", params: { id: id } });
      window.scrollTo(0, 0);
    },
    open(id, title) {
      if (title == null) {
        this.openEdit(id);
        this.clickControl = true;
      } else if (!this.clickControl) {
        this.openBook(id, title);
      } else {
        this.clickControl = false;
      }
    },
    clean() {
      this.idFocus = 0;
      this.focus = false;
    },
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    // this.$apollo.
  },
};
</script>

<style scoped>
@media only screen and (min-width: 600px) and (max-width: 2000px) {
  .tumble {
    font-size: 15pt;
  }
}
@media only screen and (max-width: 600px) {
  span,
  .carousel img,
  .main-span,
  .poster,
  .book,
  .information,
  .icons,
  .icons svg {
    font-size: 13pt;
  }
}
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.container-search {
  display: flex;
  justify-content: center;
}
.search {
  position: relative;
  display: flex;
  border: none;
  border-radius: 2rem;
  color: var(--bg);
  background-color: #ffffff;
  height: 2.5rem;
  width: 30vw;
  min-width: 19rem;
  justify-content: space-between;
  overflow: hidden;
  border: 0.1rem solid var(--border-input);
}
.browser {
  font-size: 1rem;
  color: var();
  background-image: none;
  box-shadow: none;
  outline: 0;
  width: 100%;
  text-align: initial;
  padding-left: 1rem;
  height: 100%;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.browser::-webkit-input-placeholder {
  color: var(--border-input);
  opacity: 80%;
}
.search svg {
  fill: var(--border-input);
  transition: all 1s ease;
}
.search svg:hover {
  animation-name: iconmove;
  animation-duration: 1s;
}
.search button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
}
/* .phrases{
  margin: 0 11vw;

} */

.carousel {
  position: relative;
  height: 27vw;
  margin: 0 10vw;
}
.carousel img {
  width: 70vw;
  border-radius: 1rem;
}
.slide-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
  background-color: var(--bg-banner);
  border-radius: var(--radius);
}
.books {
  gap: 1rem;
  margin: 0 3vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 70vh;
}
.nothing {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
.tumble {
  width: 5em;
  animation: tumble 10s infinite linear;
}
span {
  font-size: 0.8em;
}
.main-span {
  font-size: 1.1em;
  text-align: initial;
}
.poster {
  height: 26em;
  width: 17em;
}
.book {
  height: 26em;
  width: 17em;
}
.book {
  border: 0.2em solid transparent;
  border-radius: 1em;
  cursor: pointer;
  position: relative;
  overflow: hidden !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  text-overflow: ellipsis !important;
  transition: all 1s ease;
  display: flex;
  justify-content: center;
}
.book:hover {
  background-color: var(--bc-book);
  border-color: var(--bc-book);
}
.book:hover > .information {
  transform: translate3d(0, 1rem, 0);
}
.book:hover > .icons {
  transform: translate3d(0, 22.5em, 0);
}
.book:hover > .poster {
  filter: blur(0.2em) brightness(0.7);
  transform: scale(110%);
}
.information {
  align-items: flex-start;
  color: var(--color-clear);
  display: flex;
  flex-direction: column;
  grid-gap: 0.7em;
  position: absolute;
  transform: translate3d(0, -17rem, 0);
  transition: all 0.5s ease;
  z-index: 1;
  min-width: 14em;
  max-width: 14em;
}
.poster {
  transition: all 0.5s ease-out;
}
.icons {
  position: absolute;
  display: flex;
  width: 14em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transform: translate3d(22em, 22.5em, 0);
  transition: all 0.5s ease;
}
.icons svg {
  fill: var(--color-clear);
  width: 2em;
  height: 2em;
}
.year {
  padding: 0.7em 0.7em;
  background-color: var(--bc-book);
  border-radius: 5em;
  color: var(--color-clear);
}
.edit:hover {
  filter: drop-shadow(0 0 1rem var(--bc-book));
}
.pagination {
  bottom: 1;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* gap:.1rem; */
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
</style>