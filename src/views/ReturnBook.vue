<template>
  <button @click="buttonClicked" v-show="mainButton" class="main-button">{{ buttonTxt }}</button>
  <Confirmation
      :msg="modal.message"
      :animation="modal.animation"
      :successMsg="modal.successMsg"
      :errorMsg="modal.errorMsg"
      :finish="modal.finish"
      :error="modal.error"
      v-show="modal.visible"
      @accept="proccessBook"
      @close="modal.visible = false"
    />
</template>

<script>
import Confirmation from "@/components/Confirmation.vue";
import gql from "graphql-tag";

export default {
  name: "ReturnBook",
  components: {
    Confirmation,
  },
  data() {
    return {
      buttonTxt: null,
      idUser: this.$route.params.idUser,
      idBook: this.$route.params.idBook,
      userStatus : false,
      mainButton: false,
      user: {
        username: null,
        firstname: null,
        lastname: null,
        email: null,
        address: null,
        phone: null,
        cantlib: null,
      },
      modal: {
        visible: false,
        message: "",
        animation: false,
        successMsg: "",
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
            status
          }
        }
      `,
      variables() {
        return {
          inventoryId: this.idBook,
        };
      },
      update: (data) => data.inventoryDetailById,
      result() {
        this.getData();
      },
    },
  },
  methods: {
    async getData() {
    if(this.userStatus){
    this.mainButton = true;
      this.buttonTxt =
        this.InventoryDetailById.status == 2
          ? "Aprobar Prestamo"
          : "Generar Devolución";
    if(this.InventoryDetailById.status == 2){
    this.modal.message= "¿Aprobar el Prestamo?";
    this.modal.successMsg="¡Prestamo Aprobado!";
    }else{
    this.modal.message= "¿Devolver el Prestamo?";
    this.modal.successMsg="¡Libro Devuelto!";
    }
    }},
    async getDataUser() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UserDetailByIdAdmin($userId: Int!) {
              userDetailByIdAdmin(userId: $userId) {
                username
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
            userId: parseInt(this.idUser),
          },
        })
        .then((result) => {
          let results = result.data.userDetailByIdAdmin;
          this.user.username = results.username;
          this.user.firstname = results.firstname;
          this.user.lastname = results.lastname;
          this.user.address = results.address;
          this.user.phone = results.phone;
          this.user.email = results.email;
          this.user.cantlib = parseInt(results.cantlib);
          this.userStatus = true;
          this.getData();
        })
        .catch((error) => {});
    },
    async updateUserByAdmin() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdateUserByAdmin($userId: Int!, $userInput: UpdateInput) {
              updateUserByAdmin(userId: $userId, userInput: $userInput) {
                firstname
                lastname
              }
            }
          `,
          variables: {
            userId: parseInt(this.idUser),
            userInput: {
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              address: this.user.address,
              phone: this.user.phone,
              email: this.user.email,
              cantlib: this.user.cantlib - 1,
            },
          },
        })
        .then((result) => {
        })
        .catch((error) => {
        this.modal.error = true;
        setTimeout(() => {
    this.modal.visible = false;
    this.$router.push({name: "Home"});
    }, 2000);
        });
    },
    async saveInfoBooks(newStatus) {
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
            inventoryId: this.idBook,
            inventoryUpdateInput: {status:newStatus},
          },
        })
        .then((result) => {
            this.$apollo.queries.InventoriesDetail.refetch();
        })
        .catch((error) => {
        this.modal.error = true;
        setTimeout(() => {
    this.modal.visible = false;
    this.$router.push({name: "Home"});
    }, 2000);
        });
    },
    buttonClicked() {
    this.modal.visible = true;
      
    },
    proccessBook(){
    this.modal.animation = true;
    if (this.InventoryDetailById.status == 2) {
        this.provideBook();
      } else {
        this.returnBook();
      }
    },
    async provideBook() {
    await this.saveInfoBooks(3);
    this.this.proccessFinal();
    },
    async returnBook() {
    await this.updateUserByAdmin();
    await this.saveInfoBooks(1);
    this.proccessFinal();
    },
    proccessFinal(){
    this.animation = false;
    this.modal.finish = true;
    setTimeout(() => {
    this.modal.visible = false;
    this.$router.push({name: "Home"});
    }, 2000);
    }

  },
  mounted() {
    this.getDataUser();
  },
};
</script>

<style scoped>
</style>