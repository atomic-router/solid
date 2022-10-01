import type { RouteInstance, RouteParams } from 'atomic-router';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { createIsOpened } from './create-is-opened';

type RouteProps<Params extends RouteParams> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component;
};

export function Route<Params extends RouteParams>(props: RouteProps<Params>) {
  const isOpened = createIsOpened(props.route);

  return (
    <Show when={isOpened()} keyed={false}>
      <Dynamic component={props.view} />
    </Show>
  );
}
