<script setup lang="ts">
import { useDishStore } from '@/store/DishStore';
import type { Dish } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    dishId?: string
}>()

const emits = defineEmits<{
    (e: 'add-new-dish', dish: Dish): void,
    (e: 'cancel-edit-dish'): void
}>();

const dishStore = useDishStore();
const targetDish = props.dishId ? dishStore.getDishById(props.dishId) : '';

console.log(targetDish);


const newDish = ref<Dish>({
    id: uuidv4(),
    name: '',
    status: 'Want to Try',
    diet: ''
});

const elDishNameInput = ref<HTMLInputElement | null>(null);

const updateDish = () => {
    targetDish.name = newDish.value.name;
}

onMounted(() => {
    elDishNameInput.value?.focus();
})
</script>

<template>
    <form @submit.prevent>
        <div class="field">
            <div class="field">
                <label for="name" class="label">Edit Name {{ dishId }}</label>
                <div class="control">
                    <input :value="newDish.name" @keyup.enter="updateDish" type="text" class="input is-large"
                        placeholder="Mystery Flavored Shrimp" required ref="elNameInput" />
                </div>
            </div>
            <div class="field">
                <div class="buttons">
                    <button @click="$emit('add-new-dish')" class="button is-success">Create</button>
                    <button @click="$emit('cancel-edit-dish')" class="button is-light">Cancel</button>
                </div>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>

</style>