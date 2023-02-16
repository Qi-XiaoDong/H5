<script setup lang="ts" name="RjPagination">
interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
}

interface PaginationProps {
    pageable: Pageable;
}

// 组件接收参数
const props = defineProps<PaginationProps>();
// 暴露内部方法
const emit = defineEmits<{
    (e: "handleSizeChange", page: number, size: number): void;
    (e: "handleCurrentChange", currentPage: number, pageSize: number): void;
}>();

/**
 *监听页码改变
 * @param page
 * @param size
 */
const handleCurrentChange = (page: number, size: number) => {
    emit("handleCurrentChange", page, size);
};

/**
 *监听pageSize改变
 * @param currentPage
 * @param pageSize
 */
const handleSizeChange = (currentPage: number, pageSize: number) => {
    emit("handleSizeChange", currentPage, pageSize);
};
</script>

<template>
    <!-- 分页组件 -->
    <a-pagination
        :total="pageable.total"
        :current="pageable.pageNum"
        :pageSize="pageable.pageSize"
        @change="handleCurrentChange"
        @showSizeChange="handleSizeChange"
        show-quick-jumper
        show-less-items
        hideOnSinglePage
    />
</template>

<style lang="less" scoped></style>
