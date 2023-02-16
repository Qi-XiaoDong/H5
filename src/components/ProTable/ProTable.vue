<template>
    <!-- 搜索区域 -->
    <!-- 表格内容 card -->
    <div class="card table-main">
        <!-- 表格头部 操作按钮 -->
        <div class="table-header">
            <div class="header-button-lf">
                <!-- 导入 -->
                <r-button type="primary" @click="() => {}"
                    ><template #icon><plus-circle-outlined /></template
                    >导出</r-button
                >
                <!-- 导出 -->
                <a-button type="primary" @click="() => {}"
                    ><template #icon><plus-circle-outlined /></template
                    >导入</a-button
                >
                <slot
                    name="tableHeaderLf"
                    :selectedListIds="selectedListIds"
                    :selectedList="selectedList"
                    :isSelected="isSelected"
                ></slot>
            </div>
            <div class="header-button-ri">
                <slot
                    name="tableHeaderRi"
                    :selectedListIds="selectedListIds"
                    :selectedList="selectedList"
                    :isSelected="isSelected"
                ></slot>
                <!-- 刷新按钮 -->
                <a-button
                    shape="circle"
                    @click="getTableList"
                    v-if="toolButton.refresh"
                >
                    <template #icon>
                        <sync-outlined />
                    </template>
                </a-button>
                <!--预留打印 -->
                <a-button shape="circle" v-if="toolButton.printer">
                    <template #icon>
                        <printer-outlined />
                    </template>
                </a-button>
                <!--表格行高调节按钮 -->
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleChangeTableSize">
                            <a-menu-item
                                v-for="item in ProTableSize"
                                :key="item.value"
                                >{{ item.lable }}</a-menu-item
                            >
                        </a-menu>
                    </template>
                    <a-button shape="circle" v-if="toolButton.rowHeight">
                        <template #icon>
                            <column-height-outlined />
                        </template>
                    </a-button>
                </a-dropdown>
                <!-- 列设置 -->
                <a-button shape="circle" v-if="toolButton.setColumn">
                    <template #icon>
                        <setting-outlined />
                    </template>
                </a-button>
                <!--是否显示搜索区域操作 -->
                <a-button shape="circle" v-if="toolButton.search">
                    <template #icon>
                        <search-outlined />
                    </template>
                </a-button>
            </div>
        </div>
        <!-- 表格主体 -->
        <div class="table-body">
            <a-table
                ref="tableRef"
                v-bind="$attrs"
                :bordered="bordered"
                :columns="tableColumns"
                :pagination="false"
                :data-source="tableData"
                :size="tableSizeRef"
                :rowSelection="_rowSelection"
            >
                <!-- 默认插槽 -->
                <slot></slot>
                <!-- 表格标题 -->
                <template v-slot:title="currentPageData" v-if="!!slots.title">
                    <slot name="title" :currentPageData="currentPageData">
                    </slot>
                </template>
                <!-- 个性化单元格插槽 -->
                <template
                    v-slot:headerCell="{ title, column }"
                    v-if="!!slots.headerCell"
                >
                    <slot name="headerCell" :index="title" :column="column">
                    </slot>
                </template>
                <!-- 个性化单元格插槽 -->
                <template
                    #bodyCell="{ text, record, index, column }"
                    v-if="!!slots.bodyCell"
                >
                    <slot
                        name="bodyCell"
                        :index="index"
                        :column="column"
                        :text="text"
                        :record="record"
                    >
                    </slot>
                </template>
                <!-- 自定义筛选菜单 -->
                <template
                    #customFilterDropdown="FilterDropdownProps"
                    v-if="!!slots.customFilterDropdown"
                >
                    <slot
                        name="customFilterDropdown"
                        :FilterDropdownProps="FilterDropdownProps"
                    >
                    </slot>
                </template>
                <!-- 自定义筛选图标 -->
                <template
                    v-slot:customFilterIcon="{ filtered, column }"
                    v-if="!!slots.customFilterIcon"
                >
                    <slot
                        name="customFilterIcon"
                        :filtered="filtered"
                        :column="column"
                    >
                    </slot>
                </template>

                <!-- 额外的展开行 -->
                <template
                    v-slot:expandedRowRender="{
                        record,
                        index,
                        indent,
                        expanded,
                    }"
                    v-if="!!slots.expandedRowRender"
                >
                    <slot
                        name="expandedRowRender"
                        :record="record"
                        :index="index"
                        :indent="indent"
                        :expanded="expanded"
                    >
                    </slot>
                </template>
                <!-- 表格尾部 -->
                <template v-slot:footer="currentPageData" v-if="!!slots.footer">
                    <slot name="footer" :currentPageData="currentPageData">
                    </slot>
                </template>
                <!-- 表格无数据情况插槽 -->
                <template #emptyText v-if="!!slots.emptyText">
                    <div class="table-empty">
                        <slot name="emptyText">
                            <div>暂无数据</div>
                        </slot>
                    </div>
                </template>
                <!-- 表格总结栏插槽 -->
                <template #summary v-if="!!slots.summary">
                    <slot name="summary"> </slot>
                </template>
            </a-table>
            <!-- 分页组件 -->
        </div>
    </div>
    <!-- 列设置 -->
