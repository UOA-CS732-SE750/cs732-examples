import { useState, useContext } from "react";
import { AppContext } from "../AppContextProvider";
import { Typography, TextField, Grid, Button } from "@mui/material";
import Main from "../components/Main";
import ImageUpload from "../components/ImageUpload";
import { useNavigate } from "react-router-dom";

export default function NewArticlePage() {
  const [hasErrors, setHasErrors] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  //     const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { addArticle } = useContext(AppContext);

  const isError = (condition) => hasErrors && condition;

  async function handleOk() {
    setHasErrors(true);

    if (title.length > 0 && image != null && text.length > 0) {
      // editorState.getCurrentContent().getPlainText().length > 0) {

      // We're ready to add the article!
      // TODO Some form of error handling?
      // const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      const newArticle = await addArticle(title, image, text);
      console.log(newArticle);

      navigate(`/articles/${newArticle._id}`, { replace: true });
    }
  }

  return (
    <Main title="Tell us your story!">
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Enter a title for your article:
          </Typography>
          <TextField
            autoFocus
            margin="normal"
            id="new-article-name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={isError(title.length === 0)}
            helperText={isError(title.length === 0) && "Please enter a title!"}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Choose a main image:
          </Typography>
          <ImageUpload
            onChange={(e) => setImage(e.target.files[0])}
            error={isError(image === null)}
            helperText={isError(image === null) && "Please choose an image!"}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Share your ideas here:
          </Typography>
          {/* <RichTextEditor
                        editorState={editorState}
                        error={isError(editorState.getCurrentContent().getPlainText().length === 0)}
                        onChange={(state) => setEditorState(state)}
                    /> */}
          <TextField
            error={isError(text.length === 0)}
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
        </Grid>

        <Grid item />
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button color="primary" variant="contained" onClick={handleOk}>
                Post article 😀
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Main>
  );
}
