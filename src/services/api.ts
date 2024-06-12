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
  console.log(data);
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
  console.log(response);
  console.log(response.ok);
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
