import { createRoute } from 'atomic-router';
import { Link } from 'atomic-router-solid';
import { attach, restore, sample } from 'effector';
import { useUnit } from 'effector-solid';
import { For, Show } from 'solid-js/web';

import { PostsApi } from '../../shared/api/posts';
import { PostsSingle } from '../posts-single';

const route = createRoute();

const getPostsFx = attach({
  effect: PostsApi.getPostsFx,
});

const $posts = restore(getPostsFx, []);

sample({
  clock: route.opened,
  target: getPostsFx,
});

const Page = () => {
  return (
    <div>
      <h1>Latest posts</h1>
      <Posts />
    </div>
  );
};

const Posts = () => {
  const pending = useUnit(getPostsFx.pending);

  return (
    <Show when={!pending()} fallback="Loading...">
      <List />
    </Show>
  );
};

const List = () => {
  const posts = useUnit($posts);

  return (
    <For each={posts()}>
      {(post) => (
        <article>
          <h2>{post.title}</h2>
          <Link to={PostsSingle.route} params={{ slug: post.slug }}>
            Go to post
          </Link>
        </article>
      )}
    </For>
  );
};

export const PostsList = {
  route,
  Page,
};
