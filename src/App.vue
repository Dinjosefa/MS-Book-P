<template>
  <Header
    :isAuth="isAuth"
    :block="block"
    :isAdmin="isAdmin"
    @login="Login"
    @logoutClicked="Logout"
  />
  <main>
    <router-view @userLogin="userLogin" />
  </main>
  <Footer />
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isAuth: false,
      isAdmin: false,
      block: false,
      user: [],
      id: 3,
    };
  },
  methods: {
    Login() {
      this.$router.push({ name: "Login" });
    },
    async userLogin() {
      this.id = jwt_decode(localStorage.getItem("tokenRefresh")).user_id;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UserDetailById($userId: Int!) {
            userDetailById(userId: $userId) {
            is_superuser
            id
            username
            firstname
            lastname
            address
            phone
            email
            cantlib
            }
          }
          `,
          variables: {
            userId: this.id,
          },
        })
        .then((result) => {
          let results = result.data.userDetailById;
            localStorage.setItem("isAdmin", (results.is_superuser == 1) ? true : false);
            let name = `${results.firstname} ${results.lastname}`;
            localStorage.setItem("name", name);
            localStorage.setItem("userId", results.id);
            localStorage.setItem("username", results.username);
            this.$router.push({name:"Home"});
            this.isAuth = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Logout() {
      localStorage.clear();
      this.$router.push({name:"Home"});
      this.isAuth = false;
    },
  },
  mounted() {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");
:root {
  font: 11pt "Poppins", "Montserrat Medium";
  --header-background: #16223f;
  --bg: #f7f7f7;
  --bc-book: #eb2d6d;
  --bg-main-button: var(--bc-book);
  --bg-hover-main-button: #16223f60;
  --bg-border: var(--bc-book);
  --bg-dropdown: #0d1336;
  --bg-hover-dropdown: #0066cd;
  --in-hover-dropdown: #1eaca0;
  --color-clear: white;
  --color-dark: #16223f;
  --radius: 0.5rem;
  --selector: var(--bc-book);
  --border-input: var(--header-background);
  --scrollbar-color: var(--bc-book);
  --sub-color: #16223fc9;
  --color-nav: #22294c;
  --bg-drop: var(--header-background);
  --drop-hover: #22294c;
  --bg-banner: #8a2be2;
  /* --bg-book-anim:#e91e6300; */
  --bg-book-anim: #eb2d6d;
  --bg-tooltip: var(--bg-banner);
}
* {
  font: 11pt "Poppins";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--bg);
  overflow-x: hidden;
}
/* ::-webkit-scrollbar {
    height: 1rem;
    width: 1rem;
}

::-webkit-scrollbar-corner {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: var(--scrollbar-color);
    border: .1rem solid transparent;
    border-radius: 1rem;
} */
main {
  min-height: 78.9vh;
  /* min-height: 74.9vh; */
  padding-top: 2rem;
}
button {
  border: none;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  box-shadow: none;
  outline: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
input {
  border: none;
  text-align: center;
  background-image: none;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  outline: 0;
  border-radius: var(--radius);
  height: 2rem;
}
input:valid {
  border: 0.1rem solid var(--valid);
}
input:invalid {
  border: 0.1rem solid var(--invalid);
}
input::-webkit-validation-bubble {
  border: 0.1rem solid var(--valid);
}
h1 {
  font-size: 2rem;
  font-weight: bold;
}
h2 {
  font-size: 1.2rem;
  /* font-weight: bold; */
}
.rt {
  text-decoration: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 1.5rem;
}

#nav a {
  font-weight: bold;
  color: #2a68a5;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.rt {
  color: var(--color-clear);
}
.main-button {
  background-color: var(--bg-main-button);
  padding: 0.7rem 1.3rem;
  border-radius: 0.5rem;
  color: var(--color-clear);
  transition: all 0.3s ease;
  font-weight: 500;
  border: 0.2rem solid transparent;
}
.main-button:hover {
  box-shadow: 0 0.2rem 0.3rem 0.1rem var(--bg-hover-main-button);
  z-index: 3;
}
.sub-button {
  background-color: var(--color-clear);
  padding: 0.7rem 1.3rem;
  border-radius: 0.5rem;
  color: var(--bg-main-button);
  transition: all 0.3s ease;
  font-weight: 500;
  border: 0.2rem solid var(--bg-main-button);
}
.sub-button:hover {
  box-shadow: 0 0.2rem 0.3rem 0.1rem var(--bg-hover-main-button);
  z-index: 3;
}
.tooltip {
  position: relative;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltiptext {
  visibility: hidden;
  background-color: var(--bg-tooltip);
  color: var(--color-clear);
  text-align: center;
  border-radius: var(--radius);
  padding: 0.4rem 0.7rem;
  position: absolute;
  z-index: 1;
  left: -130%;
  top: 10%;
  white-space: nowrap;
}
.tooltiptext::after {
  content: "";
  position: absolute;
  top: 30%;
  right: -9%;
  border-width: 0.35rem;
  border-style: solid;
  border-color: #0000 #0000 #0000 var(--bg-tooltip);
}
@keyframes iconmove {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(6%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes tumble {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  15% {
    transform: translateY(-5rem) rotate(360deg);
  }
  30% {
    transform: translateY(0) rotate(-360deg);
  }
  45% {
    transform: translateY(-7rem) rotate(360deg);
  }
  60% {
    transform: translateY(0) rotate(-360deg);
  }
  75% {
    transform: translateY(-5rem) rotate(360deg);
  }
  100% {
    transform: translateY(0) rotate(-360deg);
  }
}
</style>
