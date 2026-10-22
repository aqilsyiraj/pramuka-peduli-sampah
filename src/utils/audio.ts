// Web Audio API Synthesizer & Speech Synthesizer for Kids Interactive Experience

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuteState(muted: boolean) {
  isAudioMuted = muted;
  if (muted && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function getMuteState(): boolean {
  return isAudioMuted;
}

/**
 * Play a cheerful high chime when kid gets a sorting answer correct
 */
export function playCorrectSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + index * 0.08);

    gain.gain.setValueAtTime(0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.2, now + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.35);
  });
}

/**
 * Play a gentle low boop when wrong (friendly, not jarring for elementary school kids)
 */
export function playWrongSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

/**
 * Play soft button pop
 */
export function playClickSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * Play celebration fanfare when level is completed or badge won
 */
export function playSuccessSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const melody = [
    { freq: 523.25, time: 0, dur: 0.12 },     // C5
    { freq: 659.25, time: 0.14, dur: 0.12 },  // E5
    { freq: 783.99, time: 0.28, dur: 0.12 },  // G5
    { freq: 1046.50, time: 0.44, dur: 0.35 }, // C6
    { freq: 880.00, time: 0.82, dur: 0.15 },  // A5
    { freq: 1046.50, time: 1.0, dur: 0.45 },  // C6
  ];

  melody.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0, now + note.time);
    gain.gain.linearRampToValueAtTime(0.25, now + note.time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + note.dur + 0.05);
  });
}

/**
 * Synthesizes a clap sound using filtered white noise
 */
function playClap(timeOffset: number) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + timeOffset;
  const bufferSize = ctx.sampleRate * 0.06;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1100;
  filter.Q.value = 2.0;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.06);
}

/**
 * Authentic Indonesian Pramuka Clap rhythm:
 * Prok-prok-prok (3), Prok-prok-prok (3), Prok-prok-prok-prok-prok-prok-prok (7)
 */
export function playTepukPramuka(onBeat?: (clapIndex: number) => void): () => void {
  if (isAudioMuted) {
    if (onBeat) onBeat(-1);
    return () => {};
  }

  const beatTimes = [
    // 1st group: 3 claps
    0.0, 0.22, 0.44,
    // 2nd group: 3 claps
    0.85, 1.07, 1.29,
    // 3rd group: 7 fast claps
    1.70, 1.88, 2.06, 2.24, 2.42, 2.60, 2.80
  ];

  const timeouts: number[] = [];

  beatTimes.forEach((time, index) => {
    playClap(time);
    if (onBeat) {
      const tid = window.setTimeout(() => {
        onBeat(index);
        if (index === beatTimes.length - 1) {
          window.setTimeout(() => onBeat(-1), 400);
        }
      }, time * 1000);
      timeouts.push(tid);
    }
  });

  return () => {
    timeouts.forEach((tid) => clearTimeout(tid));
  };
}

/**
 * Web Speech API narration in Indonesian (Bahasa Indonesia)
 */
export function speakIndonesian(text: string) {
  if (isAudioMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel(); // Stop current speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95; // Slightly slower for elementary kids
  utterance.pitch = 1.05; // Slightly friendly tone

  // Try to find an Indonesian voice
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('Indonesian'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
