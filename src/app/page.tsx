'use client';

import { useState } from 'react';
import TypingTest from '../components/TypingTest';
import useTheme from '../hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTranslation } from 'next-i18next'; 
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '@/components/Navbar';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { t, i18n } = useTranslation(); // Inclui o idioma atual
  
  const texts = {
    en: {
      easy: [
        "This is an easy typing test.",
        "The cat is sleeping.",
        "Typing is a fun activity."
      ],
      medium: [
        "This medium test contains more words.",
        "The quick brown fox jumps over the lazy dog.",
        "Speed typing helps you improve your accuracy."
      ],
      hard: [
        "The typing speed test can be very challenging.",
        "Improving typing speed requires practice and patience.",
        "Some typists can reach over 100 words per minute."
      ]
    },
    pt: {
      easy: [
        "Este é um teste de digitação fácil.",
        "O gato está dormindo.",
        "Digitar é uma atividade divertida."
      ],
      medium: [
        "Este teste médio contém mais palavras.",
        "O rápido cachorro marrom pula sobre o cão preguiçoso.",
        "Testes de digitação ajudam a melhorar sua precisão."
      ],
      hard: [
        "O teste de velocidade de digitação pode ser muito desafiador.",
        "Melhorar a velocidade de digitação requer prática e paciência.",
        "Alguns digitadores conseguem atingir mais de 100 palavras por minuto."
      ]
    }
  };

  // Função para obter texto aleatório
  const getRandomText = (language: 'en' | 'pt', difficulty: 'easy' | 'medium' | 'hard'): string => {
    const options = texts[language][difficulty];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const handleStart = () => {
    const randomText = getRandomText(i18n.language as 'en' | 'pt', difficulty);
    setIsStarted(true);
    console.log(randomText); // Testando para ver o texto sorteado
  };

  const handleReset = () => {
    setIsStarted(false);
  };

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative`}>

      <Navbar />
      
      <button
        onClick={toggleTheme}
        className="absolute top-4 left-4 flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-lg shadow-lg"
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
        <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
      </button>

      <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>
        </div>

        {/* Seletor de dificuldade */}
        <div className="mb-4">
          <label className="mr-4 text-gray-700 dark:text-gray-300">{t('difficulty')}</label>
          <select 
            value={difficulty} 
            onChange={(e) => handleDifficultyChange(e.target.value as 'easy' | 'medium' | 'hard')} 
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="easy">{t('easy')}</option>
            <option value="medium">{t('medium')}</option>
            <option value="hard">{t('hard')}</option>
          </select>
        </div>

        {/* Botão para iniciar */}
        {!isStarted ? (
          <button 
            onClick={handleStart} 
            className="w-full bg-indigo-500 text-white py-2 rounded-lg"
          >
            {t('start')}
          </button>
        ) : (
          <TypingTest testText={getRandomText(i18n.language as 'en' | 'pt', difficulty)} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
