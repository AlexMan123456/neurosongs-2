import getPrismaClient from "src/database/client";
import { albumFixtures, songsFixtures, usersFixtures } from "src/database/fixtures";

(async () => {
  const database = getPrismaClient();
  for (const user of usersFixtures) {
    const [day, month, year] = user.dateOfBirth.split("/").map((datePart) => {
      return parseInt(datePart);
    });
    await database.user.create({ data: { ...user, dateOfBirth: new Date(day, month - 1, year) } });
  }
  await database.album.createMany({ data: albumFixtures });
  for (const song of songsFixtures) {
    const [day, month, year] = song.releaseDate.split("/").map((datePart) => {
      return parseInt(datePart);
    });
    await database.song.create({ data: { ...song, releaseDate: new Date(day, month - 1, year) } });
  }
})();
