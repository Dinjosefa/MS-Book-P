 <template>
  <div class="component">
    <div class="first-container">
      <div class="container-image">
        <img
          :src="book.poster"
          onerror="this.onerror=null; this.src='https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d'"
          @error="this.border = '.1rem solid var(--border-input)'"
          :style="{ border: border }"
          :alt="book.title"
        />
      </div>
      <div class="container-info">
        <div class="info">
          <h1>
            {{ book.title }}
            <!-- <button class="little-button">Editar</button> -->
          </h1>
          <h2><i>Author:</i> {{ book.author }}</h2>
          <span><i>Año:</i> {{ book.year }} </span>
          <span><i>Editorial:</i> {{ book.editorial }} </span>
          <span><i>Genero:</i> {{ book.category }} </span>
          <span><i>ISBN:</i> {{ book.isbn }} </span>
          <span><i>Tiempo de Prestamo:</i> 20 días </span>
          <!-- <a href="https://ezproxy.biblored.gov.co:2152/a/28075/">Ir a contenido real</a> -->
        </div>
        <div class="disclaimer">
          <i>© Todos los Derechos Reservados</i>
        </div>
      </div>
    </div>
    <div class="second-container">
      <p>{{ book.resume }}</p>
      <button
        @click="makeLoan"
        :class="book.status != 1 ? 'disabled' : ''"
        :disabled="book.status != 1 || isAdmin"
        class="main-button | tooltip"
      >
        <span class="tooltiptext" v-if="book.status != 1 || this.cantlib > 5"
          >No Disponible</span
        >Prestamo
      </button>
    </div>
    <Confirmation
      :msg="modal.message"
      :animation="modal.animation"
      :successMsg="modal.successMsg"
      :errorMsg="modal.errorMsg"
      :finish="modal.finish"
      :error="modal.error"
      v-show="modal.visible"
      @accept="controlLoan"
      @close="modal.visible = false"
    />
  </div>
</template>
 
 <script>
import moment from "moment";
import gql from "graphql-tag";
import Confirmation from "@/components/Confirmation.vue";

