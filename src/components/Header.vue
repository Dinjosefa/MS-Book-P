<template>
  <header>
    <div class="main-nav">
      <nav class="navigation-search">
        <router-link class="logo" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            style="enable-background: new 0 0 24 24"
            xml:space="preserve"
          >
            <path class="st0" d="M0,0h24v24H0V0z" />
            <path class="st0" d="M0,0h24v24H0V0z" />
            <g>
              <path
                class="st1"
                d="M3.9,2.6v18.8h12.7c1.3,0,2.4-0.7,2.9-1.9c0.8-1.9,1.3-4.9-2.3-7.5c0,0,5.5-4,0.6-8.6   c-0.6-0.5-1.3-0.8-2.1-0.8C15.7,2.6,3.9,2.6,3.9,2.6z"
              />
              <g>
                <path
                  d="M8.7,5.3C9.4,6.4,9.8,7.5,10,8.7c0.3,1.1,0.4,2.3,0.4,3.4c0,1.1-0.1,2.3-0.4,3.4c-0.3,1.1-0.6,2.3-1.3,3.4l0,0    c0,0-0.1,0.1-0.1,0c0,0,0,0,0-0.1c-0.1-2.3-0.1-4.6-0.1-6.9c0-2.3,0-4.6,0.1-6.9c0-0.1,0-0.1,0.1-0.1C8.6,5.2,8.6,5.2,8.7,5.3    L8.7,5.3z"
                />
              </g>
              <g>
                <path
                  d="M6.2,11.9c1-0.2,2-0.3,2.9-0.4c1-0.1,2-0.2,2.9-0.3c2-0.2,3.9-0.3,5.9-0.2v2c-2,0-3.9-0.1-5.9-0.2c-1-0.1-2-0.2-2.9-0.3    c-1-0.1-2-0.2-2.9-0.4V11.9z"
                />
              </g>
            </g>
          </svg>
          <span class="pc">{{ textLogo }}</span>
        </router-link>
      </nav>
      <nav class="navigation-buttons">
        <router-link class="rt | nav-button" to="/">
          <span class="pc">Inicio</span>
          <svg
            class="mobile | icons-mobile"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
            />
          </svg>
        </router-link>
        <router-link
          class="rt | nav-button"
          :to="{ name: 'Loans', params: { id: userId } }"
          v-if="isAuth && !isAdmin"
        >
          <span class="pc">Prestamos</span>
          <svg
            class="mobile icons-mobile"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <rect fill="none" height="24" width="24" />
            <path
              d="M20,8v12c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2V8c0-1.86,1.28-3.41,3-3.86V3.5C7,2.67,7.67,2,8.5,2h0 C9.33,2,10,2.67,10,3.5V4h4V3.5C14,2.67,14.67,2,15.5,2h0C16.33,2,17,2.67,17,3.5v0.64C18.72,4.59,20,6.14,20,8z M6,13L6,13 c0,0.55,0.45,1,1,1h9v1c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H7C6.45,12,6,12.45,6,13z"
            />
          </svg>
        </router-link>
        <button
          :disabled="block"
          id="btn-account"
          class="btns-user"
          @click="btnClicked('btn-account')"
        >
          <span class="pc">{{ textBtnAccount }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              v-if="!isAuth"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
            />
            <path
              v-if="isAuth"
              class="back"
              d="M12,0.5C5.6,0.5,0.5,5.6,0.5,12S5.6,23.5,12,23.5S23.5,18.4,23.5,12S18.4,0.5,12,0.5z"
            />
            <path
              v-if="isAuth"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            />
          </svg>
        </button>
      </nav>
    </div>
    <div class="dropdown" id="dropdown" :style="{ display: dropDisplay }">
      <div class="dropcenter" @mouseleave="dropSH">
        <router-link
          to="/book/create"
          class="btn-drop"
          @click="clickDrop"
          v-show="isAdmin"
        >
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM15 16h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1zm-2-8V3.5L18.5 9H14c-.55 0-1-.45-1-1z"
              />
            </svg>
          </span>
          <span class="drop-text">Añadir Libro</span>
        </router-link>
        <router-link
          :to="{ name: 'Inventory', params: { id: 1 } }"
          class="btn-drop"
          v-show="isAdmin"
          @click="clickDrop"
        >
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 9h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm-4 4h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1zm4-8h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
              />
            </svg>
          </span>
          <span class="drop-text">Inventario</span>
        </router-link>
        <router-link
          :to="{ name: 'InLending', params: { id: 1 } }"
          class="btn-drop"
          v-show="isAdmin"
          @click="clickDrop"
        >
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M6.14 11.86l-2.78 2.79c-.19.2-.19.51 0 .71l2.78 2.79c.31.32.85.09.85-.35V16H13c.55 0 1-.45 1-1s-.45-1-1-1H6.99v-1.79c0-.45-.54-.67-.85-.35zm14.51-3.21l-2.78-2.79c-.31-.32-.85-.09-.85.35V8H11c-.55 0-1 .45-1 1s.45 1 1 1h6.01v1.79c0 .45.54.67.85.35l2.78-2.79c.2-.19.2-.51.01-.7z"
              />
            </svg>
          </span>
          <span class="drop-text">En Prestamo</span>
        </router-link>
        <router-link
          :to="{ name: 'Settings', params: { id: userId } }"
          class="btn-drop"
          @click="clickDrop"
        >
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M10.67,13.02C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V19c0,0.55,0.45,1,1,1 h8.26C10.47,18.87,10,17.49,10,16C10,14.93,10.25,13.93,10.67,13.02z"
              />
              <circle cx="10" cy="8" r="4" />
              <path
                d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l0.84-0.73c0.18-0.16,0.22-0.42,0.1-0.63l-0.59-1.02c-0.12-0.21-0.37-0.3-0.59-0.22 l-1.06,0.36c-0.32-0.27-0.68-0.48-1.08-0.63l-0.22-1.09c-0.05-0.23-0.25-0.4-0.49-0.4h-1.18c-0.24,0-0.44,0.17-0.49,0.4 l-0.22,1.09c-0.4,0.15-0.76,0.36-1.08,0.63l-1.06-0.36c-0.23-0.08-0.47,0.02-0.59,0.22l-0.59,1.02c-0.12,0.21-0.08,0.47,0.1,0.63 l0.84,0.73c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-0.84,0.73c-0.18,0.16-0.22,0.42-0.1,0.63l0.59,1.02 c0.12,0.21,0.37,0.3,0.59,0.22l1.06-0.36c0.32,0.27,0.68,0.48,1.08,0.63l0.22,1.09c0.05,0.23,0.25,0.4,0.49,0.4h1.18 c0.24,0,0.44-0.17,0.49-0.4l0.22-1.09c0.4-0.15,0.76-0.36,1.08-0.63l1.06,0.36c0.23,0.08,0.47-0.02,0.59-0.22l0.59-1.02 c0.12-0.21,0.08-0.47-0.1-0.63l-0.84-0.73C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S18.1,18,17,18z"
              />
            </svg>
          </span>
          <span class="drop-text">Configuración</span>
        </router-link>
        <div class="btn-drop" @click="btnClicked('logout')">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"
              />
            </svg>
          </span>
          <span class="drop-text">Cerrar Sesión</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["block"],
  data() {
    return {
      textLogo: "Book-P",
      drop: false,
      dropDisplay: "none",
      textBtnAccount: null,
      userId: 0,
      isAdmin: false,
      isAuth: false,
    };
  },
  methods: {
    btnClicked(btnId) {
      switch (btnId) {
        case "btn-account":
          if (this.isAuth) {
            this.dropSH();
          } else {
            this.$emit("login");
          }
          break;
        case "logo":
          this.$emit("loadHome");
          break;
        case "logout":
          this.dropSH();
          this.$emit("logoutClicked");
          break;
        default:
          break;
      }
    },
    clickDrop() {
      window.scrollTo(0, 0);
      this.dropDisplay = "none";
    },
    dropSH() {
      this.drop = this.isAuth ? !this.drop : this.drop;
      this.dropDisplay = this.drop ? "flex" : "none";
    },
    titleCase(str) {
      str = str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
      return str.join(" ");
    },
    showComponents() {
      if (this.isAuth) {
        this.textBtnAccount = this.titleCase(localStorage.getItem("name"));
        this.userId = localStorage.getItem("userId");
      } else {
        this.textBtnAccount = "Iniciar Sesion";
      }
    },
  },
  mounted() {
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.isAuth = JSON.parse(localStorage.getItem("isAuth"));
    this.showComponents();
  },
  beforeUpdate() {
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.isAuth = JSON.parse(localStorage.getItem("isAuth"));
    this.showComponents();
  },
};
</script>

