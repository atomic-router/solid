import type { RouteInstance } from 'atomic-router';
import { combine } from 'effector';
import { useUnit } from 'effector-solid';
import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { createRouteView } from './create-route-view';

export const createRoutesView = (config: {
  routes: {
    route: RouteInstance<any> | RouteInstance<any>[];
    view: Component<any>;
  }[];
  notFound?: Component<any>;
}) => {
  const views = config.routes.map(({ route, view }) =>
    createRouteView(route, view)
  );
  const $isSomeOpened = combine(
    ...config.routes
      .map(({ route }) => route)
      .flat()
      .map((route) => route.$isOpened),
    // @ts-expect-error
    (...isOpened) => isOpened.some(Boolean)
  );

  const NotFound = config.notFound;

  return () => {
    const isSomeOpened = useUnit($isSomeOpened);

    return (
      <Show when={isSomeOpened()} fallback={<Dynamic component={NotFound!} />}>
        <For each={views}>{(View) => <Dynamic component={View} />}</For>
      </Show>
    );
  };
};
