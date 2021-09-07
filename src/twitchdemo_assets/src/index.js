import { twitchdemo } from "../../declarations/twitchdemo";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with twitchdemo actor, calling the greet method
  const greeting = await twitchdemo.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
