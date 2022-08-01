import { Route, RouterProvider } from 'atomic-router-solid';

import { HomePage } from '../pages/home';
import { NotFound } from '../pages/not-found';
import { PostsList } from '../pages/posts-list';
import { PostsSingle } from '../pages/posts-single';

import { router } from './routing';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={HomePage.route} view={HomePage.Page} />
      <Route route={PostsList.route} view={PostsList.Page} />
      <Route route={PostsSingle.route} view={PostsSingle.Page} />
      <Route route={NotFound.route} view={NotFound.Page} />
    </RouterProvider>
  );
};
