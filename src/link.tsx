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
  props = mergeProps({ activeClass: 'active' }, props);

  const toIsString = createMemo(() => typeof props.to === 'string');

  const [routeProps, normalProps] = splitProps(props, [
    'to',
    'params',
    'query',
    'class',
    'activeClass',
    'inactiveClass',
    'href',
  ]);

  return (
    <Show
      when={toIsString()}
      fallback={
        <RouteLink
          {...routeProps}
          {...props}
          to={props.to as RouteInstance<Params>}
        />
      }
      keyed={false}>
      <NormalLink
        href={props.to as string}
        class={props.class}
        {...normalProps}
      />
    </Show>
  );
}

function NormalLink(
  props: { class?: string } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return <a class={cc(props.class)} {...props} />;
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
  props = mergeProps(
    {
      activeClass: 'active',
    },
    props
  );

  const [split, rest] = splitProps(props, [
    'to',
    'params',
    'query',
    'class',
    'activeClass',
    'inactiveClass',
    'onClick',
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
        if (split.onClick) {
          if (typeof split.onClick === 'function') {
            split.onClick(evt);
          } else {
            split.onClick[0](evt, split.onClick[1]);
          }
        }
      }}
      {...rest}>
      {props.children}
    </a>
  );
}
