import { useState, useEffect } from 'react';

interface TypingTestProps {
  testText: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ testText }) => {
  const [inputText, setInputText] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  // Função que inicia o cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning]);

  // Função que calcula o número de palavras por minuto (WPM)
  const calculateWPM = (textLength: number, time: number): number => {
    const words = textLength / 5; // Aproximadamente 5 caracteres por palavra
    const minutes = time / 60;
    return Math.round(words / minutes);
  };

  // Função para comparar o texto digitado com o texto original
  const compareText = (inputText: string, originalText: string) => {
    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === originalText[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / originalText.length) * 100;
    return { correctChars, accuracy };
  };

  // Lida com a mudança de texto no campo de input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRunning) setIsRunning(true);
    setInputText(e.target.value);
  };

  // Resultado final
  const { correctChars, accuracy } = compareText(inputText, testText);
  const wpm = calculateWPM(inputText.length, time);

  return (
    <div>
      <p className="mb-4 text-gray-600">{testText}</p>
      <textarea
        value={inputText}
        onChange={handleChange}
        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Comece a digitar aqui..."
      />
      <div className="mt-4">
        <p>Tempo: {time} segundos</p>
        <p>Caracteres Corretos: {correctChars}</p>
        <p>Precisão: {accuracy.toFixed(2)}%</p>
        <p>Palavras por Minuto (WPM): {wpm}</p>
      </div>
    </div>
  );
};

export default TypingTest;
