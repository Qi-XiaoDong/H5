<template>
    <RjPagination
        :pageable="pageable"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
    />
</template>

<script setup lang="ts" name="RjPagination">
import { reactive } from "vue";
import RjPagination from "./RjPagination.vue";

/**
 * 页码信息
 */
const pageable = reactive({ pageNum: 2, pageSize: 10, total: 1000 });

/**
 * 每页展示条数变化
 */
const handleSizeChange = (current: number, pagesize: number) => {
    pageable.pageSize = pagesize;
};

/**
 * 页码发生变化
 */
const handleCurrentChange = (currentPage: number, pageSize: number) => {
    pageable.pageNum = currentPage;
};
</script>
