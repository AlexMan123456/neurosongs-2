import type { AlbumToPost } from "@neurosongs/types";

import { useSnackbar } from "@alextheman/components";
import { useNavigate } from "react-router-dom";

import formatError from "src/errors/formatError";
import AlbumForm from "src/resources/Albums/components/AlbumForm";
import { useCreateAlbumMutation } from "src/resources/Albums/queries";

function CreateAlbum() {
  const userId = "a05cadd9-479c-43f7-a86f-487e38a282f7";
  const { mutateAsync: postAlbum } = useCreateAlbumMutation();
  const { addSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function onSubmit(data: Omit<AlbumToPost, "userId">) {
    try {
      const albumId = await postAlbum({ ...data, userId });
      addSnackbar("Album created.", "success");
      navigate(`/albums/${albumId}`);
    } catch (error: unknown) {
      addSnackbar(formatError(error), "error");
    }
  }

  return (
    <AlbumForm
      defaultValues={{
        name: "",
        description: "",
      }}
      onSubmit={onSubmit}
    />
  );
}

export default CreateAlbum;
