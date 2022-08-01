import { createRoute } from 'atomic-router';
import { Link } from 'atomic-router-solid';

import { PostsList } from '../posts-list';

const route = createRoute();

const Page = () => {
  return (
    <div>
      <h1>This is home page</h1>
      <Link to={PostsList.route}>Go to posts</Link>
      <br />
      <br />
      <Link to="/asdfasdf">Non-existing page</Link>
    </div>
  );
};

export const HomePage = {
  route,
  Page,
};
