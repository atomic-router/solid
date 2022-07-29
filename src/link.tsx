import {
  buildPath,
  RouteInstance,
  RouteParams,
  RouteQuery,
} from 'atomic-router';
import cc from 'classcat';
import { useUnit } from 'effector-solid';
import { createMemo, JSX, mergeProps, Show } from 'solid-js';

import { useRouter } from './router-provider';

type Props<Params extends RouteParams> = {
  to: RouteInstance<Params> | string;
  params?: Params;
  query?: RouteQuery;
  activeClass?: string;
  inactiveClass?: string;
} & Exclude<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function Link<Params extends RouteParams>(props: Props<Params>) {
  props = mergeProps(props, {
    activeClass: 'active',
  });

  const toIsString = createMemo(() => typeof props.to === 'string');

  return (
    <Show
      when={toIsString()}
      fallback={
        <RouteLink {...props} to={props.to as RouteInstance<Params>} />
      }>
      <NormalLink {...props} />
    </Show>
  );
}

function NormalLink(
  props: { class?: string } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return <a class={props.class} {...props} />;
}

function RouteLink<Params extends RouteParams>(
  props: {
    to: RouteInstance<Params>;
    params?: Params;
    query?: RouteQuery;
    class?: string;
    activeClass?: string;
    inactiveClass?: string;
  } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const router = useRouter();
  const routeObj = router.routes.find(
    (routeObj) => routeObj.route === props.to
  );

  if (!routeObj) {
    throw new Error('[RouteLink] Route not found');
  }

  const isOpened = useUnit(routeObj.route.$isOpened);

  const href = createMemo(() =>
    buildPath({
      pathCreator: routeObj.path,
      params: props.params || {},
      query: props.query || {},
    })
  );

  return (
    <a
      href={href()}
      class={cc([
        props.class,
        isOpened() ? props.activeClass : props.inactiveClass,
      ])}
      onClick={(evt) => {
        evt.preventDefault();
        props.to.navigate({
          params: props.params || ({} as Params),
          query: props.query || {},
        });
        if (props.onClick) {
          if (typeof props.onClick === 'function') {
            props.onClick(evt);
          } else {
            props.onClick[0](evt, props.onClick[1]);
          }
        }
      }}
      {...props}>
      {props.children}
    </a>
  );
}
