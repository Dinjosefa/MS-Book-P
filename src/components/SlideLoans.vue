 <template>
  <div class="slider" @scroll="onScroll">
    <nav
      class="nav-button | previous"
      @click="prevSlide(slide - 1)"
      :style="{ visibility: prev }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
      </svg>
    </nav>
    <div class="content-slider" ref="slider">
      <div
        class="slide | book"
        ref="slide"
        v-for="(book, idx) in books"
        :key="idx"
      >
        <span class="date" v-show="inLending && book.dateFinish != null">Devolución: {{ book.dateFinish }}</span>
        <span class="date" v-show="!inLending && book.dateFinish != null">Fecha: {{ book.dateFinish }}</span>
        <img
          :class="book.dateFinish == null ? 'notFound' : ''"
          :src="book.poster"
          loading="lazy"
          oncontextmenu="return false"
          :alt="book.title"
        />
        <span class="main-span | title">{{ book.title }}</span>
        <span class="main-span">{{ book.author }}</span>
      </div>
    </div>
    <nav
      class="nav-button | next"
      @click="nextSlide(slide + 1)"
      :style="{ visibility: next }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
      </svg>
    </nav>
  </div>
</template>
 
 <script>
export default {
  name: "SlideLoans",
  props: {
    books: {
      type: Object,
      required: false,
    },
    inLending:{
      type:Boolean,
      required:true,
    }
  },
  data() {
    return {
      slider: null,
      slide: 0,
      next: "hidden",
      prev: "hidden",
    };
  },
  methods: {
    onScroll() {
      this.slide = Math.ceil(this.slider.scrollLeft / this.width);
    },
    goToSlide(slide) {
      this.slider.scrollTo({
        left: this.$refs.slide.offsetWidth * slide,
        behavior: "smooth",
      });
      this.slide = slide;
    },
    prevSlide(n) {
      n = n == -1 ? this.books.length - 1 : n;
      this.prev = n >= 1 ? "visible" : "hidden";
      this.next = n >= this.books.length ? "hidden" : "visible";
      this.goToSlide(n);
    },
    nextSlide(n) {
      console.log(n);
      this.prev = n >= 1 ? "visible" : "hidden";
      this.next =
        n >=
        this.books.length -
          Math.round(this.slider.offsetWidth / this.$refs.slide.offsetWidth)
          ? "hidden"
          : "visible";
      this.goToSlide(n);
    },
    navComputed() {
      if (
        this.$refs.slide.offsetWidth * this.books.length >=
        this.slider.offsetWidth
      ) {
        this.next = "visible";
      }
    },
  },
  mounted() {
    this.slider = this.$refs.slider;
    setTimeout(() => {
      this.navComputed();
    }, 1000);
  },
};
</script>
 
 <style scoped>
@media only screen and (max-width: 768px) {
  .nav-button {
    width: 0 !important;
    visibility: hidden !important;
  }
  .slide {
    scroll-snap-align: end !important;
  }
  .not{
  margin-left: 4.4rem;
  }
}
@media only screen and (max-width: 550px) {
  .content-slider {
    min-width: 17rem;
    max-width: 17rem;
  }
  .nav-button {
    width: 0 !important;
    visibility: hidden !important;
  }
  .slider {
    justify-content: center;
  }
}
.slider,
.content-slider {
  position: relative;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  scroll-snap-type: x mandatory;
}
.slider {
  align-items: center;
  width: 100%;
}
.content-slider::-webkit-scrollbar {
  display: none;
}
.content-slider {
  overflow: scroll;
}
.slide {
  scroll-snap-align: center;
}
.book {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  scroll-snap-align: center;
}
.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.144);
  padding: 0.2vw;
  border-radius: 50%;
  cursor: pointer;
}
.nav-button svg {
  width: 3rem;
  height: 3rem;
  fill: var(--color-dark);
}
img {
  height: 26em;
  width: 17em;
  border-radius: var(--radius);
}
.main-span {
  font-weight: 500;
}
.title {
  font-size: 13pt;
}
.notFound{
  border: .1rem solid var(--color-dark);
}
</style>