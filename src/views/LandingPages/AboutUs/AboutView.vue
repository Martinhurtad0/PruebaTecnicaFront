<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Typed from "typed.js";
import sellerService from "@/services/sellerService";

// Componentes
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";

// Imagen de fondo
import bg0 from "@/assets/img/bg9.jpg";

// Estado y referencias
const body = document.getElementsByTagName("body")[0];
const sellers = ref([]);
const newSeller = ref({ name: "", dni: "", phone: "" });
const isEditing = ref(false);
const currentSellerId = ref(null);
const showModal = ref(false);  // Estado para controlar el modal

// Obtener vendedores
const fetchSellers = async () => {
  try {
    const response = await sellerService.getAllSellers();
    sellers.value = response.data;
  } catch (error) {
    console.error("Error al obtener vendedores", error);
  }
};

// Guardar o actualizar vendedor
const saveSeller = async () => {
  try {
    if (isEditing.value) {
      await sellerService.updateSeller(currentSellerId.value, newSeller.value);
    } else {
      await sellerService.createSeller(newSeller.value);
    }
    resetForm();
    fetchSellers();
    showModal.value = false; // Cerrar el modal después de guardar
  } catch (error) {
    console.error("Error al guardar vendedor", error);
  }
};

// Editar vendedor
const editSeller = (seller) => {
  newSeller.value = { ...seller };
  isEditing.value = true;
  currentSellerId.value = seller.id;
  showModal.value = true;  // Abrir el modal al editar
};

// Eliminar vendedor
const deleteSeller = async (id) => {
  if (confirm("¿Estás seguro de eliminar este vendedor?")) {
    try {
      await sellerService.deleteSeller(id);
      fetchSellers();
    } catch (error) {
      console.error("Error al eliminar vendedor", error);
    }
  }
};

// Resetear formulario
const resetForm = () => {
  newSeller.value = { name: "", dni: "", phone: "" };
  isEditing.value = false;
  currentSellerId.value = null;
};

// Hooks
onMounted(() => {
  body.classList.add("about-us", "bg-gray-200");
  fetchSellers();

  if (document.getElementById("typed")) {
    new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us", "bg-gray-200");
});
</script>

<template>
  <DefaultNavbar :action="{ route: 'javascript:;', label: 'Buy Now', color: 'btn-white' }" transparent />

  <header class="bg-gradient-dark">
    <div class="page-header min-vh-75" :style="{ backgroundImage: `url(${bg0})` }">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container text-center">
        <h1 class="text-white">Ventas <span class="text-white" id="typed"></span></h1>
        <div id="typed-strings">
          <h1>team</h1>
          <h1>tester</h1>
          <h1>cloud</h1>
        </div>
      </div>
    </div>
  </header>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <div class="container">
      <h2>Gestión de Vendedores</h2>

      <!-- Botón para abrir el modal -->
      <button @click="showModal = true" class="btn btn-success mb-4">Agregar Vendedor</button>

      <!-- Tabla de vendedores -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="seller in sellers" :key="seller.id">
            <td>{{ seller.id }}</td>
            <td>{{ seller.name }}</td>
            <td>{{ seller.dni }}</td>
            <td>{{ seller.phone }}</td>
            <td>
              <!-- Botones de edición y eliminación -->
              <button @click="editSeller(seller)" class="btn btn-warning btn-sm mr-2">Editar</button>
              <button @click="deleteSeller(seller.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal para crear o editar un vendedor -->
  <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ isEditing ? "Editar Vendedor" : "Agregar Vendedor" }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveSeller">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" id="name" v-model="newSeller.name" required />
            </div>
            <div class="form-group">
              <label for="dni">DNI</label>
              <input type="text" class="form-control" id="dni" v-model="newSeller.dni" required />
            </div>
            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input type="text" class="form-control" id="phone" v-model="newSeller.phone" required />
            </div>
            <button type="submit" class="btn btn-primary">{{ isEditing ? "Actualizar" : "Agregar" }}</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close"
              @click="showModal = false">Cerrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <DefaultFooter />
</template>

<style>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

form input {
  margin: 5px;
  padding: 8px;
  display: block;
  width: 100%;
}


.modal .modal-dialog {
  max-width: 500px;
}

.modal .modal-content {
  padding: 20px;
}
</style>
