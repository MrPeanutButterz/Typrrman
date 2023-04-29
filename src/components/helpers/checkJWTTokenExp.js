import jwtDecode from "jwt-decode";

export default function checkJWTTokenExp(token) {
  const decode = jwtDecode(token)
  return Date.now() < decode.exp * 1000;
}