import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

const API_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function HomePage() {
  const [joke, setJoke] = useState("");

  async function fetchJoke() {
    const response = await axios.get(`${API_URL}/api/dad-jokes/random`);
    setJoke(response.data.text);
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <h1>Daily Dad Joke</h1>
      <main className={styles.main}>
        <p className={styles.joke}>{joke}</p>
        <button onClick={fetchJoke}>Tell me another!</button>
      </main>
    </div>
  );
}
