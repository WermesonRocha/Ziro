export const addUserInLocalStorage = async users => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const deleteUserInLocalStorage = async id => {
  const localUsers = JSON.parse(localStorage.getItem("users")).filter(
    u => u.id !== id
  );
  await localStorage.setItem("users", JSON.stringify(localUsers));
};

export const updateUserInLocalStorage = async newUser => {
  const localUsers = JSON.parse(localStorage.getItem("users")).filter(
    u => u.id !== newUser.id
  );
  localUsers.push(newUser);
  await localStorage.setItem("users", JSON.stringify(localUsers));
};
