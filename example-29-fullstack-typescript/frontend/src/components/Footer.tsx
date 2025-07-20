import { Container, Box, Typography, Divider } from "@mui/material";

type FooterProps = {
  title: string;
  description: string;
};

export default function Footer({ title, description }: FooterProps) {
  const isOnline = true;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        padding: (theme) => theme.spacing(6, 0)
      }}
    >
      <Container maxWidth="lg">
        <Divider />
        <Typography variant="h6" align="center" gutterBottom>
          {title}
          <em> (currently </em>
          {isOnline ? (
            <em style={{ color: "green" }}>online</em>
          ) : (
            <em style={{ color: "red" }}>offline</em>
          )}
          <em>)</em>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
      </Container>
    </Box>
  );
}
