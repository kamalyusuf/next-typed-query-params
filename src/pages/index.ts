import { useMemo } from "react";
import { useRouter } from "next/router";
import type { Prettify, QueryParamsResult } from "../types";

export const useQueryParams = <const T extends string[]>(
  paths: T
): Prettify<QueryParamsResult<T>> => {
  const { query } = useRouter();

  return useMemo(() => {
    return paths.reduce<Record<string, string | string[] | undefined>>(
      (params, path) => {
        const is_array_param = path.endsWith("[]");
        const key = is_array_param ? path.slice(0, -2) : path;

        if (is_array_param) {
          const value = query[path];

          if (Array.isArray(value)) params[key] = value;
          else if (typeof value === "string") params[key] = [value];
          else params[key] = undefined;
        } else {
          const value = query[path];
          params[key] = typeof value === "string" ? value : undefined;
        }

        return params;
      },
      {}
    );
  }, [paths, query]) as QueryParamsResult<T>;
};
