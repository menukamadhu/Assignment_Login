import axios from "axios";

//login
const userLogin = async (data) => {
  const response = await axios({
    method: "post",
    url: `https://dummyjson.com/auth/login`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// get all users
const getAllUsers = async () => {
  const response = await axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/users`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

const AuthenticationServices = {
  userLogin,
  getAllUsers,
};

export default AuthenticationServices;
