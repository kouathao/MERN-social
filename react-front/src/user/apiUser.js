export const read = (userId, token) => {
  // make request to backend
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // get body data
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (userId, token, user) => {
  // make request to backend
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // get body data
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete api call
export const remove = (userId, token) => {
  // make request to backend
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // get body data
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = () => {
  // make request to backend
  return fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "GET",
  })
    .then((response) => {
      // get body data
      return response.json();
    })
    .catch((err) => console.log(err));
};
