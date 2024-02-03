import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function ImageUpload({ onChange, error, helperText }) {
  // const [currentImageFile, setCurrentImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  function handleImageFileChange(event) {
    // setCurrentImageFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    onChange && onChange(event);
  }

  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item xs={12}>
        <Box
          component="img"
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            border: (theme) =>
              error
                ? `1px solid ${theme.palette.secondary.main}`
                : `1px solid ${theme.palette.primary.main}`,
            padding: (theme) => theme.spacing(1)
          }}
          src={previewImage}
          alt=""
        />
      </Grid>
      {helperText ? (
        <Grid item>
          <Typography color={error && "secondary"} variant="caption" component="span">
            {helperText}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={1} />
      )}
      <Grid item>
        <Button variant="contained" component="label">
          Choose image
          <input type="file" accept="image/*" hidden onChange={handleImageFileChange} />
        </Button>
      </Grid>
    </Grid>
  );
}