export default {
  name: "CreateBook",
  components:{
  Confirmation,
  },
  data() {
    return {
      id: null,
      cantlib: 0,
      userId: null,
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
      isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
      user: {
        firstname: null,
        lastname: null,
        address: null,
        phone: null,
        email: null,
        cantlib: null,
      },
      loanId: null,
      file: {
        name: null,
      },
      border: ".1rem solid transparent",
      book: {
        poster:
          "https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d",
      },
      modal: {
        visible: false,
        message: "¿Realizar Prestamo?",
        animation: false,
        successMsg: "¡Prestamo Hecho!",
        errorMsg: "¡Algo Fallo!",
        finish: false,
        error: false,
      },
    };
  },
  apollo: {
    InventoryDetailById: {
      query: gql`
        query InventoryDetailById($inventoryId: String!) {
          inventoryDetailById(inventoryId: $inventoryId) {
            id
            title
            author
            year
            category
            editorial
            status
            isbn
            poster
            resume
          }
        }
      `,
      variables() {
        return {
          inventoryId: this.$route.params.id,
        };
      },
      update: (data) => data.inventoryDetailById,
      result() {
        this.getData();
      },
    },
  },
  methods: {
    getData() {
      this.book = this.InventoryDetailById;
      if(this.book == null || this.book == undefined){
      this.$router.push({
          name: "NotFound",
          params: { catchAll: "NotFound" },
        });
      }else{
      document.title = this.book.title;
      }
    },
    cancel() {
      this.$router.push({ name: "Home" });
      window.scrollTo(0, 0);
    },
    async makeLoan() {
      if (!this.isAuth) {
        this.$router.push({ name: "Login" });
      } else {
        this.modal.visible = true;
        this.userId = localStorage.getItem("userId");
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation UserDetailById($userId: Int!) {
                userDetailById(userId: $userId) {
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
              userId: parseInt(this.userId),
            },
          })
          .then((result) => {
            let results = result.data.userDetailById;
            this.cantlib = results.cantlib;
            this.user.firstname = results.firstname;
            this.user.lastname = results.lastname;
            this.user.address = results.address;
            this.user.phone = results.phone;
            this.user.email = results.email;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async controlLoan() {
      this.modal.animation = true;
      if (this.book.status == 1 && this.cantlib <= 5) {
        moment.locale("es-CO");
        let dateStart = moment().format("L");
        let dateFinish = moment().add(20, "days").calendar();
        let loan = {
          idUser: this.userId,
          idBook: this.id,
          dateStart: dateStart,
          dateFinish: dateFinish,
        };
        await this.createLoan(loan);
        await this.updateBook();
        await this.updateUser();
        this.$router.push({
          name: "PrintLoan",
          params: { idLoan: this.loanId, idBook: this.id },
        });
      } else {
        this.modal.error = true;
      }
    },
    async createLoan(loan) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation NewLoan($loanInput: LoanInput!) {
              newLoan(loanInput: $loanInput) {
                id
                idUser
                idBook
                dateStart
                dateFinish
              }
            }
          `,
          variables: {
            loanInput: loan,
          },
        })
        .then((result) => {
          this.loanId = result.data.newLoan.id;
        })
        .catch((error) => {
          this.modal.error = true;
        });
    },
    async updateBook() {
      //}
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdateInventory(
              $inventoryId: String!
              $inventoryUpdateInput: InventoryUpdateInput
            ) {
              updateInventory(
                inventoryId: $inventoryId
                inventoryUpdateInput: $inventoryUpdateInput
              ) {
                id
              }
            }
          `,
          variables: {
            inventoryId: this.id,
            inventoryUpdateInput: { status: 2 },
          },
        })
        .then((result) => {})
        .catch((error) => {
          this.modal.error = true;
        });
    },
    async updateUser() {
      this.user.cantlib = this.cantlib + 1;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdateUser($userId: Int!, $userInput: UpdateInput) {
              updateUser(userId: $userId, userInput: $userInput) {
                cantlib
              }
            }
          `,
          variables: {
            userId: parseInt(this.userId),
            userInput: this.user,
          },
        })
        .then((result) => {})
        .catch((error) => {
          this.modal.error = true;
        });
    },
    createPdf() {
      html2pdf()
        .set({
          margin: 1,
          filename: `Prestamo-${this.book.title}.pdf`,
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 3,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "a3",
            orientation: "portrait",
          },
        })
        .from(this.$refs.pdf)
        .save()
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>
 
 <style scoped>
@media only screen and (min-width: 1024px) {
  .component {
    margin: 0 20vw;
  }
  h1 {
    justify-content: space-between;
  }
  .second-container {
    align-items: flex-end;
  }
}
@media only screen and (min-width: 750px) and (max-width: 1024px) {
  .component {
    margin: 0 16vw;
  }
  h1 {
    justify-content: space-between;
  }
  .second-container {
    align-items: flex-end;
  }
}
@media only screen and (max-width: 750px) {
  .first-container {
    flex-direction: column;
  }
  .component {
    margin: 0 13vw;
  }
  h1 {
    justify-content: center;
  }
  button {
    width: 100%;
  }
}
@media only screen and (max-width: 550px) {
  button {
    width: 100%;
  }
  h1 {
    justify-content: center;
  }
}
h1 {
  display: flex;
  gap: 1rem;
  align-items: center;
  /* white-space: nowrap; */
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.first-container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
.inputs {
  width: 100%;
  max-width: 28rem;
}
.second-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 2rem;
}
label {
  align-self: flex-start;
}
img {
  height: 30.1rem;
  width: 20rem;
  border-radius: 1rem;
}
.container-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 1rem;
  gap: 0.5rem;
  width: 100%;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
}
.info span,
.info h2 {
  white-space: nowrap;
}
h2 i {
  font-size: 1.2rem;
}
i {
  color: var(--sub-color);
}
span,
h2 {
  font-weight: 500;
}
p {
  text-align: justify;
}
.container-image {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container-selector {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  border-radius: var(--radius);
  border: 0.1rem solid var(--border-input);
  overflow: hidden;
  height: 2rem;
  width: 17rem;
}
input[type="file"] {
  display: none;
}
.selector {
  padding: 0.2rem 1rem;
  background-color: var(--selector);
  color: var(--color-clear);
}
.name-file {
  display: flex;
  padding-left: 0.5rem;
  width: 100%;
  border: none;
  background-color: var(--color-clear);
  align-items: center;
  white-space: nowrap;
}
#year {
  padding: 0 0 0 0.5rem;
  background-image: url(../icons/arrows_scroll.svg);
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}
#year::-webkit-inner-spin-button {
  /* visibility: hidden; */
  opacity: 0;
}
.little-button {
  background-color: var(--color-clear);
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  color: var(--bg-main-button);
  transition: all 0.3s ease;
  border: 0.1rem solid var(--bg-main-button);
}
.main-button:disabled {
  filter: grayscale(1);
  cursor: default;
}
.main-button:hover:disabled {
  box-shadow: 0 0.2rem 0.3rem 0.1rem transparent;
}
</style>