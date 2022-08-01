import { createRoute } from 'atomic-router';
import { Link } from 'atomic-router-solid';

import { HomePage } from '../home';

const route = createRoute();

const Page = () => {
  return (
    <div>
      <h1>Not found</h1>
      <Link to={HomePage.route}>Back to home</Link>
    </div>
  );
};

export const NotFound = {
  route,
  Page,
};
