type IsArrayParam<T extends string> = T extends `${string}[]` ? true : false;

type RemoveArraySuffix<T extends string> = T extends `${infer U}[]` ? U : T;

type ParamType<T extends string> =
  IsArrayParam<T> extends true ? string[] : string;

export type QueryParamsResult<T extends readonly string[]> = {
  [K in T[number] as RemoveArraySuffix<K>]?: ParamType<K>;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
