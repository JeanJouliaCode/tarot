import { AvatarGenerator } from "random-avatar-generator";

export function generateID() {
  return Math.random().toString().substring(2);
}

export function generateAvatarUrl() {
  const generator = new AvatarGenerator();
  let avatarUrl = generator.generateRandomAvatar();
  return avatarUrl.replace("Circle", "Transparent");
}

export function getUrlBase() {
  return `${
    window.location.hostname === "localhost"
      ? "http://localhost:3000/"
      : "https://tarot-b3e06.firebaseapp.com/"
  }`;
}

export function decodeHtml(html: string) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function getUserScore(user: any) {
  return user.answersState.filter((answer: boolean) => !!answer).length;
}
