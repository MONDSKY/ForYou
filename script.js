const letterText = `I’m writing this because my heart won’t let me keep all of this inside any longer. There are a thousand things I want to say and only a few words that somehow feel small against everything I feel for you, but I’ll try anyway, because you deserve the truth even if it hurts to give it. I don’t want to let you go. Saying that out loud feels like stepping off a cliff. I keep replaying the quiet moments:) the way your laugh cut through the noise, how your hand felt in mine when the world seemed heavy, the little habits you didn’t even notice that I loved more than I should. Those memories sit in me like light that won’t go out. I cling to them not because I’m afraid of moving on, but because letting them go feels like erasing the part of me that is yours. I also know that love isn’t only about holding on. Love is honesty. Love is the courage to admit when we’ve been wrong, the humility to ask for forgiveness, and the grace to set someone free if that is what they need. I have made mistakes:) some I can name, others I’m still learning to see. I have been stubborn, careless, or blind at times when you needed me to be present. For every small hurt I caused and every promise I didn’t keep, I am sorry. I wish I could go back and choose differently, and I’m learning how to be the kind of person who would choose differently next time.
If you read this, please know one thing clearly. I will talk to you one day. I will find the courage to say the words I’ve been too afraid to say, to sit across from you with an open heart and ask for your forgiveness. I don’t know when that day will come, and I won’t pressure you or myself with a timetable. But I make you this promise, promise that I will show up when the time is right, not with excuses, but with accountability, with tenderness, with the honesty you deserve. I will hear you. I will listen more than I speak. I will accept whatever answer you give me, even if it isn’t the one I hope for. Until that day, I am learning to let go in the only way I can by holding you gently in memory while I build myself into someone better. Letting go for now doesn’t mean I stop loving you. It means I accept the present and give you the space to breathe, to heal, to be whoever you need to be. I believe loving someone also means wanting their peace, even if it means stepping back. I will love you in the quiet ways: in the kindness I show to others, in the respect I give to our past, and in the patience I practice every day. I will love you until my last breath. Saying that isn’t a threat or a plea, it’s a truth shaped by years of care and by a heart that refuses to forget what you gave me. That love doesn’t bind you; it frees me to carry gratitude instead of regret. It frees me to wish you joy without asking for it in return. If you ever think of me, I hope you think of the good we shared and of the lessons we learned together, not only the pain that may have come after. If forgiveness comes, I will accept it humbly and carry it like a second chance not to take you back for my comfort, but to honor the growth we both deserve. If forgiveness doesn’t come, I will still thank you for the time we had, for the ways you made me laugh, for the ways you changed me. Either way, I promise to keep your dignity intact in everything I say and do. I’m not asking you to wait, to decide, or to fix anything. I only ask that, if this reaches you, you know the truth of me: I am sorry. I am learning. I will ask for forgiveness in person when I’m ready and when you are willing. And until then, I will love you quietly, deeply, honestly until my very last breath, sorry for everything.`;

// split into words but keep newlines as paragraph breaks
function splitIntoWords(text) {
  // Replace double newlines with a special token to preserve paragraphs
  const paraToken = '       ';
  const withToken = text.replace(/\n{2,}/g, paraToken);
  // split on spaces but keep tokens as separate "words"
  return withToken.split(/\s+/).map(w => w === paraToken ? '\n\n' : w);
}

const words = splitIntoWords(letterText);

const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const textContainer = document.getElementById('textContainer');
const replayBtn = document.getElementById('replayBtn');
const fastBtn = document.getElementById('fastBtn');

let idx = 0;
let intervalId = null;
let speed = 220; // ms per word (adjustable)

function revealNextWord() {
  if (idx >= words.length) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }
  const w = words[idx++];
  if (w === '\n\n') {
    // paragraph break
    textContainer.innerHTML += '<p></p>';
    // keep scroll to bottom
    textContainer.scrollTop = textContainer.scrollHeight;
    return;
  }
  // Add a space before all words except when starting or after paragraph tag
  // If last node is a <p>, append inside it
  const lastChild = textContainer.lastElementChild;
  let targetNode = textContainer;
  if (lastChild && lastChild.tagName === 'P') targetNode = lastChild;
  if (targetNode.childNodes.length === 0) {
    targetNode.appendChild(document.createTextNode(w));
  } else {
    targetNode.appendChild(document.createTextNode(' ' + w));
  }
  // auto-scroll
  textContainer.scrollTop = textContainer.scrollHeight;
}

function startReveal() {
  if (intervalId) return;
  // if already finished, do nothing
  if (idx >= words.length) return;
  intervalId = setInterval(revealNextWord, speed);
  // reveal first word quickly if none shown
  revealNextWord();
}

function openEnvelopeAndReveal() {
  envelope.classList.add('open');
  // Show letter (CSS handles)
  // start revealing after slight delay so envelope flap animates
  setTimeout(startReveal, 650);
}

function resetAll() {
  envelope.classList.remove('open');
  clearInterval(intervalId);
  intervalId = null;
  idx = 0;
  textContainer.innerHTML = '';
}

envelope.addEventListener('click', () => {
  // if already open and reveal in progress, do nothing
  if (!envelope.classList.contains('open')) openEnvelopeAndReveal();
});

envelope.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (!envelope.classList.contains('open')) openEnvelopeAndReveal();
  }
});

replayBtn.addEventListener('click', () => {
  resetAll();
  // small delay then open again
  setTimeout(openEnvelopeAndReveal, 120);
});

fastBtn.addEventListener('click', () => {
  if (speed === 220) {
    speed = 50; // faster
    fastBtn.textContent = 'Normal speed';
  } else {
    speed = 220;
    fastBtn.textContent = 'Reveal Faster';
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(revealNextWord, speed);
  }
});
