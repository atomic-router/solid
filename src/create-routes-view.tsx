import type { RouteInstance, RouteParams } from 'atomic-router';
import {
  Component,
  createMemo,
  JSXElement,
  Match,
  mergeProps,
  Switch,
} from 'solid-js';
import { Dynamic, For, Show } from 'solid-js/web';

import { createIsOpened } from './create-is-opened';

interface RouteRecord<Props, Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component<Props>;
  layout?: Component<{ children: JSXElement }>;
}

export interface RoutesViewConfig {
  routes: RouteRecord<any, any>[];
  otherwise?: Component<any>;
}

export function createRoutesView<Config extends RoutesViewConfig>(
  config: Config
) {
  return (props: Omit<Config, keyof Config>) => {
    const mergedConfig = mergeProps(config, props) as Config;
    const routes = createMemo(() =>
      mergedConfig.routes.map((routeRecord) => {
        const isOpened = createIsOpened(routeRecord.route);
        return {
          ...routeRecord,
          get isOpened() {
            return isOpened();
          },
        };
      })
    );

    return (
      <Switch fallback={null}>
        <For each={routes()}>
          {(route) => (
            <Match when={route.isOpened} keyed={false}>
              <Show
                when={route.layout}
                keyed
                fallback={<Dynamic component={route.view} />}>
                {(Layout) => (
                  <Dynamic component={Layout}>
                    <Dynamic component={route.view} />
                  </Dynamic>
                )}
              </Show>
            </Match>
          )}
        </For>

        <Match when={mergedConfig.otherwise} keyed={false}>
          <Dynamic component={mergedConfig.otherwise} />
        </Match>
      </Switch>
    );
  };
}
