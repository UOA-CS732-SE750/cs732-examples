import useDadJokes from "../../hooks/useDadJokes";
import styles from "./AdminPage.module.css";
import { useState } from "react";

export default function AdminPage() {
  const { jokes, loading, error, addJoke, deleteJoke } = useDadJokes();

  const [newJoke, setNewJoke] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addJoke(newJoke);
    setNewJoke("");
  }

  return (
    <div>
      <h1>Admin Page</h1>

      <h2>All jokes</h2>

      {loading && <p>Loading...</p>}

      <ul className={styles.jokeslist}>
        {jokes.map((joke) => (
          <li key={joke._id}>
            <span>{joke.text}</span>
            <button onClick={() => deleteJoke(joke._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add joke</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="joke"
          value={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
