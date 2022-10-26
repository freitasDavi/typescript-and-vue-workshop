<script lang="ts" setup>
import NewDishForm from '../components/NewDishForm.vue'
import EditDishForm from '@/components/EditDishForm.vue';
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { Dish } from "@/types";
import { onMounted, ref } from 'vue'
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useDishStore } from '@/store/DishStore';

type ShowFormState = '' | 'new' | 'edit'

const dishStore = useDishStore();

const dishList = dishStore.list;

const filterText = ref("");
const showForm = ref<ShowFormState>('');

const filteredDishList = computed(() => {
  return dishList.filter((dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
});

const numberOfDishes = computed(() => {
  return filteredDishList.value.length;
});

const addDish = (payload: Dish) => {
  dishStore.addDish(payload);
  hideForm();
};

const editDishId = ref("");

const editDishForm = (payload: Dish) => {
  showForm.value = 'edit';
  editDishId.value = payload.id;
}

const cancelEdit = () => {
  showForm.value = '';
}

const hideForm = () => {
  showForm.value = '';
};

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value;
}

onMounted(() => {
  const route = useRoute();

  if (route.query.new) {
    showForm.value = 'new';
  } else if (route.query.edit) {
    showForm.value = 'edit';
  }
});
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Dish name" :value="filterText"
                    @keyup.enter="updateFilterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm === 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <!-- EditDish form -->
        <EditDishForm v-else-if="showForm === 'edit'" :dish-id="editDishId" @cancel-edit-dish="cancelEdit" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @delete-dish="dishStore.deleteDish" @edit-dish="editDishForm" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style setup>

</style>
