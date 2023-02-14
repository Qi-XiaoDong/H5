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

<script setup lang="ts" name="RjPagination">
interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (page: number, size: number) => void;
  handleCurrentChange: (currentPage: number, pageSize: number) => void;
}

defineProps<PaginationProps>();
// defineEmits<
//   Pick<PaginationProps, "handleCurrentChange" | "handleSizeChange">
// >();
</script>
