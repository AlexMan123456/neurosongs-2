import { useHash } from "@alextheman/components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import RecentAlbums from "src/resources/Albums/pages/RecentAlbums";
import RecentSongs from "src/resources/Songs/pages/RecentSongs";

type TabState = "songs" | "albums";

function Recent() {
  const [tab, setTab] = useHash<TabState>("songs");
  return (
    <main>
      <Card>
        <h1>Recent</h1>
        <Tabs
          value={tab}
          onChange={(_, value) => {
            setTab(value as TabState);
          }}
        >
          <Tab label="Songs" value="songs" />
          <Tab label="Albums" value="albums" />
        </Tabs>
        <CardContent>{{ songs: <RecentSongs />, albums: <RecentAlbums /> }[tab]}</CardContent>
      </Card>
    </main>
  );
}

export default Recent;
