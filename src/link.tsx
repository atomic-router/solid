import {
  buildPath,
  RouteInstance,
  RouteParams,
  RouteQuery,
} from 'atomic-router';
import cc from 'classcat';
import { useUnit } from 'effector-solid';
import { createMemo, JSX, mergeProps, Show, splitProps } from 'solid-js';

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

  const [_, normal] = splitProps(props, [
    'to',
    'params',
    'query',
    'activeClass',
    'inactiveClass',
    'href',
  ]);

  return (
    <Show
      when={toIsString()}
      fallback={<RouteLink {...props} to={props.to as RouteInstance<Params>} />}
      keyed={false}>
      <NormalLink href={props.to as string} {...normal} />
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
  const [split, rest] = splitProps(props, [
    'to',
    'params',
    'query',
    'class',
    'activeClass',
    'inactiveClass',
  ]);
  const router = useRouter();
  const routeObj = router.routes.find(
    (routeObj) => routeObj.route === split.to
  );

  if (!routeObj) {
    throw new Error('[RouteLink] Route not found');
  }

  const isOpened = useUnit(routeObj.route.$isOpened);

  const href = createMemo(() =>
    buildPath({
      pathCreator: routeObj.path,
      params: split.params || {},
      query: split.query || {},
    })
  );

  const classes = createMemo(() => {
    const combined = cc([
      split.class,
      isOpened() ? split.activeClass : split.inactiveClass,
    ]);

    return combined === '' ? undefined : combined;
  });

  return (
    <a
      href={href()}
      class={classes()}
      onClick={(evt) => {
        evt.preventDefault();
        split.to.navigate({
          params: props.params || ({} as Params),
          query: props.query || {},
        });
        if (rest.onClick) {
          if (typeof rest.onClick === 'function') {
            rest.onClick(evt);
          } else {
            rest.onClick[0](evt, rest.onClick[1]);
          }
        }
      }}
      {...rest}>
      {props.children}
    </a>
  );
}
