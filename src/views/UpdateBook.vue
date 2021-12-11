 <template>
  <div class="component">
    <h1>
      Editar Registro
      <button class="little-button" @click="deleteProcess">Eliminar</button>
    </h1>
    <form @submit.prevent="updateProcess">
      <div class="first-container">
        <div class="inputs">
          <div class="containter-input">
            <label for="title">Titulo:</label>
            <input type="text" id="title" v-model="book.title" required />
          </div>
          <div class="containter-input">
            <label for="author">Autor:</label>
            <input type="text" id="author" v-model="book.author" required />
          </div>
          <div class="containter-input">
            <label for="year">Año:</label>
            <input
              type="number"
              id="year"
              min="1300"
              max="2099"
              minlength="4"
              maxlength="4"
              step="1"
              v-model="book.year"
              required
            />
          </div>
          <div class="containter-input">
            <label for="editorial">Editorial:</label>
            <input
              type="text"
              id="editorial"
              v-model="book.editorial"
              required
            />
          </div>
          <div class="containter-input">
            <label for="category">Genero:</label>
            <select id="category" required v-model="book.category">
              <option
                v-for="(item, index) in categories"
                :key="index"
                :value="item"
                :selected="item == book.category"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="containter-input">
            <label for="status">Estatus:</label>
            <select id="status" required v-model="book.status">
              <option
                v-for="(item, index) in status"
                :key="index"
                :value="item.value"
                :selected="item.value == book.status"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="containter-input">
            <label for="isbn">ISBN:</label>
            <input
              type="number"
              id="isbn"
              minlength="10"
              maxlength="13"
              step="1"
              v-model="book.isbn"
              required
            />
          </div>
        </div>
        <div class="container-image">
          <div class="container-selector">
            <input
              type="file"
              id="select-image"
              accept="image/*"
              @change="fileSelected"
            />
            <label for="select-image" class="selector">Imagen</label>
            <span class="name-file">{{ this.file.name }}</span>
          </div>
          <label for="select-image">
            <img
              :src="book.poster"
              :style="{ border: border }"
              :alt="book.title"
              onerror="this.onerror=null; this.src='https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d'"
              @error="this.border = '.1rem solid var(--border-input)'"
            />
          </label>
        </div>
      </div>
      <div class="second-container">
        <div class="containter-input">
          <label for="resume">Sinopsis:</label>
          <textarea type="text" id="resume" v-model="book.resume" required />
        </div>
        <div class="buttons">
          <button @click="cancel" class="sub-button">Cancelar</button>
          <button type="submit" class="main-button">Guardar</button>
        </div>
      </div>
    </form>
    <Confirmation
      :msg="modalUpdate.message"
      :animation="modalUpdate.animation"
      :successMsg="modalUpdate.successMsg"
      :errorMsg="modalUpdate.errorMsg"
      :finish="modalUpdate.finish"
      :error="modalUpdate.error"
      v-show="modalUpdate.visible"
      @accept="updateBook"
      @close="modalUpdate.visible = false"
    />
    <Confirmation
      :msg="modalDelete.message"
      :animation="modalDelete.animation"
      :successMsg="modalDelete.successMsg"
      :errorMsg="modalDelete.errorMsg"
      :finish="modalDelete.finish"
      :error="modalDelete.error"
      v-show="modalDelete.visible"
      @accept="deleteBook"
      @close="modalDelete.visible = false"
    />
  </div>
</template>
 
 <script>
import { app } from "../utils/firebaseConfig";
import Confirmation from "@/components/Confirmation.vue";
import gql from "graphql-tag";

