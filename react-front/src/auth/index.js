//sign up click method
export const signup = (user) => {
  // make post request
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    // pass data
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//sign up click method
export const signin = (user) => {
  // make post request
  return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    // pass data
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// authentica method
export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    // store token to local storage
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

// signout and redirect
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  // check localstorage
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
