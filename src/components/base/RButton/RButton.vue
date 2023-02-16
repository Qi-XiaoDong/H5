<template>
    <a-button v-bind="$attrs">
        <template #icon>
            <slot name="icon"></slot>
        </template>
        <slot></slot>
    </a-button>
</template>

<script lang="ts">
export default {
    name: "RButton",
};
</script>
<script setup lang="ts">
import type { ButtonProps } from "ant-design-vue";
interface IRButton extends ButtonProps {}
withDefaults(defineProps<IRButton>(), {});
</script>
