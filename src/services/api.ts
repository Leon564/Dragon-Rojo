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
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents`,
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

