import { Exercise } from "../types/Exercise";

const API_URL = "https://localhost:44341/api";

export const loginUser = async (email: string, password: string) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to login");
    }
    return res.json();
  });
};

export const logoutUser = async () => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to logout");
    }
  });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to register");
    }
    return res.json();
  });
};

export const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getExercises = async (): Promise<Exercise[]> => {
  const response = await fetch(`${API_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

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
  const response = await fetch(`${API_URL}/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getSessionById = async (id: number) => {
  const response = await fetch(`${API_URL}/session/${id}`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postSession = async (session: any) => {
  return fetch(`${API_URL}/session`, {
    method: "POST",
    body: JSON.stringify(session),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create session");
    }
    return res.json();
  });
};

export const addExerciseToSession = async (
  sessionId: number,
  exerciseId: number,
  sets: number
) => {
  return fetch(`${API_URL}/session/${sessionId}/exercise/${exerciseId}`, {
    method: "POST",
    body: JSON.stringify({ sets }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add exercise to session");
    }
    return res.json();
  });
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
