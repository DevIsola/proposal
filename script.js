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
    text: "1. Que dia foi nosso primeiro date?",
    choices: [
      { text: "Sep 29th, 2023", nextScene: "wrongAnswer1"},
      { text: "Sep 30th, 2023", nextScene: "question2", correct: true  }
    ]
  },
  wrongAnswer1: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question1" }
    ]
  },


  question2: {
    text: "2. Quantos anos tem a Shakira 🐕?",
    choices: [
      { text: "7 Anos", nextScene: "wrongAnswer2"},
      { text: "8 Anos", nextScene: "question3", correct: true },
      { text: "9 Anos", nextScene: "wrongAnswer2" }
    ]
  },
  wrongAnswer2: {
    text: "Essa não é a resposta certa... Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question2" }
    ]
  },


  question3: {
    text: "3. Qual serie mais gostamos até agora?",
    choices: [
      { text: "Big Mouth", nextScene: "question4", correct: true },
      { text: "Master Chef", nextScene: "wrongAnswer3" }
    ]
  },
  wrongAnswer3: {
    text: "Quase... mas não foi isso! Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question3" }
    ]
  },


  question4: {
    text: "4. Qual o nome do primeiro camping que fomos juntos?",
    choices: [
      { text: "Allouette Lake", nextScene: "wrongAnswer4" },
      { text: "Kentucky Lake", nextScene: "question5", correct: true }      
    ]
  },
  wrongAnswer4: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question4" }
    ]
  },


  question5: {
    text: "5. Quem tem mais paciencia?",
    choices: [
      { text: "Andre", nextScene: "question6", correct: true },
      { text: "Rapha", nextScene: "wrongAnswer5" }
    ]
  },
  wrongAnswer5: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question5" }
    ]
  },


  question6: {
    text: "6. Quem é o mais baladeiro?",
    choices: [
      { text: "Andre", nextScene: "question7", correct: true },
      { text: "Rapha", nextScene: "wrongAnswer6" }
    ]
  },
  wrongAnswer6: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question6" }
    ]
  },


  question7: {
    text: "7. Quem cozinha com mais frequencia?",
    choices: [
      { text: "Rapha", nextScene: "wrongAnswer7" },
      { text: "Andre", nextScene: "wrongAnswer7" },
      { text: "Mineiros", nextScene: "question8", correct: true }
    ]
  },
  wrongAnswer7: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question7" }
    ]
  },


  question8: {
    text: "8. Quem fica mais tempo no banheiro?",
    choices: [
      { text: "Andre", nextScene: "question9", correct: true },
      { text: "Rapha", nextScene: "wrongAnswer8" },
      { text: "Shakira", nextScene: "wrongAnswer8" }
    ]
  },
  wrongAnswer8: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question8" }
    ]
  },


  question9: {
    text: "9. Quantas horas passamos em estrada ate agora?",
    choices: [
      { text: "89", nextScene: "wrongAnswer9" },
      { text: "171", nextScene: "question10", correct: true },
      { text: "113", nextScene: "wrongAnswer9" }
    ]
  },
  wrongAnswer9: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question9" }
    ]
  },


  question10: {
    text: "10. Quantas vezes pedimos Starbucks juntos?",
    choices: [
      { text: "497", nextScene: "proposal", correct: true },
      { text: "358", nextScene: "wrongAnswer10" }
    ]
  },
  wrongAnswer10: {
    text: "Hmm... não foi bem isso. Tente novamente!",
    choices: [
      { text: "Voltar", nextScene: "question10" }
    ]
  },


  proposal: {
    text: `Chegamos ao momento mais importante da jornada... 💍<br>
           <audio controls autoplay>
               <source src="music.mp3" type="audio/mpeg">
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