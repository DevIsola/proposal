const gameContainer = document.getElementById("game-text");
const choicesContainer = document.getElementById("choices");

let gameState = {};

const scenes = {
  start: {
    text: "Bem-vindo(a) à sua jornada cheia de memes brasileiros! 🚀 Onde você quer começar?",
    choices: [
      { text: "Explorar memes antigos", nextScene: "oldMemes" },
      { text: "Entrar na terra dos memes modernos", nextScene: "modernMemes" }
    ]
  },
  oldMemes: {
    text: `Você encontra o clássico meme "Não é só isso, tem que ver também..." 😆<br>
           <img src="https://via.placeholder.com/300" alt="Meme clássico" style="max-width:100%;">`,
    choices: [
      { text: "Relembrar o meme com carinho", nextScene: "memoryLane" },
      { text: "Partir para algo mais engraçado", nextScene: "modernMemes" }
    ]
  },
  modernMemes: {
    text: `Você encontra o meme "Tá tranquilo, tá favorável" 🎵<br>
           <img src="https://via.placeholder.com/300" alt="Meme moderno" style="max-width:100%;">`,
    choices: [
      { text: "Começa a dançar imediatamente", nextScene: "proposal" },
      { text: "Ri sem parar", nextScene: "proposal" }
    ]
  },
  memoryLane: {
    text: "Você lembra de outros memes clássicos e se sente nostálgico. 'Já acabou, Jéssica?' 😂",
    choices: [
      { text: "Sim, mas a jornada continua!", nextScene: "modernMemes" },
      { text: "Repetir a memória", nextScene: "oldMemes" }
    ]
  },
  proposal: {
    text: `Chegamos ao momento mais importante da jornada... 💍<br>
           <audio controls autoplay>
               <source src="https://www.example.com/music.mp3" type="audio/mpeg">
               Seu navegador não suporta o áudio.
           </audio>`,
    choices: [
      { text: "Abrir a surpresa final", nextScene: "finalMessage" }
    ]
  },
  finalMessage: {
    text: `Surpresa! ❤️ Quer casar comigo? Com amor e memes, sua resposta importa mais do que qualquer outra coisa. 🥰`,
    choices: []
  },
  puzzle: {
    text: `Para continuar, responda: Qual o lugar onde nos conhecemos pela primeira vez?`,
    choices: [
      { text: "Parque", nextScene: "finalMessage", correct: true },
      { text: "Shopping", nextScene: "wrongAnswer" }
    ]
  },
  wrongAnswer: {
    text: `Não foi bem isso... Tente de novo!`,
    choices: [
      { text: "Voltar e tentar outra vez", nextScene: "puzzle" }
    ]
  }
};

function renderScene(sceneName) {
  const scene = scenes[sceneName];
  gameContainer.innerHTML = scene.text;
  choicesContainer.innerHTML = "";

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => renderScene(choice.nextScene);
    if (choice.correct) {
      button.classList.add("correct");
    }
    choicesContainer.appendChild(button);
  });

  if (sceneName === "finalMessage") {
    document.getElementById("game-container").classList.add("final");
  }
}

renderScene("start");