import type { RouteInstance, RouteParams } from 'atomic-router';
import { useUnit } from 'effector-solid';
import type { Component } from 'solid-js';
import { createMemo, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type RouteProps<Params extends RouteParams> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component;
};

export function Route<Params extends RouteParams>(props: RouteProps<Params>) {
  const isOpened = createMemo(() => {
    const route = props.route;

    if (Array.isArray(route)) {
      const allRoutes = useUnit(route.map((route) => route.$isOpened));
      return allRoutes.some((r) => r());
    }

    return useUnit(route.$isOpened)();
  });

  return (
    <Show when={isOpened()} keyed={false}>
      <Dynamic component={props.view} />
    </Show>
  );
}
