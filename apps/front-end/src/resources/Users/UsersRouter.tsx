import { Route } from "react-router-dom";

import User from "src/resources/Users/pages/User";

function UsersRouter() {
  return (
    <Route path="/users">
      <Route path=":userId" element={<User />} />
    </Route>
  );
}

export default UsersRouter;
