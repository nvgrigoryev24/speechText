const
  main = document.querySelector('main'),
  voicesSelect = document.getElementById('voices'),
  textarea = document.getElementById('text'),
  readBtn = document.getElementById('read'),
  toggleBtn = document.getElementById('toggle'),
  closeBtn = document.getElementById('close');


const data = [
  {
    image: './img/drink.jpg',
    text: "Я хочу пить",
  },
  {
    image: './img/food.jpg',
    text: "Я голодный"
  },
  {
    image: './img/tired.jpg',
    text: "Я устал"
  },
  {
    image: './img/hurt.jpg',
    text: "Мне больно"
  },
  {
    image: './img/happy.jpg',
    text: "Мне хорошо"
  },
  {
    image: './img/angry.jpg',
    text: "Я злюсь"
  },
  {
    image: './img/sad.jpg',
    text: "Мне печально"
  },
  {
    image: './img/scared.jpg',
    text: "Мне страшно"
  },
  {
    image: './img/outside.jpg',
    text: 'Хочу на улицу'
  },
  {
    image: './img/home.jpg',
    text: 'Хочу домой'
  },
  {
    image: './img/school.jpg',
    text: 'Я хочу в школу'
  },
  {
    image: './img/grandma.jpg',
    text: 'Хочу поехать к бабушке'
  },
];
const message = new SpeechSynthesisUtterance();
let voices = [];

data.forEach(createBox);

/* FUNCTIONS */

function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}">
  <p class="info">${text}</p>
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });
  main.appendChild(box);
}

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
  console.log(e.target.value);
}



/* EVENT LISTENERS */

toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.remove('show');
});

speechSynthesis.addEventListener('voiceschanged', getVoices);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
  textarea.value = '';
});


getVoices();