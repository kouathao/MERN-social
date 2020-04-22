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
