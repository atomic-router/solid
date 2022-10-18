import { createRoutesView, Route, RouterProvider } from 'atomic-router-solid';

import { HomePage } from '../pages/home';
import { NotFound } from '../pages/not-found';
import { PostsList } from '../pages/posts-list';
import { PostsSingle } from '../pages/posts-single';
import { Layout } from '../shared/ui/layout';

import { router } from './routing';

const RoutesView = createRoutesView({
  routes: [
    { route: HomePage.route, view: HomePage.Page, layout: Layout },
    { route: PostsList.route, view: PostsList.Page, layout: Layout },
    { route: PostsSingle.route, view: PostsSingle.Page },
  ],
  otherwise: NotFound.Page,
});

export const App = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
