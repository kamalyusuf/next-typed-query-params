# next-typed-query-params

Type-safe query params for Next.js. Works with both App Router and Pages Router.

## Install

```bash
npm install next-typed-query-params
# or
yarn add next-typed-query-params
# or
pnpm add next-typed-query-params
# or
bun add next-typed-query-params
```

## Usage

### App Router

```typescript
// app/search/page.tsx
import { useRouteSearchParams } from "next-typed-query-params/app";

export default function SearchPage() {
  const { q, tags, page } = useRouteSearchParams(["q", "tags[]", "page"]);

  // URL: /search?q=react&tags=frontend&tags=typescript&page=1
  // Result: { q: "react", tags: ["frontend", "typescript"], page: "1" }
}
```

```typescript
// app/users/[id]/page.tsx
import { useRouteParams } from "next-typed-query-params/app";

export default function UserPage() {
  const { id } = useRouteParams(["id"]);

  return <div>User ID: {id}</div>;
}
```

### Pages Router

```typescript
// pages/search.tsx
import { useQueryParams } from "next-typed-query-params/pages";

export default function SearchPage() {
  const { q, tags, page } = useQueryParams(["q", "tags[]", "page"]);

  // Result: { q: string | undefined, tags: string[] | undefined, page: string | undefined }
}
```

## Array params

Add `[]` to get arrays:

```typescript
const { tags } = useRouteSearchParams(["tags[]"]);
// tags: string[] | undefined
```

## That's it

- `useRouteParams` - route parameters (`/users/[id]`)
- `useRouteSearchParams` - search parameters (`?q=hello`)
- `useQueryParams` - both route and search params (Pages Router)

All parameters are `string | undefined` or `string[] | undefined` for arrays.