<style scoped>
@media only screen and (min-width: 750px) and (max-width: 2000px) {
  .pc {
    display: flex;
  }
  .mobile {
    display: none;
  }
  .nav-button,
  .btns-user {
    padding: 0rem 1.5rem;
  }
  .dropdown {
    justify-content: flex-end;
    padding: 0 10vw;
  }
  .dropcenter {
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .btn-drop {
    justify-content: flex-start;
  }
}
@media only screen and (min-width: 10px) and (max-width: 750px) {
  .pc {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .nav-button,
  .btns-user {
    padding: 0rem 0.5rem;
  }
  .dropdown {
    justify-content: center;
    /* background-color: blueviolet !important; */
  }
  .dropcenter {
    width: 100%;
  }
  .btn-drop {
    justify-content: center;
  }
}
header {
  position: sticky;
  top: 0;
  height: 4.5rem;
  width: 100vw;
  background-color: var(--header-background);
  box-shadow: 0px 1px 26px 1px #8888885e;
  z-index: 2;
}
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
}
.navigation-search {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0 0.5rem;
}
.logo svg {
  fill: var(--bc-book);
  width: 2.5rem;
}
.logo span {
  font-size: 1.3rem;
  width: auto;
  color: var(--bc-book);
  white-space: nowrap;
  font-weight: 600;
}
.navigation-buttons {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}
.nav-button {
  display: flex;
  height: 4.5rem;
  align-items: center;
  color: var(--color-clear);
  background-image: linear-gradient(90deg, var(--bc-book), var(--bc-book));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 0.3rem;
  transition: all 0.5s ease;
}
.nav-button:hover {
  background-color: var(--color-nav);
  background-size: 100% 0.3rem;
}
.active {
  background-color: var(--color-nav);
  background-size: 100% 0.3rem;
}
.btns-user {
  cursor: pointer;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--color-clear);
  white-space: nowrap;
  flex-direction: row;
}
.btns-user:hover {
  transform: scale(105%);
}
.btns-user svg {
  fill: var(--bc-book);
  width: 2.8rem;
  transition: all 0.5s ease;
}
.back {
  fill: transparent;
  /* fill: var(--color-clear); */
}
.icons-mobile {
  fill: white;
  width: 2.5rem;
}
.dropdown {
  cursor: pointer;
  /* background-color: var(--bg-drop); */
  transition: all 0.5s ease;
  z-index: 2;
}
.dropcenter {
  background-color: var(--bg-drop);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
}
.btn-drop {
  position: static;
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  color: var(--color-clear);
  transition: all 1s ease;
  width: 100%;
}
.btn-drop:hover {
  background-color: var(--drop-hover);
  color: var(--color-clear);
}
.btn-drop:hover > .icon svg {
  fill: var(--color-clear);
}

.btn-drop:hover > .icon {
  animation-name: iconmove;
  animation-duration: 1s;
}
.icon {
  padding-right: 1rem;
}
.icon svg {
  /* fill: var(--color-clear); */
  fill: var(--bc-book);
  transition: all 1s ease;
  width: 1.5rem;
}
.drop-text {
  min-width: 8rem;
  text-align: initial;
}
a {
  text-decoration: none;
}
.st0 {
  fill: none;
  stroke-width: 2.3;
}
.st1 {
  fill: none;
  stroke: var(--bc-book);
  stroke-width: 2.5;
  stroke-miterlimit: 10;
}
</style>
