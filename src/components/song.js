// ── The desktop's one song ──
// "Late Night Commits": a short original lo-fi loop, played by the browser itself (Web Audio),
// so there's no audio file to download and nothing to license.
//
// Want a real recording instead? Put an MP3 you're allowed to use in public/audio/ and set
// SONG_URL below (e.g. '/audio/my-song.mp3'); the widget will play that file instead.

export const SONG_URL = '';

export const SONG = {
  title: 'Late Night Commits',
  artist: 'CodedByKlaudia',
  album: 'Desktop Sessions',
  /** shown in the widget; the generated loop repeats seamlessly underneath */
  length: 96,
};

const BPM = 78;
const BEAT = 60 / BPM;
// Fmaj9 – Em7 – Dm9 – Cmaj7, a bar (4 beats) each
const CHORDS = [
  [53, 57, 60, 64, 67],
  [52, 55, 59, 62, 66],
  [50, 53, 57, 60, 64],
  [48, 52, 55, 59, 62],
];
const BASS = [41, 40, 38, 36];
// a little melody over the top, one note per half beat (null = rest)
const MELODY = [
  [72, null, 69, null, 67, null, 69, 72],
  [71, null, 67, null, 64, null, null, null],
  [69, null, 65, 67, 69, null, 72, null],
  [67, null, 64, null, 62, null, null, null],
];

const hz = (n) => 440 * 2 ** ((n - 69) / 12);

function createEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  const out = ctx.createGain();
  out.gain.value = 0;
  // warm and a bit muffled, like a cassette
  const tone = ctx.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 2400;
  tone.Q.value = 0.4;
  tone.connect(out);
  out.connect(ctx.destination);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;

  // vinyl crackle, always on underneath
  const crackle = ctx.createBufferSource();
  crackle.buffer = noise;
  crackle.loop = true;
  const crackleHp = ctx.createBiquadFilter();
  crackleHp.type = 'highpass';
  crackleHp.frequency.value = 3000;
  const crackleGain = ctx.createGain();
  crackleGain.gain.value = 0.012;
  crackle.connect(crackleHp).connect(crackleGain).connect(tone);
  crackle.start();

  /** a soft electric-piano note */
  const keys = (note, at, dur, vel = 0.06) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(vel, at + 0.02);
    g.gain.exponentialRampToValueAtTime(vel * 0.35, at + 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    g.connect(tone);
    [
      ['sine', 1, 1],
      ['triangle', 2, 0.18],
    ].forEach(([type, mul, level]) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = hz(note) * mul;
      o.detune.value = (Math.random() - 0.5) * 8;
      const lg = ctx.createGain();
      lg.gain.value = level;
      o.connect(lg).connect(g);
      o.start(at);
      o.stop(at + dur + 0.05);
    });
  };

  const bass = (note, at, dur) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = hz(note);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(0.13, at + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(tone);
    o.start(at);
    o.stop(at + dur + 0.05);
  };

  const kick = (at) => {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(110, at);
    o.frequency.exponentialRampToValueAtTime(42, at + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.32, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.32);
    o.connect(g).connect(tone);
    o.start(at);
    o.stop(at + 0.35);
  };

  const hat = (at, level = 0.03) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
    s.connect(hp).connect(g).connect(tone);
    s.start(at, Math.random());
    s.stop(at + 0.08);
  };

  const snare = (at) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1800;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.09, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
    s.connect(bp).connect(g).connect(tone);
    s.start(at, Math.random());
    s.stop(at + 0.2);
  };

  /** one bar of the song, starting at `at` */
  const bar = (index, at) => {
    const c = index % CHORDS.length;
    const swing = BEAT * 0.08;
    CHORDS[c].forEach((n, i) => keys(n, at + i * 0.015, BEAT * 3.6, 0.045));
    keys(CHORDS[c][2] + 12, at + BEAT * 2.5 + swing, BEAT * 1.4, 0.03);
    bass(BASS[c], at, BEAT * 1.6);
    bass(BASS[c] + 7, at + BEAT * 2.5 + swing, BEAT * 1.2);
    // the melody comes in on the second time round
    if (Math.floor(index / CHORDS.length) % 2 === 1) {
      MELODY[c].forEach((n, i) => n && keys(n, at + (i * BEAT) / 2 + (i % 2 ? swing : 0), BEAT * 0.9, 0.05));
    }
    kick(at);
    kick(at + BEAT * 2.5 + swing);
    snare(at + BEAT);
    snare(at + BEAT * 3);
    for (let i = 0; i < 8; i += 1) hat(at + (i * BEAT) / 2 + (i % 2 ? swing : 0), i % 2 ? 0.018 : 0.03);
  };

  let timer = 0;
  let nextBar = 0;
  let barIndex = 0;
  let startedAt = 0;
  let playedBefore = 0;
  let playing = false;

  // schedule a little ahead of time, so the beat never stumbles
  const pump = () => {
    while (nextBar < ctx.currentTime + 0.6) {
      bar(barIndex, nextBar);
      barIndex += 1;
      nextBar += BEAT * 4;
    }
  };

  return {
    play() {
      if (playing) return;
      playing = true;
      ctx.resume();
      nextBar = ctx.currentTime + 0.08;
      startedAt = ctx.currentTime;
      out.gain.cancelScheduledValues(ctx.currentTime);
      out.gain.setTargetAtTime(0.8, ctx.currentTime, 0.3);
      pump();
      timer = window.setInterval(pump, 150);
    },
    pause() {
      if (!playing) return;
      playing = false;
      playedBefore += ctx.currentTime - startedAt;
      window.clearInterval(timer);
      out.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
      window.setTimeout(() => !playing && ctx.suspend(), 600);
    },
    /** back to the first bar */
    restart() {
      playedBefore = 0;
      startedAt = ctx.currentTime;
      barIndex = 0;
      if (playing) nextBar = ctx.currentTime + 0.05;
    },
    /** seconds played so far */
    time() {
      return playedBefore + (playing ? ctx.currentTime - startedAt : 0);
    },
    dispose() {
      window.clearInterval(timer);
      ctx.close();
    },
  };
}

/** One shared player, so the widget and the dock control the same song */
let engine = null;
let audio = null;
const listeners = new Set();
let state = { playing: false };
const emit = () => listeners.forEach((l) => l(state));

export const player = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get playing() {
    return state.playing;
  },
  toggle() {
    if (SONG_URL) {
      if (!audio) {
        audio = new Audio(SONG_URL);
        audio.loop = true;
      }
      if (state.playing) audio.pause();
      else audio.play();
    } else {
      if (!engine) engine = createEngine();
      if (state.playing) engine.pause();
      else engine.play();
    }
    state = { playing: !state.playing };
    emit();
  },
  /** back to the beginning of the song */
  restart() {
    if (SONG_URL) {
      if (audio) audio.currentTime = 0;
    } else if (engine) {
      engine.restart();
    }
  },
  /** seconds into the song (wraps round at its length) */
  time() {
    if (SONG_URL) return audio ? audio.currentTime : 0;
    return engine ? engine.time() % SONG.length : 0;
  },
  duration() {
    if (SONG_URL) return audio && Number.isFinite(audio.duration) ? audio.duration : SONG.length;
    return SONG.length;
  },
};
