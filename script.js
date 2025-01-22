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
    text: "Você encontra o clássico meme 'Não é só isso, tem que ver também...' 😆 O que você faz?",
    choices: [
      { text: "Relembrar o meme com carinho", nextScene: "memoryLane" },
      { text: "Partir para algo mais engraçado", nextScene: "modernMemes" }
    ]
  },
  modernMemes: {
    text: "Você encontra o meme 'Tá tranquilo, tá favorável' 🎵 Qual é sua reação?",
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
    text: "Chegamos ao momento mais importante da jornada... 💍",
    choices: [
      { text: "Abrir a surpresa final", nextScene: "finalMessage" }
    ]
  },
  finalMessage: {
    text: "Surpresa! ❤️ Quer casar comigo? Com amor e memes, sua resposta importa mais do que qualquer outra coisa. 🥰",
    choices: []
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
    choicesContainer.appendChild(button);
  });
}

renderScene("start");