</template>

<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
    name: "ProTable",
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
import {
    SyncOutlined,
    SettingOutlined,
    ColumnHeightOutlined,
    PrinterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { ref, watch, provide, useSlots, useAttrs } from "vue";
// import { useSelection } from "@/hooks/useSelection";
import {
    filterEnum,
    formatValue,
    handleProp,
    handleRowAccordingToProp,
} from "@/utils/util";
// import SearchForm from "@/components/SearchForm/index.vue";
// import Pagination from "./components/Pagination.vue";
// import ColSetting from "./components/ColSetting.vue";
// import TableColumn from "./components/TableColumn.vue";
// import printJS from "print-js";
import type { TableProps } from "ant-design-vue";
import type { Table } from "ant-design-vue";
import { useTable } from "@/components/ProTable/hooks/useTable";
import type { BreakPoint } from "./components/Grid/interface/interface";
import type { ColumnProps } from "./interface";
import { ProTableSize } from "./constant";
import { useSelection } from "./hooks/useSelection";
import RButton from "@/components/base/RButton/RButton.vue";

/**
 * 继承的不会出现在props中(有类型提示)会通过透传给table组件
 */
interface ProTableProps
    extends Partial<
        Omit<TableProps<any>, "dataSource" | "pagination" | "columns">
    > {
    bordered?: boolean;
    size?: TableProps["size"]; // 表格尺寸
    columns: ColumnProps[]; // 列配置项
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的api ==> 非必传
    dataSource?: any[]; // 表格数据源
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    //TODO： 是否显示表格功能按钮 ==> 非必传(目前传递方式不优雅)
    toolButton?: {
        refresh?: boolean;
        printer?: boolean;
        rowHeight?: boolean;
        setColumn?: boolean;
        search?: boolean;
    };
    rowSelection?: TableProps["rowSelection"];
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 得到组件中的插槽
const slots = useSlots();

// 透传到table的属性
const attrs = useAttrs();

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    pagination: false,
    initParam: {},
    border: false,
    toolButton: () => ({
        refresh: true,
        printer: true,
        rowHeight: true,
        setColumn: true,
        search: true,
    }),
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});

// // 是否显示搜索模块
// const isShowSearch = ref(true);
// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof Table>>();
// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } =
    useSelection();

const _rowSelection = props.rowSelection
    ? undefined
    : Object.assign({}, props.rowSelection, {
          onChange: selectionChange,
          preserveSelectedRowKeys: true,
      });
// 表格操作 Hooks
const {
    tableData,
    // pageable,
    // searchParam,
    searchInitParam,
    getTableList,
    // search,
    // reset,
    // handleSizeChange,
    // handleCurrentChange,
} = useTable({
    api: props.requestApi,
    dataSource: props.dataSource,
    initParam: props.initParam,
    isPageable: props.pagination,
    dataCallBack: props.dataCallback,
});

/**
 * 表格密度调整
 */
const tableSizeRef = ref<ProTableProps["size"]>(props.size);
const handleChangeTableSize = (size: any) => {
    tableSizeRef.value = size.key;
};

