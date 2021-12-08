<template>
  <div>
    <h1>Configuración</h1>
    <form @submit.prevent="processUpdate">
     <div class="inputs">
          <div class="containter-input">
            <label for="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              :value="user.username"
              disabled
            />
          </div>
          <div class="containter-input">
            <label for="firstname">Primer Nombre:</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              v-model="user.firstname"
              required
            />
          </div>
          <div class="containter-input">
            <label for="lastname">Primer Apellido:</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              v-model="user.lastname"
              required
            />
          </div>
          <div class="containter-input">
            <label for="email">Correo:</label>
            <input
              type="text"
              name="email"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <div class="containter-input">
            <label for="address">Dirección:</label>
            <input
              type="text"
              name="address"
              id="address"
              v-model="user.address"
              required
            />
          </div>
          <div class="containter-input">
            <label for="phone">Telefono:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              v-model="user.phone"
              required
            />
          </div>
     </div>
    <div class="buttons">
          <button @click="cancel" class="sub-button">Cancelar</button>
          <button type="submit" class="main-button">Guardar</button>
        </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: "UserSettings",
  data() {
    return {
        id: null,
        user: {
            username:null,
            firstname:null,
            lastname:null,
            email:null,
            address:null,
            phone:null,
        }
    };
  },
  methods: {
    async getData(){
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
                }`,
          variables: {
            userId: this.id,
          },
        })
        .then((result) => {
            this.user = JSON.parse(JSON.stringify(result.data.userDetailById));
        })
        .catch((error) => {
          alert("Error, intente refrescar la pagina");
        });
    },
    processUpdate() {},
    cancel() {
      this.$router.push({ name: "Home" });
      window.scrollTo(0, 0);
    },
  },
  mounted() {
      this.id =  parseInt(this.$route.params.id);
      this.getData();
  },
};
</script>

<style scoped>
.inputs {
  width: 100%;
  max-width: 28rem;
}
.containter-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 1rem;
}
input {
  border: 0.1rem solid var(--border-input);
  text-align: initial;
  padding: 0 0.5rem;
}
.buttons {
  display: flex;
  gap: 1rem;
  align-self: flex-end;
}
</style>