"use client";

import { useSearchParams } from "next/navigation";
import type { Prettify, QueryParamsResult } from "../types";
import { useMemo } from "react";

export const useRouteSearchParams = <const T extends string[]>(
  paths: T
): Prettify<QueryParamsResult<T>> => {
  const params = useSearchParams();

  return useMemo(() => {
    return paths.reduce<Record<string, string | string[] | undefined>>(
      (result, path) => {
        const is_array_param = path.endsWith("[]");
        const key = is_array_param ? path.slice(0, -2) : path;

        if (is_array_param) {
          const values = params.getAll(key);
          result[key] = values.length > 0 ? values : undefined;
        } else {
          const value = params.get(path);
          result[key] = typeof value === "string" ? value : undefined;
        }

        return result;
      },
      {}
    ) as QueryParamsResult<T>;
  }, [paths, params]);
};
