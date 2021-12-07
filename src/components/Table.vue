<template>
  <table>
    <tr class="header">
      <th class="m1">ID</th>
      <th>Titulo</th>
      <th class="m3">Autor</th>
      <th class="m2">Año</th>
      <th class="m1">Editorial</th>
      <th class="m1">Genero</th>
      <th>Estado</th>
      <th class="m2">Poster</th>
      <th>Acciones</th>
    </tr>
    <tr v-for="(book, index) in books" :key="index">
      <td class="m1">{{ book.id }}</td>
      <td>{{ book.title }}</td>
      <td class="m3">{{ book.author }}</td>
      <td class="m2">{{ book.year }}</td>
      <td class="m1">{{ book.editorial }}</td>
      <td class="m1">{{ book.category }}</td>
      <td>{{ (book.status == 1) ? 'En Stock' : (book.status == 2) ? 'En Proceso': 'En Prestamo'}}</td>
      <td class="m2">
        <a :href="book.poster" target="_blank"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z"
            /></svg
        ></a>
      </td>
      <td class="actions">
        <svg @click="openEdit(book.id)"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path
            d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
          />
        </svg>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Table",
  props:['books'],
  data() {
    return {
    };
  }, 
  methods: {
    openEdit(id) {
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
  padding: 0 0.6rem;
}
svg {
  fill: var(--color-dark);
  cursor: pointer;
}
.actions{
  gap:1rem;
}
</style>