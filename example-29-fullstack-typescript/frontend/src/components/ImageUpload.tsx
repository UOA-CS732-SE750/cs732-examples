import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

type ImageUploadProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
};

export default function ImageUpload({ onChange, error, helperText }: ImageUploadProps) {
  // const [currentImageFile, setCurrentImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    // !!! TypeScript !!!
    // Another example of a type guard.
    if (!event.target.files?.[0]) {
      setPreviewImage(null);
      return;
    }

    // setCurrentImageFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]!));
    onChange && onChange(event);
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
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
          src={previewImage ?? undefined}
          alt=""
        />
      </Grid>
      {helperText ? (
        <Grid item>
          <Typography color={error ? "secondary" : undefined} variant="caption" component="span">
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
