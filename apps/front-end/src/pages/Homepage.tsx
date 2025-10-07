import { InternalLink } from "@alextheman/components";
import Button from "@mui/material/Button";

function Homepage() {
  return (
    <main>
      <Button
        component={InternalLink}
        to="/featured"
        variant="contained"
        sx={{ display: "flex", justifySelf: "center" }}
      >
        Go to recent content
      </Button>
    </main>
  );
}

export default Homepage;
