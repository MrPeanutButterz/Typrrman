export default function checkUsername(username) {
  //username may only contain characters en numbers
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(username);
}