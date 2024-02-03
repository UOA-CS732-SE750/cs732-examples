import { Typography, Paper } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         height: 300,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         marginBottom: theme.spacing(2)
//     }
// }));

export default function Main({ image, title, children }) {
  return (
    <main>
      {image && (
        <Paper
          sx={{
            height: 300,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginBottom: (theme) => theme.spacing(2)
          }}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <Typography variant="h3" component="h3" gutterBottom>
        {title}
      </Typography>

      {children}
    </main>
  );
}
