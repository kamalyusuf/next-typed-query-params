import { useMemo } from "react";
import { useRouter } from "next/router";

export const useQueryParams = <T extends string>(paths: T[]) => {
	const { query } = useRouter();

	return useMemo(() => {
		return paths.reduce<{ [K in T]?: string }>((params, path) => {
			if (typeof query[path] === "string") params[path] = query[path] as string;
			else params[path] = undefined;

			return params;
		}, {});
	}, [paths, query]);
};