export default {
  name: "UpdateBook",
  components: {
    Confirmation,
  },
  data() {
    return {
      id: null,
      file: {
        name: null,
      },
      border: ".1rem solid transparent",
      book: {
        title: null,
        author: null,
        year: null,
        category: null,
        editorial: null,
        status: null,
        isbn: null,
        poster:
          "https://firebasestorage.googleapis.com/v0/b/proyectociclo4-447aa.appspot.com/o/NotFound.svg?alt=media&token=1d1ae5f3-146d-4edf-bb6a-5fff39c6b96d",
        resume: null,
      },
      categories: [],
      status: [
        { value: 1, name: "En Stock" },
        { value: 2, name: "En Proceso" },
        { value: 3, name: "En Prestamo" },
      ],
      modalUpdate: {
        visible: false,
        message: "¿Actualizar Registro?",
        animation: false,
        successMsg: "¡Registro Actualizado!",
        errorMsg: "¡Algo Fallo!",
        finish: false,
        error: false,
      },
      modalDelete: {
        visible: false,
        message: "¿Eliminar Registro?",
        animation: false,
        successMsg: "¡Registro Eliminado!",
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
    InventoriesDetail: {
      query: gql`
        query InventoriesDetail {
          inventoriesDetail {
            category
          }
        }
      `,
      update: (data) => data.inventoriesDetail,
      result() {
        this.loadCategories();
      },
    },
  },
  methods: {
    getData() {
      this.book = JSON.parse(JSON.stringify(this.InventoryDetailById));
      if(this.book == null || this.book == undefined){
      this.$router.push({
          name: "NotFound",
          params: { catchAll: "NotFound" },
        });}else{
      this.updateBorder();
      }
    },
    fileSelected(e) {
      this.file = e.target.files[0];
      this.updateBorder();
      const objectURL = URL.createObjectURL(this.file);
      this.book.poster = objectURL;
    },
    updateBorder() {
      if (this.file.name == null) {
        this.border = ".1rem solid var(--border-input)";
      } else {
        this.border = ".1rem solid transparent";
      }
    },
    cancel() {
      let history = window.history.back();
      if (history == "/") {
        this.$router.push({ name: "Home" });
      } else {
        this.$router.push({ name: "Inventory" });
      }
      window.scrollTo(0, 0);
    },
    loadCategories() {
      this.InventoriesDetail.forEach((element) => {
        if (!this.categories.includes(element.category)) {
          this.categories.push(element.category);
        }
      });
    },
    async saveInfoBooks(book) {
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
          variables: {
            inventoryId: this.id,
            inventoryUpdateInput: book,
          },
        })
        .then((result) => {
          this.modalUpdate.animation = false;
          this.modalUpdate.finish = true;
          setTimeout(() => {
            this.modalUpdate.visible = false;
            this.$apollo.queries.InventoriesDetail.refetch();
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((error) => {
          this.modalUpdate.error = true;
          setTimeout(() => {
            this.modalUpdate.visible = false;
          }, 2000);
        });
    },
    async saveImage() {
      const storageRef = app.storage().ref();
      const filePath = storageRef.child(this.book.title);
      await filePath.put(this.file);
      this.book.poster = await filePath.getDownloadURL();
    },
    updateProcess() {
      this.modalUpdate.visible = true;
    },
    deleteProcess() {
      this.modalDelete.visible = true;
    },
    async updateBook() {
      this.modalUpdate.animation = true;
      if (this.file.name != null) {
        await this.saveImage();  
      }
      
      const book = {
        title: this.titleCase(this.book.title),
        author: this.book.author,
        year: this.book.year,
        category: this.book.category,
        editorial: this.book.editorial,
        status: this.book.status,
        isbn: this.book.isbn.toString(),
        poster: this.book.poster,
        resume: this.book.resume,
      };
      this.saveInfoBooks(book);
    },
    async deleteBook() {
      this.modalDelete.animation = true;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation DelInventory($inventoryId: String!) {
              delInventory(inventoryId: $inventoryId)
            }
          `,
          variables: {
            inventoryId: this.id
          },
        })
        .then((result) => {
          this.modalDelete.animation = false;
          this.modalDelete.finish = true;
          setTimeout(() => {
            this.modalDelete.visible = false;
            this.$apollo.queries.InventoriesDetail.refetch();
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((error) => {
          this.modalDelete.error = true;
          setTimeout(() => {
            this.modalDelete.visible = false;
          }, 2000);
        });
    },
    titleCase(string) {
      var sentence = string.toLowerCase().split(" ");
      for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
      return sentence.join(" ");
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
}
@media only screen and (min-width: 750px) and (max-width: 1024px) {
  .component {
    margin: 0 16vw;
  }
  h1 {
    justify-content: space-between;
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
}
@media only screen and (max-width: 550px) {
  .buttons {
    align-self: center;
    width: 100%;
    justify-content: space-around;
  }
  .buttons button {
    width: 50%;
  }
  h1 {
    justify-content: center;
  }
}
h1 {
  display: flex;
  gap: 1rem;
  align-items: center;
  white-space: nowrap;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.first-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  /* padding-bottom: 3rem; */
}
label {
  align-self: flex-start;
}
img {
  height: 26rem;
  width: 17rem;
  border-radius: 1rem;
}
input {
  border: 0.1rem solid var(--border-input);
  text-align: initial;
  padding: 0 0.5rem;
}
select {
  height: 2rem;
  border: 0.1rem solid var(--border-input);
  border-radius: var(--radius);
  outline: 0;
  padding: 0 0.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url(../icons/arrow_drop_down.svg);
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}
option:checked {
  background-color: var(--color-dark);
  color: var(--color-clear);
}
textarea {
  border: 0.1rem solid var(--border-input);
  border-radius: var(--radius);
  padding: 0.5rem;
  text-align: initial;
  resize: none;
  height: 30vh;
  outline: 0;
}
textarea::-webkit-scrollbar {
  height: 1rem;
  width: 1rem;
}

textarea::-webkit-scrollbar-corner {
  background-color: transparent;
}
textarea::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: var(--bg-main-button);
  border: 0.1rem solid transparent;
  border-radius: 1rem;
}
.containter-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 1rem;
}
.buttons {
  display: flex;
  gap: 1rem;
  align-self: flex-end;
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
#year,
#isbn {
  padding: 0 0 0 0.5rem;
  background-image: url(../icons/arrows_scroll.svg);
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}
#year::-webkit-inner-spin-button,
#isbn::-webkit-inner-spin-button {
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
</style>