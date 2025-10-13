import { useHash } from "@alextheman/components";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "react-router-dom";

import Loader from "src/components/Loader";
import UserAlbums from "src/pages/Users/User/UserAlbums";
import UserSongs from "src/pages/Users/User/UserSongs";
import { useUserQuery } from "src/queries/users";

type TabState = "songs" | "albums";

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  // userId should never be undefined since I know this component will only ever be called from the Router under the /users/:userId endpoint,
  // but this check still needs to be there to satisfy TypeScript.
  if (userId === undefined) {
    throw new Error("USER_ID_PARAMETER_NOT_FOUND");
  }
  const { data: user, isLoading, error } = useUserQuery(userId);
  const [tab, setTab] = useHash<TabState>("songs");

  return (
    <Loader isLoading={isLoading} error={error}>
      <section>
        <h1>{user?.artistName}</h1>
        <Tabs
          value={tab}
          onChange={(_, value) => {
            setTab(value as TabState);
          }}
        >
          <Tab label="Songs" value="songs" />
          <Tab label="Albums" value="albums" />
        </Tabs>
        {{ songs: <UserSongs userId={userId} />, albums: <UserAlbums userId={userId} /> }[tab]}
      </section>
    </Loader>
  );
}

export default UserProfile;
