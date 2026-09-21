import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';

export const VoiceRecorder = ({ onTranscriptChange, initialText = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialText);
  const [recognition, setRecognition] = useState(null);
  const [audioError, setAudioError] = useState('');

  useEffect(() => {
    // Check browser speech recognition API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'pt-BR';

      rec.onresult = (event) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
        onTranscriptChange(currentText);
      };

      rec.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setAudioError('Permissão de microfone negada. Digite manualmente.');
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      setAudioError('Reconhecimento de voz não suportado neste navegador. Use a digitação.');
    }
  }, []);

  const toggleListen = () => {
    if (!recognition) {
      // Demo simulation fallback if browser lacks WebSpeech API
      setIsListening(true);
      const simulatedText = "Veículo de único dono, todas as revisões feitas na concessionária autorizada, sem nenhum retoque ou sinistro, pneus seminovos e IPVA pago.";
      let index = 0;
      const interval = setInterval(() => {
        index += 10;
        const sub = simulatedText.slice(0, index);
        setTranscript(prev => (prev ? prev + ' ' + sub : sub));
        onTranscriptChange(simulatedText);
        if (index >= simulatedText.length) {
          clearInterval(interval);
          setIsListening(false);
        }
      }, 400);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setAudioError('');
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="voice-recorder-box">
      <div className="voice-header">
        <div className="voice-title">
          <Sparkles className="icon-sparkle" size={18} />
          <span>Ditado por Voz (Áudio para Texto)</span>
        </div>
        <button
          type="button"
          onClick={toggleListen}
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          title={isListening ? 'Parar gravação' : 'Iniciar áudio'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isListening ? 'Gravando (Fale agora)...' : 'Falar Descrição'}</span>
        </button>
      </div>

      {isListening && (
        <div className="audio-wave-visualizer">
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <span className="visualizer-text">Escutando seu áudio em Português...</span>
        </div>
      )}

      {audioError && (
        <div className="audio-error-tag">
          <AlertCircle size={14} />
          <span>{audioError}</span>
        </div>
      )}
    </div>
  );
};
