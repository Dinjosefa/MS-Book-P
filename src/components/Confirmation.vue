<template>
  <div class="modal">
    <div class="box">
      <div class="animation" v-show="animation">
        <div class="book">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 51">
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
              :style="{ animationDelay: `1.${index}s`, zIndex: pages - index }"
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
        <h2>Loading</h2>
      </div>
      <div class="content" v-show="!animation && !finish">
        <h1>{{ msg }}</h1>
        <div class="buttons">
          <button class="sub-button" @click="eventCancel">Cancelar</button>
          <button class="main-button" @click="eventAccept">Aceptar</button>
        </div>
      </div>
      <div v-show="finish" class="finish">
        <h1 v-show="!error">{{ successMsg }}</h1>
        <h1 v-show="error">{{ errorMsg }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirmation",
  props: ["msg", "animation", "successMsg", "errorMsg", "finish", "error"],
  data() {
    return {
      pages: 3,
    };
  },
  methods: {
    eventAccept() {
      this.$emit("accept");
    },
    eventCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* @media only screen and (min-width: 750px) and (max-width: 2000px) {
  .book{
    font-size: 11pt;
  }
  h2{
  font-size: 13pt;
  }
} */
@media only screen and (min-width: 10px) and (max-width: 750px) {
  .book{
    font-size: 11pt;
  }
  h1{
  font-size: 17pt;
  }
  h2{
  font-size: 13pt;
  }
}

.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 345;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
}
.box {
  background-color: var(--color-dark);
  padding:3em 4em ;
  border-radius: var(--radius);
}
.content {
  flex-direction: column;
  gap: 2rem;
}
h1 {
  color: var(--color-clear);
}
h2 {
  color: var(--color-clear);
  font-weight: 500;
}
.buttons {
  display: flex;
  gap: 1vw;
}
.content , .finish {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.animation {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
.book {
  position: relative;
}
.book svg {
  height: 6em;
  margin: 0 auto;
}
.page svg {
  position: absolute;
  left: 2, 125rem;
  top: 0rem;
  margin: 0 auto;
  height: 6em;
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