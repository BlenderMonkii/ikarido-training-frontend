import { Exercise } from "../types/Exercise";

const API_URL = "https://localhost:44341/api";

export const getExercises = async () => {
  const response = await fetch(`${API_URL}/exercises`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// export const postExercises = async <T extends Exercise>(
//   exercise: T,
//   type: string
// ) => {
//   switch (type) {
//     case "fingerboard":
//       return fetch(`${API_URL}/exercises/fingerboard`, {
//         method: "POST",
//         body: JSON.stringify(exercise),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     default:
//       throw new Error("Invalid exercise type");
//   }
// };

export const postExercises = async <T extends Exercise>(
  exercise: T
): Promise<Response> => {
  const { exerciseType } = exercise;

  if (!exerciseType) {
    throw new Error("Exercise type is required");
  }

  return fetch(`${API_URL}/exercises/${exerciseType}`, {
    method: "POST",
    body: JSON.stringify(exercise),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create exercise");
    }
    return res.json();
  });
};

export const getSessions = async () => {
  const response = await fetch(`${API_URL}/session`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getTrainingplansByUser = async (id: number) => {
  const response = await fetch(`${API_URL}/trainingplan/owner/${id}`);
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
