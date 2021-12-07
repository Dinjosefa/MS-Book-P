<template>
   <div class="main">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            />
          </svg>
       <div class="container">
          <h1>{{ user.username }}</h1>
          <h2><i>Nombre:</i> {{ user.firstname }} {{ user.lastname }}</h2>
          <h2><i>Email:</i> {{ user.email }}</h2>
          <h2><i>Dirección:</i> {{ user.address }}</h2>
          <h2><i>Telefono:</i> {{ user.phone }}</h2>
          <h2><i>Libros en prestamo:</i> {{ user.cantlib }}</h2>
       </div>
   </div>
</template>

<script>
import "@/users.js";
export default {
  name: "User",
  data() {
    return {
      id: null,
      user: [],
    };
  },
  methods: {
    getData() {
      this.user = usersData;
      this.user = this.user.find((user) => user.id == this.id);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
};
</script>

<style scoped>
.main, .container{
     display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.main{
    gap: 1rem;
    height: 75vh;
}
h2{
    font-weight: 500;
}
svg {
  width: 11em;
  fill: var(--color-dark);
}
</style>