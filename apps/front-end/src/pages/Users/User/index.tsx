import { LoaderContent, LoaderError, useHash } from "@alextheman/components";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "react-router-dom";

import LoaderProvider from "src/components/LoaderProvider";
import neurosongsNote from "src/images/Neurosongs_note.png";
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
    <LoaderProvider isLoading={isLoading} error={error}>
      <section>
        <LoaderError />
        <Card>
          <LoaderContent>
            <CardMedia>
              <Avatar
                src={neurosongsNote}
                alt={`${user?.artistName}'s profile picture`}
                sx={{ width: 56, height: 56, margin: 2 }}
              />
            </CardMedia>
            <CardHeader title={user?.artistName} />
            <CardContent>{user?.description}</CardContent>
          </LoaderContent>
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
        </Card>
      </section>
    </LoaderProvider>
  );
}

export default UserProfile;
