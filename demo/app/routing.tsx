import { createHistoryRouter } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { HomePage } from '../pages/home';
import { NotFound } from '../pages/not-found';
import { PostsList } from '../pages/posts-list';
import { PostsSingle } from '../pages/posts-single';

export const routes = [
  { path: '/', route: HomePage.route },
  { path: '/posts', route: PostsList.route },
  { path: '/posts/:slug', route: PostsSingle.route },
  { path: '/404', route: NotFound.route },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({
  routes,
});

router.setHistory(history);

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFound.route.open,
});