// 清空选中数据列表
// const clearSelection = () => tableRef.value!.clearSelection();
// // 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });
// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);
// // 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
// const enumMap = ref(new Map<string, { [key: string]: any }[]>());
// provide("enumMap", enumMap);
// const setEnumMap = async (col: ColumnProps) => {
//     if (!col.enum) return;
//     // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
//     if (typeof col.enum !== "function")
//         return enumMap.value.set(col.prop!, col.enum!);
//     const { data } = await col.enum();
//     enumMap.value.set(col.prop!, data);
// };
// 扁平化 columns
// const flatColumnsFunc = (
//     columns: ColumnProps[],
//     flatArr: ColumnProps[] = []
// ) => {
//     columns.forEach(async (col) => {
//         if (col._children?.length)
//             flatArr.push(...flatColumnsFunc(col._children));
//         flatArr.push(col);
//         // 给每一项 column 添加 isShow && isFilterEnum 默认属性
//         col.isShow = col.isShow ?? true;
//         col.isFilterEnum = col.isFilterEnum ?? true;
//         // 设置 enumMap
//         setEnumMap(col);
//     });
//     return flatArr.filter((item) => !item._children?.length);
// };
// flatColumns
// const flatColumns = ref<ColumnProps[]>();
// flatColumns.value = flatColumnsFunc(tableColumns.value);
// 过滤需要搜索的配置项
// const searchColumns = flatColumns.value.filter((item) => item.search?.el);
// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
// searchColumns.forEach((column, index) => {
//     column.search!.order = column.search!.order ?? index + 2;
//     if (
//         column.search?.defaultValue !== undefined &&
//         column.search?.defaultValue !== null
//     ) {
//         searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
//             column.search?.defaultValue;
//     }
// });
// // 排序搜索表单项
// searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);
// // 列设置 ==> 过滤掉不需要设置显隐的列
// const colRef = ref();
// const colSetting = tableColumns.value!.filter((item) => {
//     return (
//         item.type !== "selection" &&
//         item.type !== "index" &&
//         item.type !== "expand" &&
//         item.prop !== "operation"
//     );
// });
// const openColSetting = () => colRef.value.openColSetting();
// // 🙅‍♀️ 不需要打印可以把以下方法删除（目前数据处理比较复杂）
// // 处理打印数据（把后台返回的值根据 enum 做转换）
// const printData = computed(() => {
//     let printDataList = JSON.parse(
//         JSON.stringify(
//             selectedList.value.length ? selectedList.value : tableData.value
//         )
//     );
//     // 找出需要转换数据的列（有 enum || 多级 prop && 需要根据 enum 格式化）
//     let needTransformCol = flatColumns.value!.filter(
//         (item) =>
//             (item.enum || (item.prop && item.prop.split(".").length > 1)) &&
//             item.isFilterEnum
//     );
//     needTransformCol.forEach((colItem) => {
//         printDataList.forEach((tableItem: { [key: string]: any }) => {
//             tableItem[handleProp(colItem.prop!)] =
//                 colItem.prop!.split(".").length > 1 && !colItem.enum
//                     ? formatValue(
//                           handleRowAccordingToProp(tableItem, colItem.prop!)
//                       )
//                     : filterEnum(
//                           handleRowAccordingToProp(tableItem, colItem.prop!),
//                           enumMap.value.get(colItem.prop!),
//                           colItem.fieldNames
//                       );
//             for (const key in tableItem) {
//                 if (tableItem[key] === null)
//                     tableItem[key] = formatValue(tableItem[key]);
//             }
//         });
//     });
//     return printDataList;
// });
// // 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）
// const handlePrint = () => {
//     printJS({
//         printable: printData.value,
//         header:
//             props.title &&
//             `<div style="display: flex;flex-direction: column;text-align: center"><h2>${props.title}</h2></div>`,
//         properties: flatColumns
//             .value!.filter(
//                 (item) =>
//                     item.isShow &&
//                     item.type !== "selection" &&
//                     item.type !== "index" &&
//                     item.type !== "expand" &&
//                     item.prop !== "operation"
//             )
//             .map((item: ColumnProps) => ({
//                 field: handleProp(item.prop!),
//                 displayName: item.label,
//             })),
//         type: "json",
//         gridHeaderStyle:
//             "border: 1px solid #ebeef5;height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;",
//         gridStyle:
//             "border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center",
//     });
// };
// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
    element: tableRef,
    // tableData,
    // searchParam,
    // pageable,
    // getTableList,
    // reset,
    // clearSelection,
    // enumMap,
    // isSelected,
    // selectedList,
    // selectedListIds,
});
</script>
