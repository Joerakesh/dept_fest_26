type SoundKind = "select" | "confirm";
let audioContext: AudioContext | null = null;

export function playUiSfx(kind: SoundKind) {
  if (typeof window === "undefined") return;
  const Context = window.AudioContext;
  if (!Context) return;
  audioContext ??= new Context();
  if (audioContext.state === "suspended") void audioContext.resume();
  const notes = kind === "confirm" ? [392, 587] : [220];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext!.createOscillator();
    const gain = audioContext!.createGain();
    const start = audioContext!.currentTime + index * 0.055;
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, start + 0.075);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
    oscillator.connect(gain);
    gain.connect(audioContext!.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.1);
  });
}
