import { createEffect } from 'effector';

const slugs = ['foo', 'bar', 'baz'];

const posts = {
  foo: { slug: 'foo', title: 'Foo post', text: 'Hoho you found me!' },
  bar: { slug: 'bar', title: 'Bar post', text: 'Hoho you found me!' },
  baz: { slug: 'baz', title: 'Baz post', text: 'Hoho you found me!' },
} as const;

type Post = typeof posts[keyof typeof posts];

const getPostsFx = createEffect(() => {
  return new Promise<Post[]>((resolve) =>
    setTimeout(
      resolve,
      1000,
      slugs.map((slug) => posts[slug])
    )
  );
});

const getPostFx = createEffect((slug: string) => {
  return new Promise<Post>((resolve, reject) =>
    setTimeout(() => {
      if (slug in posts) {
        return resolve(posts[slug]);
      }
      reject(new Error());
    }, 1000)
  );
});

export const PostsApi = {
  getPostsFx,
  getPostFx,
};
