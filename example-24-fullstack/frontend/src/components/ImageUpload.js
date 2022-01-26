import { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imgPreview: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
        border: `1px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(1)
    },

    imgPreviewError: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
        border: `1px solid ${theme.palette.secondary.main}`,
        padding: theme.spacing(1)
    }
}));

export default function ImageUpload({ onChange, error, helperText }) {

    const classes = useStyles();

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
                <img className={error ? classes.imgPreviewError : classes.imgPreview} src={previewImage} alt="" />
            </Grid>
            {helperText ? (
                <Grid item>
                    <Typography color={error && "secondary"} variant="caption" component="span">{helperText}</Typography>
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