import { useMemo } from "react";
import { useRouter } from "next/router";

export const useQueryParams = <T extends string>(
  paths: T[]
): { [K in T]?: string } => {
  const { query } = useRouter();

  return useMemo(() => {
    return paths.reduce((params, path) => {
      return {
        ...params,
        [path]: typeof query[path] === "string" ? query[path] : undefined,
      };
    }, {});
  }, [paths, query]);
};

export const useTypedQueryParams = <T extends string>(
  paths: T[]
): { [K in T]?: string } => {
  const { query } = useRouter();

  return useMemo(() => {
    return paths.reduce((params, path) => {
      return {
        ...params,
        [path]: typeof query[path] === "string" ? query[path] : undefined,
      };
    }, {});
  }, [paths, query]);
};

