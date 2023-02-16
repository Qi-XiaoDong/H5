<template>
    <div :style="{ margin: '200px auto', width: 1000 + 'px' }">
        <ProTable
            rowKey="id"
            ref="proTable"
            :columns="columns"
            :initParam="initParam"
            :dataCallback="dataCallback"
            pagination
            :dataSource="dataSource"
        >
            <!-- 表格 header 左侧按钮 -->
            <template #tableHeaderLf="scope">
                <a-button type="primary" @click="addUser(scope)"
                    ><template #icon><plus-circle-outlined /></template
                    >拓展左侧按钮</a-button
                >
            </template>
            <!-- 表格 header 右侧按钮 -->
            <template #tableHeaderRi="scope">
                <a-button type="primary" @click="addUser(scope)"
                    ><template #icon><plus-circle-outlined /></template
                    >新增</a-button
                >
            </template>
        </ProTable>
    </div>
</template>

/**ProTable功能测试页面 */
<script setup lang="ts" name="ProTableTest">
import { reactive, ref } from "vue";
import ProTable from "./ProTable.vue";
import type { ColumnProps } from "./interface/index";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
    type: 1,
});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
    return {
        list: data.list,
        total: data.total,
        pageNum: data.pageNum,
        pageSize: data.pageSize,
    };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    // newParams.username && (newParams.username = "custom-" + newParams.username);
    // return getUserList(newParams);
    return Promise.resolve();
};

const dataSource = [
    {
        id: "12",
        userName: "qxd",
        gender: "男",
        user: {
            detail: {
                age: 12,
            },
        },
        idCard: "123132131",
        email: "121321323132123@qq.cim",
        address: "广州",
        status: "在线",
        createTime: "创建时间",
    },
];
// 表格配置项
const columns: ColumnProps[] = [
    // { fixed: "left", width: 80 },
    // { title: "#", width: 80 },
    // { title: "Expand", width: 100 },
    {
        dataIndex: "userName",
        title: "用户姓名",
        width: 200,
        // search: { el: "input" },
        customRender: (scope) => {
            return 123;
            // <el-button
            //     type="primary"
            //     link
            //     onClick={() =>
            //         ElMessage.success("我是通过 tsx 语法渲染的内容")
            //     }
            // >
            //     {scope.row.username}
            // </el-button>
        },
    },
    {
        dataIndex: "gender",
        title: "性别",
        width: 200,
        // 直接放字典数据
        // enum: genderType,
        // 字典请求不带参数
        // enum: getUserGender,
        // 字典请求携带参数
        // enum: () => getUserGender({ id: 1 }),
        // search: { el: "select", dataIndexs: { filterable: true } },
        // fieldNames: { title: "gendertitle", value: "genderValue" },
    },
    // 多级 dataIndex
    {
        dataIndex: ["user", "detail", "age"],
        title: "年龄",
        search: { el: "input" },
        width: 200,
    },
    {
        dataIndex: "idCard",
        title: "身份证号",
        search: { el: "input" },
        width: 200,
    },
    { dataIndex: "email", title: "邮箱", width: 200 },
    { dataIndex: "address", title: "居住地址", width: 200 },
    {
        dataIndex: "status",
        title: "用户状态",
        width: 200,
        // enum: getUserStatus,
        // search: { el: "tree-select", dataIndexs: { filterable: true } },
        // fieldNames: { title: "usertitle", value: "userStatus" },
        // render: (scope: { row: User.ResUserList }) => {
        //     return (
        //         <>
        //             {BUTTONS.value.status ? (
        //                 <el-switch
        //                     model-value={scope.row.status}
        //                     active-text={scope.row.status ? "启用" : "禁用"}
        //                     active-value={1}
        //                     inactive-value={0}
        //                     onClick={() => changeStatus(scope.row)}
        //                 />
        //             ) : (
        //                 <el-tag type={scope.row.status ? "success" : "danger"}>
        //                     {scope.row.status ? "启用" : "禁用"}
        //                 </el-tag>
        //             )}
        //         </>
        //     );
        // },
    },
    {
        dataIndex: "createTime",
        title: "创建时间",
        // headerRender,
        width: 180,
        // search: {
        //     el: "date-picker",
        //     span: 2,
        //     dataIndexs: {
        //         type: "datetimerange",
        //         valueFormat: "YYYY-MM-DD HH:mm:ss",
        //     },
        //     defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
        // },
    },
    { dataIndex: "operation", title: "操作", fixed: "right", width: 330 },
];

const addUser = (props: any) => {
    console.log(props);
};
</script>
<Style></Style>
