/**
 * 被其他类型定义所使用的类型，如简单的联合类型封装、简单的结构工具类型等。
 */

type Status<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? "success"
  : "failure";

export interface IPageVO<S extends number, TData = never> {
  status: Status<S>;
  code: S;
  data: TData[];
}
