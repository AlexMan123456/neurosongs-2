import type { AlbumToPost } from "@neurosongs/types";

import { SubmitButton } from "@alextheman/components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, FormProvider, useForm } from "react-hook-form";

export interface AlbumFormProps {
  defaultValues: Omit<AlbumToPost, "userId">;
  onSubmit: (data: Omit<AlbumToPost, "userId">) => void | Promise<void>;
}

function AlbumForm({ defaultValues, onSubmit }: AlbumFormProps) {
  const methods = useForm<Omit<AlbumToPost, "userId">>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Album Details" />
          <CardContent>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => {
                  return <TextField {...field} label="Name" />;
                }}
              />
              <Controller
                name="description"
                control={methods.control}
                render={({ field }) => {
                  return <TextField {...field} label="Description" />;
                }}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <SubmitButton label="Submit" />
          </CardActions>
        </Card>
      </form>
    </FormProvider>
  );
}

export default AlbumForm;
