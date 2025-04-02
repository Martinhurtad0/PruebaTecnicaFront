<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//material components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
});

// State variables for product form and table
const productName = ref("");
const productDescription = ref("");
const productBrand = ref("");
const productPrice = ref("");
const productStock = ref("");
const sellerId = ref("");

const products = ref([]); // To store fetched products

// Function to fetch products from the backend
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/product");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to handle product creation
const createProduct = async () => {
  try {
    const product = {
      name: productName.value,
      description: productDescription.value,
      brand: productBrand.value,
      price: parseFloat(productPrice.value),
      stock: parseInt(productStock.value),
      sellerId: parseInt(sellerId.value)
    };

    const response = await axios.post("http://localhost:8080/api/product", product);
    console.log("Product created successfully:", response.data);
    fetchProducts(); // Refresh the product list after creation
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Call the fetch function when the component is mounted
onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <DefaultNavbar :sticky="true" :action="{
          route: 'https://www.creative-tim.com/product/vue-material-kit-pro',
          color: 'bg-gradient-success',
          label: 'Buy Now',
        }" />
      </div>
    </div>
  </div>

  <section>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <!-- Product Form Section -->
          <div class="mt-8 col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
            <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-gradient-success shadow-success border-radius-lg p-3">
                  <h3 class="text-white text-success mb-0">Create Product</h3>
                </div>
              </div>
              <div class="card-body">
                <form id="product-form" method="post" autocomplete="off" @submit.prevent="createProduct">
                  <div class="card-body p-0 my-3">
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput v-model="productName" class="input-group-static mb-4" type="text"
                          label="Product Name" placeholder="Enter product name" />
                      </div>
                      <div class="col-md-6 ps-md-2">
                        <MaterialInput v-model="productBrand" class="input-group-static mb-4" type="text" label="Brand"
                          placeholder="Enter product brand" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <MaterialTextArea v-model="productDescription" class="input-group-static mb-4" :rows="6"
                          placeholder="Enter product description">Product description</MaterialTextArea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput v-model="productPrice" class="input-group-static mb-4" type="number"
                          label="Price" placeholder="Enter product price" />
                      </div>
                      <div class="col-md-6 ps-md-2">
                        <MaterialInput v-model="productStock" class="input-group-static mb-4" type="number"
                          label="Stock" placeholder="Enter product stock" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <MaterialInput v-model="sellerId" class="input-group-static mb-4" type="number"
                          label="Seller ID" placeholder="Enter seller ID" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <MaterialButton variant="gradient" color="success" class="mt-3 mb-0">Create Product
                        </MaterialButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Product Table Section -->
          <div class="col-12">
            <div class="card">
              <div class="card-header bg-gradient-success">
                <h5 class="text-white">Product List</h5>
              </div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Seller ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products" :key="product.id">
                      <td>{{ product.name }}</td>
                      <td>{{ product.brand }}</td>
                      <td>{{ product.price }}</td>
                      <td>{{ product.stock }}</td>
                      <td>{{ product.sellerId }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <DefaultFooter />
</template>
