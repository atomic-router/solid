import type { RouteInstance } from 'atomic-router';
import { combine } from 'effector';
import { useUnit } from 'effector-solid';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const createRouteView = <Props,>(
  route: RouteInstance<any> | RouteInstance<any>[],
  View: Component<Props>
) => {
  const $isOpened = Array.isArray(route)
    ? combine(combine(route.map((r) => r.$isOpened)), (isOpened) =>
        isOpened.includes(true)
      )
    : route.$isOpened;

  return (props: Props) => {
    const isOpened = useUnit($isOpened);

    return (
      <Show when={isOpened()} keyed={false}>
        <Dynamic component={View} {...props} />
      </Show>
    );
  };
};
