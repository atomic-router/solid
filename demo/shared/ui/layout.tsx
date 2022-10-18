import type { ParentProps } from 'solid-js';

export function Layout(props: ParentProps) {
  return (
    <div>
      Layout!
      {props.children}
    </div>
  );
}
