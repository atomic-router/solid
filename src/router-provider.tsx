import type { createHistoryRouter } from 'atomic-router';
import { createContext, JSX, useContext } from 'solid-js';

type Router = ReturnType<typeof createHistoryRouter>;

export const RouterContext = createContext<Router | null>(null);

export function RouterProvider(props: {
  router: Router;
  children: JSX.Element;
}) {
  return (
    <RouterContext.Provider value={props.router}>
      {props.children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext) as Router;
}
