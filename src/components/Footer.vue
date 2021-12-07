<template>
  <footer>
    <div class="info">
      <span>Grupo P44 | Equipo 2</span>
      <span>dwgrupo2c4@gmail.com</span>
    </div>
    <div class="icons">
      <img class="unal" :src="unal" alt="universidad nacional de colombia" />
      <line></line>
      <img class="mintic" :src="mintic" alt="mision mintic 2022" />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      unal: require("@/icons/logo_unal.svg"),
      mintic: require("@/icons/logo_mision_minticV2.svg"),
    };
  },
};
</script>

<style scoped>
@media only screen and (min-width: 750px) and (max-width: 2000px) {
  footer {
    height: 10rem;
    flex-direction: row;
    justify-content: space-between;
  }
  .info {
    align-items: flex-start !important;
  }
}
@media only screen and (min-width: 10px) and (max-width: 750px) {
  footer {
    height: 12rem;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 0 7vw !important;
  }
}
footer {
  width: 100vw;
  background-color: var(--header-background);
  display: flex;
  align-items: center;
  z-index: 2;
  margin-top: 3rem;
  padding: 0 11vw;
  transform: translateY(3.1vw);
}
.info {
  flex-direction: column;
}
.icons,
.info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.unal {
  width: 5rem;
}
.mintic {
  width: 8rem;
  filter: grayscale(1) brightness(3);
}
line {
  width: 0.1rem;
  height: 4rem;
  background-color: var(--color-clear);
}
span {
  color: var(--color-clear);
}
</style>