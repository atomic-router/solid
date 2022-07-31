# Atomic-router-solid

SolidJS bindings for [atomic-router](https://github.com/kelin2025/atomic-router)

## Installation

Install core and solid bindings:

```bash
pnpm i atomic-router atomic-router-solid
```

Don't forget about peer dependencies, if you haven't installed them yet:

```bash
pnpm i effector effector-solid solid-js
```

## Usage

### `RouterProvider` - provides router instance

Wrap your app into this:

```tsx
import { createHistoryRouter } from 'atomic-router'
import { RouterProvider, Route } from 'atomic-router-solid'

import { HomePage } from './routes'

const router = createHistoryRouter({ routes });

const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
};
```

### `Link` - render a link

Simple usage:

```tsx
import { createRoute } from 'atomic-router'
import { Link } from 'atomic-router-solid'

const homeRoute = createRoute<{postId:string}>()
const postRoute = createRoute<{postId:string}>()

<Link to={homeRoute}>Route link</Link>
<Link to={postRoute} params={{ postId:1 }}>Route link with params</Link>
<Link to="https://example.com">External link</Link>
```

All params:

```tsx
import { Link } from 'atomic-router-solid'

<Link
  to={route}
  params={{ foo: 'bar' }}
  query={{ bar: 'baz' }}
  activeClass="font-semibold text-red-400"
  inactiveClass="opacity-80"
/>
```

### `Route` - render route

```tsx
import { Route } from 'atomic-router-solid'

<Route route={homeRoute} view={HomePage} />
```