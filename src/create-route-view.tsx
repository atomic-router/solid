import type { RouteInstance, RouteParams } from 'atomic-router';
import type { Component } from 'solid-js';
import { Match, mergeProps, Switch } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { createIsOpened } from './create-is-opened';

export interface RouteViewConfig<Props, Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component<Props>;
  otherwise?: Component<Props>;
}

export function createRouteView<
  Props,
  Params extends RouteParams,
  Config extends {
    [key in keyof RouteViewConfig<Props, Params>]?: RouteViewConfig<
      Props,
      Params
    >[key];
  }
>(config: Config) {
  return (
    props: Props & Omit<RouteViewConfig<Props, Params>, keyof Config>
  ) => {
    const mergedConfig = mergeProps(config, props) as RouteViewConfig<
      Props,
      Params
    >;
    const isOpened = createIsOpened(mergedConfig.route);

    return (
      <Switch fallback={null}>
        <Match when={isOpened()} keyed={false}>
          <Dynamic component={mergedConfig.view} {...props} />
        </Match>

        <Match when={mergedConfig.otherwise} keyed={false}>
          <Dynamic component={mergedConfig.otherwise} {...props} />
        </Match>
      </Switch>
    );
  };
}
