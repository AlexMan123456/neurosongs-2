import type { AlbumToPost } from "@neurosongs/types";

import { useSnackbar } from "@alextheman/components";
import { useNavigate } from "react-router-dom";

import AlbumForm from "src/components/resources/albums/AlbumForm";
import { useCreateAlbumMutation } from "src/queries/albums";

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
    } catch {
      // TODO: Format the error messages to provide more specific errors
      addSnackbar("Could not post album. Please try again later.", "error");
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
