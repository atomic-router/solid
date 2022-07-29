import type { RouteInstance, RouteParams } from 'atomic-router';
import { useStoreMap } from 'effector-solid';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { useRouter } from './router-provider';

type RouteProps<Params extends RouteParams> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component;
};

export function Route<Params>(props: RouteProps<Params>) {
  const router = useRouter();

  const activeRoutes = router.$activeRoutes;

  const isOpened = useStoreMap({
    store: activeRoutes,
    keys: [props.route],
    fn: (activeRoutes, [route]) => {
      return Array.isArray(route)
        ? route.some((route) => activeRoutes.includes(route))
        : activeRoutes.includes(route);
    },
  });

  return (
    <Show when={isOpened()}>
      <Dynamic component={props.view} />
    </Show>
  );
}
