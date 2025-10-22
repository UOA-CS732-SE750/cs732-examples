import { CircularProgress } from "@material-ui/core";
import Main from "../components/Main";

export default function LoadingPage({ title }: { title: string }) {
  return (
    <Main title={title}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    </Main>
  );
}
