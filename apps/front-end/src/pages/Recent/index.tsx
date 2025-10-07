import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";

import RecentAlbums from "src/pages/Recent/RecentAlbums";
import RecentSongs from "src/pages/Recent/RecentSongs";

type TabState = "songs" | "albums";

function Recent() {
  const [tab, setTab] = useState<TabState>("songs");
  return (
    <main>
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
      {{ songs: <RecentSongs />, albums: <RecentAlbums /> }[tab]}
    </main>
  );
}

export default Recent;
