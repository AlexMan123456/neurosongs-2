import {
  defineUserFactory,
  defineSongFactory,
  defineAlbumFactory,
} from "@neurosongs/prisma-client/fabbrica";

export const userFactory = defineUserFactory();
export const albumFactory = defineAlbumFactory({
  defaultData: {
    artist: userFactory,
  },
});
export const songFactory = defineSongFactory({
  defaultData: {
    artist: userFactory,
    album: albumFactory,
  },
});
