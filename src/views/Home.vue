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
          <div class="animation" v-show="anim">
            <div class="bookImg">
              <svg class="land" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 51">
                <g>
                  <path
                    class="st0"
                    d="M64.4,3.5c1.6,0,2.9,1.2,2.9,2.7v38.6c0,1.5-1.3,2.7-2.9,2.7H6.6c-1.6,0-2.9-1.2-2.9-2.7V6.2   c0-1.5,1.3-2.7,2.9-2.7C6.6,3.5,64.4,3.5,64.4,3.5z"
                  />
                  <path
                    class="st1"
                    d="M64.4,48.5H6.6c-2.2,0-4-1.7-4-3.7V6.2c0-2,1.8-3.7,4-3.7h57.8c2.2,0,4,1.7,4,3.7v38.6   C68.4,46.8,66.6,48.5,64.4,48.5z M6.6,4.5c-1.1,0-1.8,0.7-1.8,1.7v38.6c0,1,0.8,1.7,1.8,1.7h57.8c1.1,0,1.8-0.7,1.8-1.7V6.2   c0-1-0.8-1.7-1.8-1.7H6.6z"
                  />
                </g>
                <path
                  class="st1"
                  d="M61.8,14.5h-18c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S62.3,14.5,61.8,14.5z"
                />
                <g>
                  <path
                    class="st1"
                    d="M57.3,41.9H43.7V21.1h12.8c1,0,1.9,0.3,2.7,1c1.7,1.6,2.5,3.3,2.4,5.1c-0.1,1.9-1.2,3.4-2.1,4.3   c2.4,2.2,3,4.9,1.7,7.9C60.5,40.9,59,41.9,57.3,41.9z M45.7,39.9h11.7c0.9,0,1.6-0.5,2-1.3c1.1-2.5,0.4-4.6-2-6.3l-1.1-0.8l1.1-0.8   c0,0,2.1-1.6,2.2-3.6c0.1-1.2-0.5-2.3-1.7-3.4c-0.4-0.3-0.9-0.5-1.4-0.5H45.7V39.9z"
                  />
                </g>
                <g>
                  <path
                    class="st1"
                    d="M47,31.3c1-0.3,2-0.4,2.9-0.5c1-0.1,2-0.3,2.9-0.4c2-0.3,3.9-0.4,5.9-0.3v2.5c-2,0-3.9-0.1-5.9-0.3   c-1-0.1-2-0.3-2.9-0.4c-1-0.1-2-0.3-2.9-0.5C47,31.5,47,31.3,47,31.3z"
                  />
                </g>
                <path
                  class="st1"
                  d="M50,24.2c0.8,1.2,1.1,2.4,1.4,3.6s0.4,2.4,0.4,3.6s-0.1,2.4-0.4,3.6c-0.3,1.2-0.7,2.4-1.4,3.6h-0.2  c-0.1-2.4-0.1-4.8-0.1-7.2s0-4.8,0.1-7.2C49.8,24.2,50,24.2,50,24.2z"
                />
                <path
                  class="st1"
                  d="M28.5,14.5h-18c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S29.1,14.5,28.5,14.5z"
                />
                <path
                  class="st1"
                  d="M28.5,23.5h-18c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S29.1,23.5,28.5,23.5z"
                />
                <path
                  class="st1"
                  d="M28.5,32.5h-18c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1C29.5,32.1,29.1,32.5,28.5,32.5z"
                />
                <path
                  class="st1"
                  d="M28.5,41.5h-18c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S29.1,41.5,28.5,41.5z"
                />
              </svg>
              <div class="page" v-for="(item, index) in pages" :key="index">
                <svg
                  class="front"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 52"
                  :style="{
                    animationDelay: `1.${index}s`,
                    zIndex: pages - index,
                  }"
                >
                  <g>
                    <path
                      class="st0"
                      d="M3.5,48h26.3c1.5,0,2.7-1.2,2.7-2.7V6.7c0-1.5-1.2-2.7-2.7-2.7H3.5"
                    />
                    <path
                      class="st1"
                      d="M29.8,49H3.5c-0.6,0-1-0.4-1-1s0.4-1,1-1h26.3c1,0,1.7-0.7,1.7-1.7V6.7c0-1-0.7-1.7-1.7-1.7H3.5   c-0.6,0-1-0.4-1-1s0.4-1,1-1h26.3c2,0,3.7,1.7,3.7,3.7v38.6C33.5,47.3,31.8,49,29.8,49z"
                    />
                  </g>
                  <path
                    class="st1"
                    d="M26,15H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S26.6,15,26,15z"
                  />
                  <g>
                    <path
                      class="st1"
                      d="M21.6,42.4H7.9V21.6h12.8c1,0,1.9,0.3,2.7,1c1.7,1.6,2.5,3.3,2.4,5.1c-0.1,1.9-1.2,3.4-2.1,4.3   c2.4,2.2,3,4.9,1.7,7.9C24.8,41.4,23.3,42.4,21.6,42.4z M9.9,40.4h11.7c0.9,0,1.6-0.5,2-1.3c1.1-2.5,0.4-4.6-2-6.3L20.5,32l1.1-0.8   c0,0,2.1-1.6,2.2-3.6c0.1-1.2-0.5-2.3-1.7-3.4c-0.4-0.3-0.9-0.5-1.4-0.5H9.9V40.4z"
                    />
                  </g>
                  <g>
                    <path
                      class="st1"
                      d="M11.2,31.8c1-0.3,2-0.4,2.9-0.5c1-0.1,2-0.3,2.9-0.4c2-0.3,3.9-0.4,5.9-0.3v2.5c-2,0-3.9-0.1-5.9-0.3   c-1-0.1-2-0.3-2.9-0.4c-1-0.1-2-0.3-2.9-0.5C11.2,32,11.2,31.8,11.2,31.8z"
                    />
                  </g>
                  <g>
                    <path
                      class="st1"
                      d="M14.2,24.7c0.8,1.2,1.1,2.4,1.4,3.6s0.4,2.4,0.4,3.6s-0.1,2.4-0.4,3.6s-0.7,2.4-1.4,3.6H14   c-0.1-2.4-0.1-4.8-0.1-7.2s0-4.8,0.1-7.2C14,24.7,14.2,24.7,14.2,24.7z"
                    />
                  </g>
                </svg>
                <svg
                  class="back"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 52"
                  :style="{ animationDelay: `1.${index}s` }"
                >
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        class="st0"
                        d="M3.5,4l26.3,0c1.5,0,2.7,1.2,2.7,2.7v38.6c0,1.5-1.2,2.7-2.7,2.7H3.5"
                      />
                      <path
                        class="st1"
                        d="M2.5,48c0-0.6,0.4-1,1-1h26.3c1,0,1.7-0.7,1.7-1.7V6.7c0-1-0.7-1.7-1.7-1.7H3.5c-0.6,0-1-0.4-1-1s0.4-1,1-1    l26.3,0c2,0,3.7,1.7,3.7,3.7v38.6c0,2-1.7,3.7-3.7,3.7H3.5C2.9,49,2.5,48.6,2.5,48z"
                      />
                    </g>
                    <g>
                      <line class="st2" x1="7.5" y1="14" x2="25.5" y2="14" />
                      <path
                        class="st1"
                        d="M6.5,14c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1s-0.4,1-1,1h-18C6.9,15,6.5,14.6,6.5,14z"
                      />
                    </g>
                    <g>
                      <line class="st2" x1="7.5" y1="23" x2="25.5" y2="23" />
                      <path
                        class="st1"
                        d="M6.5,23c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1s-0.4,1-1,1h-18C6.9,24,6.5,23.6,6.5,23z"
                      />
                    </g>
                    <g>
                      <line class="st2" x1="7.5" y1="32" x2="25.5" y2="32" />
                      <path
                        class="st1"
                        d="M6.5,32c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1h-18C6.9,33,6.5,32.6,6.5,32z"
                      />
                    </g>
                    <g>
                      <line class="st2" x1="7.5" y1="41" x2="25.5" y2="41" />
                      <path
                        class="st1"
                        d="M6.5,41c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1s-0.4,1-1,1h-18C6.9,42,6.5,41.6,6.5,41z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
      <button
        v-show="!anim"
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
    <nav class="pagination" v-show="onePage && !anim">
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
      anim: true,
      pages: 3,
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
      this.anim = false;
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
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
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
  .phrases{
    display:none !important;
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
  height: 3rem;
  width: 30vw;
  min-width: 19rem;
  justify-content: space-between;
  overflow: hidden;
  border: 0.2rem solid var(--border-input);
}
.browser {
  font-size: 1.3rem;
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
.animation {
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
.bookImg {
  position: relative;
}
.land {
  width: 12.5rem !important;
  /* height: 6em; */
  margin: 0 auto;
}
.front, .back{
  width: 6.5rem !important;
  position: absolute;
  left: 2, 125rem;
  top: 0rem;
  margin: 0 auto;
  height: 9rem;
  transform-origin: 0% 50%;
}
.front {
  animation: animfront 1s infinite linear;
}
.back {
  animation: animback 1s infinite linear;
}
.st0 {
  fill: var(--bc-book);
}
.st1 {
  fill: var(--color-clear);
}
@keyframes animfront {
  0% {
    transform: perspective(600px) rotateY(-0deg);
    opacity: 1;
  }
  29% {
    opacity: 1;
  }
  30% {
    transform: perspective(200px) rotateY(-90deg);
    opacity: 0;
  }
  60% {
    transform: perspective(200px) rotateY(-180deg);
    opacity: 0;
  }
  100% {
    transform: perspective(180px) rotateY(-179deg);
    opacity: 0;
  }
}
@keyframes animback {
  0% {
    transform: perspective(600px) rotateY(-0deg);
    opacity: 0;
  }
  24% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  30% {
    transform: perspective(200px) rotateY(-90deg);
    opacity: 1;
  }
  60% {
    transform: perspective(200px) rotateY(-180deg);
    opacity: 1;
  }
  100% {
    transform: perspective(200px) rotateY(-180deg);
    opacity: 0;
  }
}
</style>