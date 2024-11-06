import { useState, useEffect } from 'react';

interface TypingTestProps {
  testText: string;
  onReset: () => void;  // Recebendo função de reset como prop
}

const TypingTest: React.FC<TypingTestProps> = ({ testText, onReset }) => {
  const [inputText, setInputText] = useState<string>(''); 
  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const [time, setTime] = useState<number>(0); 
  const [isComplete, setIsComplete] = useState<boolean>(false); 
  const [totalErrors, setTotalErrors] = useState<number>(0); // Acumulando os erros

  // Função que inicia o cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isComplete) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning || isComplete) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning, isComplete]);

  // Verifica se o usuário completou o texto
  useEffect(() => {
    if (inputText === testText) {
      setIsComplete(true);
      setIsRunning(false);
    }
  }, [inputText, testText]);

  // Função que calcula o número de palavras por minuto (WPM)
  const calculateWPM = (textLength: number, time: number): number => {
    const words = textLength / 5; // Aproximadamente 5 caracteres por palavra
    const minutes = time / 60;
    return Math.round(words / minutes);
  };

  // Função para comparar o texto digitado com o texto original e contar os erros
  const compareText = (inputText: string, originalText: string) => {
    let correctChars = 0;
    let errors = 0;
    let highlightedText = ''; // Para armazenar o texto com erros em vermelho

    // Para comparar o texto do usuário com o original
    for (let i = 0; i < originalText.length; i++) {
      if (inputText[i] === originalText[i]) {
        correctChars++;
        highlightedText += originalText[i]; // Texto correto
      } else if (inputText[i] !== originalText[i] && inputText[i] !== undefined) {
        errors++;
        highlightedText += `<span class="text-red-500">${inputText[i]}</span>`; // Texto errado em vermelho
      } else {
        highlightedText += ''; // Caso o usuário não tenha digitado nada ainda
      }
    }

    // O erro é contado de forma acumulada, sem resetar
    return { correctChars, errors, highlightedText };
  };

  // Lida com a mudança de texto no campo de input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRunning) setIsRunning(true);
    setInputText(e.target.value);

    // Atualiza os erros sempre que o texto muda, mas NÃO resetando os erros anteriores
    const { errors } = compareText(e.target.value, testText);
    setTotalErrors(errors);  // Acumula os erros sem resetá-los
  };

  // Função de reset
  const handleResetClick = () => {
    setInputText('');
    setTime(0);
    setIsComplete(false);
    setIsRunning(false);
    setTotalErrors(0); // Reseta o contador de erros quando o teste for reiniciado
    onReset();  // Chama o reset da página principal
  };

  // Resultado final
  const { correctChars, errors, highlightedText } = compareText(inputText, testText);
  const wpm = calculateWPM(inputText.length, time);

  return (
    <div>
      <p className="mb-4 dark:text-white text-black">{testText}</p>
      
      {/* Exibe o texto com erros em vermelho enquanto digita */}
      <div 
        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-indigo-500 mb-4"
        dangerouslySetInnerHTML={{ __html: highlightedText }} // Exibe o texto com destaque para os erros
      />
      
      <textarea
        value={inputText}
        onChange={handleChange}
        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-indigo-500"
        placeholder="Comece a digitar aqui..."
        disabled={isComplete}
      />
      
      <div className="mt-4 dark:text-white text-black">
        <p>Tempo: {time} segundos</p>
        <p>Caracteres Corretos: {correctChars}</p>
        <p>Precisão: {((1 - errors / testText.length) * 100).toFixed(2)}%</p>
        <p>Palavras por Minuto (WPM): {wpm}</p>
        <p>Erros Totais: {totalErrors}</p>
        {isComplete && <p className="text-green-600 font-bold">Teste Completo!</p>}
      </div>
      
      {/* Mostrando o texto digitado e os erros ao final */}
      {isComplete && (
        <div className="mt-4">
          <p className="text-gray-500">Texto digitado:</p>
          <p>{inputText}</p>
          <p className="text-red-500 font-bold">Erros: {totalErrors}</p>
        </div>
      )}

      {/* Botão de reset */}
      <button 
        onClick={handleResetClick} 
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
      >
        Resetar
      </button>
    </div>
  );
};

export default TypingTest;
