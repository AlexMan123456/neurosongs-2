import app from "src/server/app";

const port = parseInt(process.env.PORT ?? "8080");

app.listen(parseInt(process.env.PORT ?? "8080"), (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`);
  }
});
