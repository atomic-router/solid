import type { RouteInstance } from 'atomic-router';
import { useUnit } from 'effector-solid';
import { createMemo } from 'solid-js';

export function createIsOpened(
  route: RouteInstance<any> | RouteInstance<any>[]
) {
  return createMemo(() => {
    if (Array.isArray(route)) {
      const allRoutes = useUnit(route.map((route) => route.$isOpened));
      return allRoutes.some((r) => r());
    }

    return useUnit(route.$isOpened)();
  });
}
