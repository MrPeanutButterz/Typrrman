export default function checkUsername(username) {
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(username);
}