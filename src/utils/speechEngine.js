// Speech Engine: Text-to-Speech (TTS), Speech-to-Text (STT), and Acoustic Analytics

export class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.transcript = '';
    this.startTime = null;
    this.onTranscriptCallback = null;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const combined = (this.transcript + ' ' + finalTranscript + ' ' + interimTranscript).trim();
          if (this.onTranscriptCallback) {
            this.onTranscriptCallback(combined);
          }
        };

        this.recognition.onerror = (event) => {
          console.warn('[Speech Engine] Recognition notice:', event.error);
        };
      }
    }
  }

  speak(text, onEnd) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick female or professional english voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) this.synth.cancel();
  }

  startListening(onTranscript) {
    this.transcript = '';
    this.startTime = Date.now();
    this.onTranscriptCallback = onTranscript;
    this.isListening = true;

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('[Speech Engine] start listening catch:', e);
      }
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('[Speech Engine] stop error:', e);
      }
    }
  }

  /**
   * Computes acoustic metrics (WPM and filler words count)
   */
  calculateAcoustics(text, durationSeconds = 30) {
    const cleanText = (text || '').trim();
    const words = cleanText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // WPM calculation
    const minutes = Math.max(0.1, durationSeconds / 60);
    const rawWpm = Math.round(wordCount / minutes);
    // Standard conversational WPM is 120-160
    const wpm = Math.min(220, Math.max(40, rawWpm || 125));

    // Filler words detection
    const fillerPatterns = [/\bum\b/gi, /\buh\b/gi, /\blike\b/gi, /\bbasically\b/gi, /\byou know\b/gi, /\bactually\b/gi];
    let fillerCount = 0;
    fillerPatterns.forEach(pat => {
      const matches = cleanText.match(pat);
      if (matches) fillerCount += matches.length;
    });

    let paceVerdict = 'Optimal Conversational Pace (120-150 WPM)';
    if (wpm < 100) paceVerdict = 'Slightly slow pace; try to deliver points more briskly';
    if (wpm > 165) paceVerdict = 'High speech rate; remember to take calm pauses';

    return {
      wordCount,
      wpm,
      fillerCount,
      paceVerdict
    };
  }
}

export const speechEngine = new SpeechEngine();
