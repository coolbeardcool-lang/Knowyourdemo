'use strict';

// ── Character data ──────────────────────────────────────────────────────────
// To unlock a character: set comingSoon: false and fill in scenes[]
const CHARACTERS = [
  {
    id: 'hsu-shih-hsien',
    name: '許世賢',
    years: '1908–1983',
    title: '台灣第一位女市長',
    description: '許世賢，嘉義人，日本東京女子醫學專門學校畢業。曾任嘉義市議員、立法委員，1968 年當選嘉義市長，成為台灣第一位民選女性市長。她以清廉親民著稱，是黨外運動的精神象徵，長期投身民主運動，對台灣政治發展有深遠影響。',
    color: '#5C2E00',
    accentColor: '#D4A96A',
    comingSoon: false,
    scenes: [
      {
        type: 'info',
        title: '許世賢的歷史故事',
        content: '1968 年，許世賢以無黨籍身分當選嘉義市長，打破了國民黨長期執政的格局。她的勝選不僅是台灣女性政治參與的里程碑，更為日後的黨外運動奠定了重要基礎，激勵了無數投身民主的後繼者。'
      }
    ]
  },
  {
    id: 'yu-teng-fa',
    name: '余登發',
    years: '1904–1989',
    title: '黨外運動先驅',
    description: '',
    color: '#0D2B4A',
    accentColor: '#7BA7D4',
    comingSoon: true,
    scenes: []
  },
  {
    id: 'hsu-hsin-liang',
    name: '許信良',
    years: '1941–',
    title: '桃園縣長、黨外健將',
    description: '',
    color: '#0A2E0A',
    accentColor: '#81C784',
    comingSoon: true,
    scenes: []
  },
  {
    id: 'huang-hsin-chieh',
    name: '黃信介',
    years: '1928–1999',
    title: '黨外運動領袖',
    description: '',
    color: '#1A0533',
    accentColor: '#CE93D8',
    comingSoon: true,
    scenes: []
  },
  {
    id: 'lu-hsiu-lien',
    name: '呂秀蓮',
    years: '1944–',
    title: '女權先驅、前副總統',
    description: '',
    color: '#3B0000',
    accentColor: '#EF9A9A',
    comingSoon: true,
    scenes: []
  },
  {
    id: 'lin-yi-hsiung',
    name: '林義雄',
    years: '1941–',
    title: '人權鬥士',
    description: '',
    color: '#2A1500',
    accentColor: '#FFCC80',
    comingSoon: true,
    scenes: []
  }
];

// ── Game state ───────────────────────────────────────────────────────────────
let state = {
  flipped: [],
  matched: [],
  moves: 0,
  lock: false
};

// ── Canvas drawing helpers ───────────────────────────────────────────────────

function drawPlaceholderPortrait(canvas, character) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, character.color);
  bg.addColorStop(1, '#0d0d1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  if (character.comingSoon) {
    // Lock body
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 18, h * 0.38, 36, 30, 6);
    ctx.fill();

    // Lock shackle
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.38, 13, Math.PI, 0);
    ctx.stroke();

    // Name
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = `bold ${Math.round(w / 5.5)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.name, w / 2, h * 0.72);

    // Coming soon label
    ctx.fillStyle = 'rgba(255,255,255,0.38)';
    ctx.font = `${Math.round(w / 9)}px sans-serif`;
    ctx.fillText('即將登場', w / 2, h * 0.86);

  } else {
    // Head silhouette glow
    const glow = ctx.createRadialGradient(w / 2, h * 0.32, 0, w / 2, h * 0.32, w * 0.28);
    glow.addColorStop(0, character.accentColor + '55');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.32, w * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(w / 4.5)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.name, w / 2, h * 0.68);

    // Title
    ctx.fillStyle = character.accentColor;
    ctx.font = `${Math.round(w / 9.5)}px sans-serif`;
    ctx.fillText(character.title, w / 2, h * 0.82);

    // Years
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = `${Math.round(w / 11)}px sans-serif`;
    ctx.fillText(character.years, w / 2, h * 0.92);
  }
}

function drawCardBack(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#1a1a3e');
  bg.addColorStop(1, '#0d0d1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Grid pattern
  ctx.strokeStyle = 'rgba(255,215,0,0.12)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Center character
  ctx.fillStyle = 'rgba(255,215,0,0.55)';
  ctx.font = `bold ${Math.round(w / 2.8)}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('知', w / 2, h / 2);
}

