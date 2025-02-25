import { Exercise } from "../types/Exercise";

const API_URL = "https://localhost:44341/api";

export const getExercises = async () => {
  const response = await fetch(`${API_URL}/exercises`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postExercises = async (exercise: Exercise) => {
  return fetch(`https://localhost:44341/api/exercises/fingerboard`, {
    method: "POST",
    body: JSON.stringify(exercise),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllPlans = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trainingplans`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getUser = async (id: number) => {
  const response = await fetch(`${API_URL}/User/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
