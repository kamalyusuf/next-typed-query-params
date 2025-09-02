"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import type { Prettify, QueryParamsResult } from "../types";

export const useRouteParams = <const T extends string[]>(
  paths: T
): Prettify<QueryParamsResult<T>> => {
  const params = useParams();

  return useMemo(() => {
    return paths.reduce<Record<string, string | string[] | undefined>>(
      (result, path) => {
        const is_array_param = path.endsWith("[]");
        const key = is_array_param ? path.slice(0, -2) : path;

        if (is_array_param) {
          const value = params[path];

          if (Array.isArray(value)) result[key] = value;
          else if (typeof value === "string") result[key] = [value];
          else result[key] = undefined;
        } else {
          const value = params[path];
          result[key] = typeof value === "string" ? value : undefined;
        }

        return result;
      },
      {}
    ) as QueryParamsResult<T>;
  }, [paths, params]);
};
