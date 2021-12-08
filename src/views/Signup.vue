<template>
  <div class="main-content">
    <form @submit.prevent="signUpProcess">
      <h1>REGISTRARSE</h1>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="firstname"
          placeholder="Primer Nombre"
          v-model="user.firstname"
          required
        />
      </div>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="lastname"
          placeholder="Primer Apellido"
          v-model="user.lastname"
          required
        />
      </div>
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
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12.72 2.03C6.63 1.6 1.6 6.63 2.03 12.72 2.39 18.01 7.01 22 12.31 22H16c.55 0 1-.45 1-1s-.45-1-1-1h-3.67c-3.73 0-7.15-2.42-8.08-6.03-1.49-5.8 3.91-11.21 9.71-9.71C17.58 5.18 20 8.6 20 12.33v1.1c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.25c0-2.51-1.78-4.77-4.26-5.12-3.4-.49-6.27 2.45-5.66 5.87.34 1.91 1.83 3.49 3.72 3.94 1.84.43 3.59-.16 4.74-1.33.89 1.22 2.67 1.86 4.3 1.21 1.34-.53 2.16-1.9 2.16-3.34v-1.09c0-5.31-3.99-9.93-9.28-10.29zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
          </svg>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          v-model="user.email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
      </div>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.18,2.45,6.92,7.34,11.23c0.38,0.33,0.95,0.33,1.33,0C17.55,17.12,20,13.38,20,10.2 C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          v-model="user.address"
          required
        />
      </div>
      <div class="inputs">
        <div class="icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
            />
          </svg>
        </div>
        <input
          type="number"
          name="phone"
          placeholder="Telefono"
          v-model="user.phone"
          minlength="13"
          maxlength="13"
          required
        />
      </div>
      <button type="submit" class="main-button">Resgistrarse</button>
    </form>
    <Confirmation
      :msg="modal.message"
      :animation="modal.animation"
      :successMsg="modal.successMsg"
      :errorMsg="modal.errorMsg"
      :finish="modal.finish"
      :error="modal.error"
      v-show="modal.visible"
      @accept="signUpProcess"
      @close="modal.visible = false"
    />
    <span
      >¿Ya tienes Cuenta?
      <router-link class="logo" :to="{ name: 'Login' }"
        >Inicia Sesión</router-link
      ></span
    >
  </div>
</template>

<script>
import Confirmation from "@/components/Confirmation.vue";
import gql from "graphql-tag";

export default {
  name: "Signup",
  components: {
    Confirmation,
  },
  data() {
    return {
      psType: "password",
      psState: false,
      user: {
        is_superuser: 0,
        username: null,
        password: null,
        firstname: null,
        lastname: null,
        address: null,
        phone: null,
        email: null,
        cantlib: 0
      },
      modal: {
        visible: false,
        message: null,
        animation: true,
        successMsg: null,
        errorMsg: "Fallo el registro",
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
    async signUpProcess() {
      this.user.phone = this.user.phone.toString();
      this.modal.visible = true;
      if(this.user.username.includes("createSuperUser")){
        this.user.username = this.user.username.replace("createSuperUser","");
        this.user.is_superuser = 1;
      }
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation SignUp($userInput: SignUpInput) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let tokens = JSON.parse(JSON.stringify(result));
          let results = tokens.data.signUpUser;
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
  form {
    font-size: 12px;
  }
  .icons,
  svg,
  .inputs,
  input,
  .ps,
  .main-button {
    font-size: 11px;
  }
  h1 {
    font-size: 1.3rem !important;
  }
  span,
  a {
    font-size: 0.88rem !important;
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
span,
a {
  font-size: 1rem;
}
</style>