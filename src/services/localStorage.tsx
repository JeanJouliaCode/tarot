export function savePlayerID(id: string) {
  localStorage.setItem("userID", id);
}

export function getPlayerID() {
  return localStorage.getItem("userID");
}
