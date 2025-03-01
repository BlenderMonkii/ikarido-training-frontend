import { Exercise } from "../types/Exercise";

const API_URL = "https://localhost:44341/api";

export async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function fetchWithTokenRefresh(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const fetchOptions = {
    ...options,
    credentials: "include" as RequestCredentials,
  };

  let response = await fetch(url, fetchOptions);

  if (response.status === 401) {
    const refreshSuccess = await refreshToken();

    if (refreshSuccess) {
      response = await fetch(url, fetchOptions);
    }
  }

  return response;
}
export const loginUser = async (email: string, password: string) => {
  const response = await fetchWithTokenRefresh(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetchWithTokenRefresh(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetchWithTokenRefresh(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }
  return response.json();
};

export const getMe = async () => {
  const response = await fetchWithTokenRefresh(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getExercises = async (): Promise<Exercise[]> => {
  const response = await fetchWithTokenRefresh(`${API_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getExerciseById = async (id: number): Promise<Exercise> => {
  const response = await fetchWithTokenRefresh(`${API_URL}/exercises/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postExercises = async (exercise: any): Promise<Response> => {
  const { exerciseType } = exercise;

  if (!exerciseType) {
    throw new Error("Exercise type is required");
  }

  const response = await fetchWithTokenRefresh(
    `${API_URL}/exercises/${exerciseType}`,
    {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create exercise");
  }
  return response.json();
};

export const getSessions = async () => {
  const response = await fetchWithTokenRefresh(`${API_URL}/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getSessionById = async (id: number) => {
  const response = await fetchWithTokenRefresh(`${API_URL}/session/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postSession = async (session: any) => {
  const response = await fetchWithTokenRefresh(`${API_URL}/session`, {
    method: "POST",
    body: JSON.stringify(session),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }
  return response.json();
};

export const addExerciseToSession = async (
  sessionId: number,
  exerciseId: number,
  sets: number
) => {
  const response = await fetchWithTokenRefresh(
    `${API_URL}/session/${sessionId}/exercise/${exerciseId}`,
    {
      method: "POST",
      body: JSON.stringify({ sets }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add exercise to session");
  }
  return response.json();
};

export const getTrainingplansByUser = async (id: number) => {
  const response = await fetchWithTokenRefresh(
    `${API_URL}/trainingplan/owner/${id}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getUser = async (id: number) => {
  const response = await fetchWithTokenRefresh(`${API_URL}/User/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
