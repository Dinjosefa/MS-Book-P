<template>
  <table>
    <tr class="header">
      <th>ID</th>
      <th>UserID</th>
      <th class="m1">Usuario</th>
      <th>BookID</th>
      <th class="m1">Titulo</th>
      <th >Status</th>
      <th class="m2">Fecha Inicio</th>
      <th>Fecha Fin</th>
    </tr>
    <tr v-for="(loan, index) in loans" :key="index">
      <td>{{ loan.id }}</td>
      <td @click="openUser(loan.idUser)" class="subline">{{ loan.idUser }}</td>
      <td class="m1 | cur" @click="openUser(loan.idUser)">{{ loan.user }}</td>
      <td @click="openBook(loan.idBook)" class="subline">{{ loan.idBook }}</td>
      <td class="m1 | cur" @click="openBook(loan.idBook)">{{ loan.title }}</td>
      <td>{{ (loan.status == 1) ? 'En Stock' : (loan.status == 2) ? 'En Proceso': 'En Prestamo'}}</td>
      <td class="m2">{{ loan.dateStart }}</td>
      <td>{{ loan.dateFinish }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TableLending",
  props:['loans'],
  data() {
    return {
    };
  }, 
  methods: {
    openUser(id) {
      this.$router.push({ name: "User", params: { id: id } });
      window.scrollTo(0, 0);
    },
    openBook(id) {
      this.$router.push({ name: "UpdateBook", params: { id: id } });
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
@media only screen and (min-width: 750px) and (max-width: 1024px) {
  .m1{
    display: none;
    
  }
}
@media only screen and (max-width: 750px) {
  .m1{
    display: none;
    
  }
  .m2{
    display: none;

  }
}
@media only screen and (max-width: 530px) {
 .m1{
    display: none;
  }
  .m2{
    display: none;
  }
.m3{
  display: none;
}
}
table {
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
  border-color: var(--color-dark);
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
}
.header {
  background-color: var(--color-dark);
  color: var(--color-clear);
  height: 2rem;
}
th,
td {
  padding: 0.4rem 0.6rem;
}
svg {
  fill: var(--color-dark);
  cursor: pointer;
}
.actions{
  gap:1rem;
}
.subline{
  text-decoration: underline;
}
.cur, .subline{
  cursor: pointer;
}
</style>