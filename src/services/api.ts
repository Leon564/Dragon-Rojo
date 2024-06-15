/* eslint-disable @typescript-eslint/no-explicit-any */
const TOKEN = localStorage.getItem("token");
export const loginService = async ({
  username,
  password,
  rememberMe,
}: {
  username: string;
  password: string;
  rememberMe: boolean;
}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, rememberMe }),
  });
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export const checkTokenService = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/checktoken`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

//get documents

export const getDocumentsService = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export const getOneDocumentsService = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export type CreateDocument = {
  name: string;
  last_name: string;
  lvl: string;
  date: string;
  pdf: boolean;
  saveHistory: boolean;
  [key: string]: string | boolean;
};

export const createDocumentService = async (data: CreateDocument) => {
  const query = Object.keys(data)
    .map((key) => {
      if (data[key] !== undefined && data[key] !== false) {
        return `${key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        )}=${data[key]}`;
      }
      return "";
    })
    .join("&");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents/create?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );  
  if (response.ok) return response;
  return { error: response.statusText, ...(await response.json()) };
};

export const deleteDocumentService = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

//students
//TODO: sort by field
export const getStudentsService = async (params: any) => {  
  const query = Object.keys(params)
    .map((key) => {
      if (params[key] !== undefined) {
        return `${key}=${params[key]}`;
      }
      return "";
    })
    .filter((item) => item !== "")
    .join("&");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export const getOneStudentService = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export type CreateStudent = {
  name: string;
  dateOfBirth: string;
  level: string;
  weight: string;
  carnet: string;
};

export const createStudentService = async (data: CreateStudent) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(
      //snake_case to camelCase
      (Object.keys(data) as Array<keyof CreateStudent>).reduce((acc: Record<string, string>, key: keyof CreateStudent) => {
        acc[key.replace(/_([a-z])/g, (g) => g[1].toUpperCase())] = data[key];
        return acc;
      }, {})
    ),
  });
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

export const deleteStudentService = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};


export const updateStudentService = async (id: string, data: CreateStudent) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(        
        (Object.keys(data) as Array<keyof CreateStudent>).reduce((acc: Record<string, string>, key: keyof CreateStudent) => {
          acc[key.replace(/_([a-z])/g, (g) => g[1].toUpperCase())] = data[key];
          return acc;
        }, {})
      ),
    }
  );
  if (response.ok) return response.json();
  return { error: response.statusText, ...(await response.json()) };
};

// export const logoutService = async () => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
//   if (response.ok) return response.json();
//   return { error: response.statusText, ...(await response.json()) };
// };
