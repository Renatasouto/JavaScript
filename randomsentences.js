// Módulo responsável por obter palavras aleatórias
const randomWordsModule = (function () {
  // Função para buscar uma palavra aleatória de uma API externa usando fetch
  async function fetchRandomWord(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.word;
  }

  // Função para obter uma palavra aleatória de um array
  function getRandomWordFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  // Função para obter um substantivo aleatório
  function getRandomNoun() {
    const nouns = ['cachorro', 'gato', 'pessoa', 'cidade', 'carro'];
    return getRandomWordFromArray(nouns);
  }

  // Função para obter um adjetivo aleatório usando fetch
  async function getRandomAdjective() {
    const url = 'https://api.adjectives.com/random';
    return await fetchRandomWord(url);
  }

  // Exporta as funções do módulo
  return {
    getRandomNoun,
    getRandomAdjective,
  };
})();

// Função para gerar uma frase aleatória
function generateRandomSentence() {
  const noun = randomWordsModule.getRandomNoun();
  const adjectivePromise = randomWordsModule.getRandomAdjective();

  return adjectivePromise.then((adjective) => {
    return `O ${noun} é ${adjective}.`;
  });
}

// Exemplo de uso
generateRandomSentence().then((sentence) => {
  console.log(sentence);
});
