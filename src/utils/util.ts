import { isArray } from "@/utils/is";

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
    const value = window.localStorage.getItem(key);
    try {
        return JSON.parse(window.localStorage.getItem(key) as string);
    } catch (error) {
        return value;
    }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
    window.localStorage.removeItem(key);
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
    window.localStorage.clear();
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
// export function isObjectValueEqual(
//     a: { [key: string]: any },
//     b: { [key: string]: any }
// ) {
//     if (!a || !b) return false;
//     const aProps = Object.getOwnPropertyNames(a);
//     const bProps = Object.getOwnPropertyNames(b);
//     if (aProps.length != bProps.length) return false;
//     for (let i = 0; i < aProps.length; i++) {
//         const propName = aProps[i];
//         const propA = a[propName];
//         const propB = b[propName];
//         if (!b.hasOwnProperty(propName)) return false;
//         if (propA instanceof Object) {
//             if (!isObjectValueEqual(propA, propB)) return false;
//         } else if (propA !== propB) {
//             return false;
//         }
//     }
//     return true;
// }

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
    const num = Math.floor(Math.random() * (min - max) + max);
    return num;
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
    const browserLang = navigator.language
        ? navigator.language
        : navigator.browserLanguage;
    let defaultBrowserLang = "";
    if (
        browserLang.toLowerCase() === "cn" ||
        browserLang.toLowerCase() === "zh" ||
        browserLang.toLowerCase() === "zh-cn"
    ) {
        defaultBrowserLang = "zh";
    } else {
        defaultBrowserLang = "en";
    }
    return defaultBrowserLang;
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 所有菜单列表
 * @param {String} path 当前访问地址
 * @return array
 */
export function filterCurrentRoute(menuList: Menu.MenuOptions[], path: string) {
    let result = {};
    for (const item of menuList) {
        if (item.path === path) return item;
        if (item.children) {
            const res = filterCurrentRoute(item.children, path);
            if (Object.keys(res).length) result = res;
        }
    }
    return result;
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
    const newMenuList: Menu.MenuOptions[] = JSON.parse(
        JSON.stringify(menuList)
    );
    return newMenuList.reduce(
        (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
            let flatArr = [...pre, current];
            if (current.children)
                flatArr = [...flatArr, ...getFlatArr(current.children)];
            return flatArr;
        },
        []
    );
}

/**
 * @description 使用递归，过滤需要缓存的路由（暂时没有使用）
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
export function getKeepAliveRouterName(
    menuList: Menu.MenuOptions[],
    keepAliveArr: string[] = []
) {
    menuList.forEach((item) => {
        item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name);
        item.children?.length &&
            getKeepAliveRouterName(item.children, keepAliveArr);
    });
    return keepAliveArr;
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
    const newMenuList: Menu.MenuOptions[] = JSON.parse(
        JSON.stringify(menuList)
    );
    return newMenuList.filter((item) => {
        item.children?.length &&
            (item.children = getShowMenuList(item.children));
        return !item.meta?.isHide;
    });
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return array
 */
export function getMenuListPath(
    menuList: Menu.MenuOptions[],
    menuPathArr: string[] = []
) {
    menuList.forEach((item: Menu.MenuOptions) => {
        typeof item === "object" && item.path && menuPathArr.push(item.path);
        item.children?.length && getMenuListPath(item.children, menuPathArr);
    });
    return menuPathArr;
}

/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (
    menuList: Menu.MenuOptions[],
    result: { [key: string]: any } = {},
    parent = []
) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item];
        if (item.children)
            getAllBreadcrumbList(item.children, result, result[item.path]);
    }
    return result;
};

/**
 * @description 格式化表格单元格默认值(el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue))
        return callValue.length ? callValue.join(" / ") : "--";
    return callValue ?? "--";
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue))
        return callValue.length ? callValue.join(" / ") : "--";
    return callValue ?? "--";
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(
    row: { [key: string]: any },
    prop: string
) {
    if (!prop.includes(".")) return row[prop] ?? "--";
    prop.split(".").forEach((item) => (row = row[item] ?? "--"));
    return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
    const propArr = prop.split(".");
    if (propArr.length == 1) return prop;
    return propArr[propArr.length - 1];
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
    callValue: any,
    enumData: any[] | undefined,
    fieldNames?: { label: string; value: string },
    type?: string
): string {
    const value = fieldNames?.value ?? "value";
    const label = fieldNames?.label ?? "label";
    let filterData: { [key: string]: any } = {};
    if (Array.isArray(enumData))
        filterData = enumData.find((item: any) => item[value] === callValue);
    if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
    return filterData ? filterData[label] : "--";
}
