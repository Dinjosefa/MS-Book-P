<template>
  <div class="pdf" id="pdf" ref="pdf">
    <div class="container">
      <div class="information-header">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19.1,12c0.8-0.9,1.9-2.4,2-4.2c0.1-1.9-0.7-3.6-2.5-5.3c-0.9-0.7-1.8-1.1-2.9-1.1H2.6v21.3h13.9  c1.8,0,3.4-1,4.1-2.7C21.9,17,21.4,14.2,19.1,12z M18.3,19c-0.3,0.7-0.9,1.1-1.7,1.1H5.1V3.9h10.6c0.5,0,0.9,0.2,1.2,0.5  c1.1,1.1,1.7,2.2,1.6,3.2c-0.1,1.3-1,2.5-1.6,3c-1.7,0-3.3,0.1-4.9,0.3c-0.3,0-0.7,0.1-1,0.1c0-0.9-0.2-1.8-0.4-2.7  C10.3,7.1,10,5.9,9.2,4.7H9c-0.1,2.2-0.1,4.4-0.1,6.6c-0.8,0.1-1.8,0.2-2.7,0.5c0,0,0,0.1,0,0.1C7,12.1,8,12.3,8.9,12.4  c0,2.2,0,4.5,0.1,6.7h0.2c0.7-1.2,1.1-2.4,1.4-3.6c0.2-0.9,0.3-1.9,0.4-2.8c0.3,0,0.7,0.1,1,0.1c1.5,0.2,3,0.2,4.5,0.3  C18.8,14.7,19.4,16.6,18.3,19z"
            />
          </svg>
          <h1>Book-P</h1>
        </div>
        <div>
          <span>Bogotá D.C</span>
          <span>P44-C4 Equipo 2</span>
          <span>ID Prestamo: {{ loan.id }}</span>
        </div>
      </div>
      <span class="msgs | top"
        >*Muestre este recibo para reclamar/devolver el libro solicitado</span
      >
    </div>
    <div class="container">
      <div class="information-loan">
        <span class="bold"
          >Prestamo del libro: <span>{{ loan.title }}</span></span
        >
        <span class="bold"
          >ID Libro: <span>{{ loan.idBook }}</span></span
        >
        <span class="bold"
          >ISBN: <span>{{ loan.isbn }}</span></span
        >
        <span class="bold"
          >Usuario: <span>{{ loan.user }}</span></span
        >
        <span class="bold"
          >ID Usuario: <span>{{ loan.idUser }}</span></span
        >
        <span class="bold"
          >Fecha del prestamo: <span>{{ loan.dateStart }}</span></span
        >
        <span class="bold"
          >Fecha MAX para devolución: <span>{{ loan.dateFinish }}</span></span
        >
      </div>
      <div>
        <div class="code">
          <img :src="qrcode" />
          <span>(código para administrador)</span>
        </div>
      </div>
    </div>
    <div class="container | foot">
      <span class="msgs">¡Gracias por hacer su prestamo en Book-P!</span>
      <div class="icons">
        <img class="unal" :src="unal"/>
        <line></line>
        <img class="mintic" :src="mintic"/>
      </div>
    </div>
  </div>
  <button @click="createPdf">descargar</button>
</template>

<script>
import html2pdf from 'html2pdf.js';
import qrcode from "qrcode";
export default {
  name: "PrintLoan",
  data() {
    return {
      qrcode: null,
      url: null,
      unal: require("@/icons/logo_unal.png"),
      mintic: require("@/icons/logo_mision_minticV2.png"),
      loan: {
        id: 1,
        title: "Los Hijos De Los Días",
        idBook: 1,
        isbn: 9788432316272,
        user: "Felipe Gomez",
        idUser: 3,
        dateStart: "14/11/2021",
        dateFinish: "03/12/2021",
      },
    };
  },
  methods: {
    async getQrCode() {
      this.qrcode = await qrcode.toDataURL(this.url);
    },
    createPdf() {
      html2pdf().set({
        margin:1,
        filename: `Prestamo-${this.loan.title}.pdf`,
        image:{
          type:'jpeg',
          quality: 0.98
        },
        html2canvas:{
          scale:3,
          letterRendering: true,
        },
        jsPDF:{
          unit: 'in',
          format:'a3',
          orientation: 'portrait'
        }
      })
      .from(this.$refs.pdf)
      .save()
      .catch(err => console.log(err))
    },
  },
  mounted() {
    this.id = 1;
    this.url = `http://localhost:8080/book/${this.id}/update`;
    this.getQrCode();
  },
};
</script>

<style scoped>
.pdf {
  display: flex;
  flex-direction: column;
  width: 950px;
  gap: 1.5rem;
  background-color: white;
  padding: 3.5rem 2rem 2rem 2rem;
}
.pdf .container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.information-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.information-header div:last-child,
.information-loan {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0.2rem;
}
.information-header div:last-child span {
  font-size: 1.2rem;
}
.bold {
  font-weight: 500;
}
.logo {
  display: flex;
  gap: 0.2rem;
  color: #eb2d6d;
}
h1 {
  font-weight: 500;
}
.logo svg {
  fill: #eb2d6d;
  width: 3rem;
}
.information-loan span {
  font-size: 1.5rem;
}
.code {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.code img {
  width: 13.5rem;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
}
.unal {
  width: 5rem;
}
.mintic {
  width: 8rem;
}
line {
  width: 0.1rem;
  height: 4rem;
  background-color: #5d5d5d;
}
.msgs {
  font-size: 1.2rem;
  padding-left: 0.2rem;
}
.top {
  padding-top: 0.7rem;
}
.foot {
  display: flex;
  align-items: center !important;
}
</style>