import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function useDadJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchJokes() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/dad-jokes/`);
      setJokes(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJokes();
  }, []);

  async function addJoke(text) {
    const oldJokes = jokes;
    setJokes([...oldJokes, { text }]);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/dad-jokes/`, { text });
      setJokes([...oldJokes, response.data]);
    } catch (error) {
      setError(error.response.data);
      setJokes(oldJokes);
    }
  }

  async function deleteJoke(_id) {
    const oldJokes = jokes;
    setJokes(oldJokes.filter((joke) => joke._id !== _id));
    setError(null);
    try {
      await axios.delete(`${API_URL}/api/dad-jokes/${_id}`);
    } catch (error) {
      setError(error.response.data);
      setJokes(oldJokes);
    }
  }

  return { jokes, loading, error, addJoke, deleteJoke };
}
