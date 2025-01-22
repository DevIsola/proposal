const gameContainer = document.getElementById("game-text");
const choicesContainer = document.getElementById("choices");

function createFirework() {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = Math.random() * window.innerWidth + "px";
    firework.style.top = Math.random() * window.innerHeight / 2 + "px";
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
}

function createGlitter() {
    const glitter = document.createElement("div");
    glitter.classList.add("glitter");
    glitter.style.left = Math.random() * window.innerWidth + "px";
    glitter.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(glitter);
    setTimeout(() => glitter.remove(), 2000);
}

function startCelebration() {
    setInterval(createFirework, 300);
    setInterval(createGlitter, 100);
}

let gameState = {};

const scenes = {
  start: {
    text: "Vamos ver o quanto você lembra sobre o nosso relacionamento! ❤️ Pronto(a) para começar?",
    choices: [
      { text: "Sim, estou pronto(a)!", nextScene: "question1" }
    ]
  },
  question1: {
    text: "1. Qual foi o nosso primeiro encontro?",
    choices: [
      { text: "Restaurante 🍽", nextScene: "wrongAnswer1" },
      { text: "Cinema 🎥", nextScene: "question2", correct: true },
      { text: "Parque 🌲", nextScene: "wrongAnswer1" }
    ]
  },
  wrongAnswer1: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question1" }
    ]
  },
  question2: {
    text: "2. Qual é o meu prato preferido que você faz?",
    choices: [
      { text: "Risoto 🍚", nextScene: "question3", correct: true },
      { text: "Pizza 🍕", nextScene: "wrongAnswer2" },
      { text: "Macarrão 🍝", nextScene: "wrongAnswer2" }
    ]
  },
  wrongAnswer2: {
    text: "Essa não é a resposta certa... Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question2" }
    ]
  },
  question3: {
    text: "3. Qual é o nome dos nossos bichinhos?",
    choices: [
      { text: "Shakira 🐕 e Luna 🐈", nextScene: "proposal", correct: true },
      { text: "Bella 🐕e Max 🐈", nextScene: "wrongAnswer3" },
      { text: "Nina 🐕 e Simba 🐈", nextScene: "wrongAnswer3" }
    ]
  },
  wrongAnswer3: {
    text: "Quase... mas não foi isso! Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question3" }
    ]
  },
  proposal: {
    text: `Chegamos ao momento mais importante da jornada... 💍<br>
           <audio controls autoplay>
               <source src="https://www.orangefreesounds.com/wp-content/uploads/2017/11/Bridal-chorus.mp3?_=1" type="audio/mpeg">
               Seu navegador não suporta o áudio.
           </audio>`,
    choices: [
      { text: "Abrir a surpresa final", nextScene: "finalMessage" }
    ]
  },
  finalMessage: {
    text: `Surpresa! ❤️ Quer casar comigo? Com amor e memórias, sua resposta importa mais do que qualquer outra coisa. 🥰`,
    choices: [],
    onEnter: startCelebration
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

  if (scene.onEnter) {
    scene.onEnter();
  }
}

renderScene("start");