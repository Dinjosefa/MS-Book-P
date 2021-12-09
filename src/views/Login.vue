<template>
  <div class="main-content">
    <form @submit.prevent="loginProcess">
      <h1>INICIAR SESIÓN</h1>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <input
          type="username"
          name="username"
          placeholder="Username"
          v-model="user.username"
          required
        />
      </div>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
            />
          </svg>
        </div>

        <input
          :type="psType"
          name="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ps"
          viewBox="0 0 24 24"
          @click="psMethod"
        >
          <path
            v-show="!psState"
            d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
          <path
            v-show="psState"
            d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z"
          />
        </svg>
      </div>
      <button type="submit" class="main-button">Iniciar Sesión</button>
    </form>
    <Confirmation
      :msg="modal.message"
      :animation="modal.animation"
      :successMsg="modal.successMsg"
      :errorMsg="modal.errorMsg"
      :finish="modal.finish"
      :error="modal.error"
      v-show="modal.visible"
      @accept="loginProcess"
      @close="modal.visible = false"
    />
    <span>¿No tienes cuenta? <router-link class="logo" :to="{name:'Signup'}">Registrate</router-link></span>
  </div>
</template>

<script>
import Confirmation from "@/components/Confirmation.vue";
import gql from "graphql-tag";

export default {
  name: "Login",
  components: {
    Confirmation,
  },
  data() {
    return {
      psType: "password",
      psState: false,
      user: {
        username: null,
        password: null,
      },
      modal: {
        visible: false,
        message: null,
        animation: true,
        successMsg: null,
        errorMsg: "No se pudo acceder",
        finish: false,
        error: false,
      },
    };
  },
  methods: {
    psMethod() {
      this.psState = !this.psState;
      this.psType = this.psType == "password" ? "text" : "password";
    },
    async loginProcess() {
      this.modal.visible = true;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation LogIn($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let tokens = JSON.parse(JSON.stringify(result));
          let results = tokens.data.logIn;
          localStorage.setItem("tokenRefresh", results.refresh);
          localStorage.setItem("tokenAccess", results.access);
          this.modal.animation = false;
          this.modal.visible = false;
          this.$emit("userLogin");
        })
        .catch((error) => {
          this.modal.error = true;
          setTimeout(() => {
            this.modal.visible = false;
            this.$router.push({ name: "Home" });
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 450px) {
  form{
      font-size: 12px;
  }
  .icons, svg, .inputs, input, .ps, .main-button{
      font-size: 11px ;
  }
  h1{
      font-size: 1.3rem !important;
  }
  span,a{
      font-size: .88rem !important;
  }
}
.main-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 78.9vh;
  justify-content: center;
  gap: 1.5rem;
}
h1 {
  color: var(--color-clear);
  font-kerning: normal;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-dark);
  padding: 3.5em 2.5em 2em 2.5em;
  gap: 1em;
  width: 25em;
  border-radius: var(--radius);
}
.icons {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bc-book);
  padding: 0.5em;
}
svg {
  width: 2em;
  height: 2em;
  fill: var(--color-dark);
}
.inputs {
  display: flex;
  overflow: hidden;
  border-radius: var(--radius);
  height: 3em;
  width: 100%;
}
input {
  border-radius: 0 !important;
  height: 100%;
  text-align: initial;
  padding-left: 1.5em;
  width: 20em;
}
.ps {
  position: absolute;
  cursor: pointer;
  width: 1.5em;
  fill: var(--color-dark);
  background-color: transparent !important;
  transform: translate3d(17.8em, 0.56em, 0);
}
.main-button {
   padding: 0.7em 1.3em;
  width: 100%;
}
a {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
span, a{
    font-size: 1rem;
}
</style>