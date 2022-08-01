import { createRoute } from 'atomic-router';
import { attach, restore, sample } from 'effector';
import { useUnit } from 'effector-solid';
import { Show } from 'solid-js/web';

import { PostsApi } from '../../shared/api/posts';

const route = createRoute<{ slug: string }>();

const getPostFx = attach({
  effect: PostsApi.getPostFx,
});

const $post = restore(getPostFx, null);

sample({
  clock: route.opened,
  fn: ({ params }) => params.slug,
  target: getPostFx,
});

const Page = () => {
  const pending = useUnit(getPostFx.pending);

  return (
    <Show when={!pending()} fallback="Loading...">
      <Post />
    </Show>
  );
};

const Post = () => {
  const post = useUnit($post);

  return (
    <Show when={post()}>
      {(post) => (
        <article>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
        </article>
      )}
    </Show>
  );
};

export const PostsSingle = {
  route,
  Page,
};