// ── Card creation ────────────────────────────────────────────────────────────

function createCard(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
  if (cardData.isLocked) card.classList.add('coming-soon');
  card.dataset.cardId = cardData.cardId;
  card.dataset.pairId = cardData.pairId || '';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  // Back face
  const backFace = document.createElement('div');
  backFace.className = 'card-face card-back';
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 160;
  backCanvas.height = 220;
  drawCardBack(backCanvas);
  backFace.appendChild(backCanvas);

  // Front face
  const frontFace = document.createElement('div');
  frontFace.className = 'card-face card-front';
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 160;
  frontCanvas.height = 220;
  drawPlaceholderPortrait(frontCanvas, cardData.character);
  frontFace.appendChild(frontCanvas);

  inner.appendChild(backFace);
  inner.appendChild(frontFace);
  card.appendChild(inner);

  if (!cardData.isLocked) {
    card.addEventListener('click', () => onCardClick(card));
  }

  return card;
}

// ── Game logic ───────────────────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initGame() {
  state = { flipped: [], matched: [], moves: 0, lock: false };
  document.getElementById('moves-counter').textContent = '翻牌次數：0';
  document.getElementById('matches-counter').textContent = '配對成功：0';

  const board = document.getElementById('board');
  board.innerHTML = '';

  const activeChars = CHARACTERS.filter(c => !c.comingSoon);
  const lockedChars = CHARACTERS.filter(c => c.comingSoon);

  // Create two cards per active character (matching pairs)
  const activeDeck = activeChars.flatMap(c => [
    { character: c, cardId: `${c.id}-a`, pairId: c.id, isLocked: false },
    { character: c, cardId: `${c.id}-b`, pairId: c.id, isLocked: false }
  ]);

  // One display card per locked character
  const lockedDeck = lockedChars.map(c => ({
    character: c,
    cardId: c.id,
    pairId: null,
    isLocked: true
  }));

  const allCards = shuffle([...activeDeck, ...lockedDeck]);
  allCards.forEach(data => board.appendChild(createCard(data)));
}

function onCardClick(card) {
  if (state.lock) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');
  state.flipped.push(card);

  if (state.flipped.length === 2) {
    state.moves++;
    document.getElementById('moves-counter').textContent = `翻牌次數：${state.moves}`;
    state.lock = true;
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = state.flipped;
  const id1 = c1.dataset.pairId;
  const id2 = c2.dataset.pairId;

  if (id1 && id1 === id2) {
    setTimeout(() => {
      c1.classList.add('matched');
      c2.classList.add('matched');
      state.matched.push(id1);
      state.flipped = [];
      state.lock = false;

      const matchCount = state.matched.length;
      document.getElementById('matches-counter').textContent = `配對成功：${matchCount}`;

      const character = CHARACTERS.find(c => c.id === id1);
      if (character) showScene(character);
    }, 600);
  } else {
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      state.flipped = [];
      state.lock = false;
    }, 1000);
  }
}

// ── Scene modal ──────────────────────────────────────────────────────────────

function showScene(character) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-name').textContent =
    `${character.name}　${character.years}`;
  document.getElementById('modal-description').textContent =
    character.description;

  const media = document.getElementById('modal-media');
  media.innerHTML = '';

  if (character.scenes.length > 0) {
    const scene = character.scenes[0];
    if (scene.type === 'youtube' && scene.videoId) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '315';
      iframe.src = `https://www.youtube.com/embed/${scene.videoId}?autoplay=1`;
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.border = 'none';
      media.appendChild(iframe);
    } else if (scene.type === 'info') {
      const box = document.createElement('div');
      box.className = 'scene-info';
      box.innerHTML = `<h3>${scene.title}</h3><p>${scene.content}</p>`;
      media.appendChild(box);
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('visible');
}

// ── Event listeners ──────────────────────────────────────────────────────────

document.getElementById('modal-close').addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.classList.remove('visible');
  modal.classList.add('hidden');
  document.getElementById('modal-media').innerHTML = '';
});

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.querySelector('#modal-close').click();
  }
});

document.getElementById('restart-btn').addEventListener('click', initGame);

// Start
initGame();
