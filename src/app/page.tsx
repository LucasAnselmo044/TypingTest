'use client';

import { useState } from 'react';
import TypingTest from '../components/TypingTest';
import useTheme from '../hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const texts = {
    easy: [
      "The rapid progression of computational theory has created unforeseen challenges, leading to groundbreaking discoveries in algorithmic complexity.",
      "The systemic effects of technology in modern society transcend conventional boundaries, reshaping communication, economics, and governance structures.",
      "Emerging paradigms in software engineering advocate for architectural cohesion in distributed systems, ensuring that scalability and fault tolerance are seamlessly integrated.",
      "Advanced neural networks are increasingly demonstrating their capabilities in pattern recognition, yielding insights with profound implications for predictive analytics.",
      "Data storage methodologies are evolving with cloud architecture, enabling scalable, on-demand computational resources to facilitate unprecedented global collaboration.",
      "The infusion of artificial intelligence within traditional industries is augmenting operational workflows, thereby enhancing both productivity and decision-making accuracy.",
      "The intersection of quantum mechanics and computational theory is fostering the development of algorithms capable of solving previously intractable problems.",
      "Agile methodologies in software development prioritize iterative progress, leveraging continuous feedback loops to optimize project deliverables.",
      "Decentralized finance (DeFi) is rapidly reshaping the landscape of financial transactions by leveraging blockchain technology for enhanced transparency and security.",
      "The ethical considerations surrounding AI development demand robust frameworks to ensure fairness, accountability, and transparency in algorithmic decision-making."
    ],
    medium: [
      "The foundation of modern programming paradigms lies in robust problem-solving frameworks, with a strong emphasis on computational efficiency and algorithmic optimization.",
      "JavaScript's event-driven architecture, particularly within the Node.js environment, enables real-time applications to seamlessly integrate server-side logic with client-side interactivity.",
      "Cloud computing platforms, such as AWS and Google Cloud, are pioneering a shift towards multi-cloud architectures, providing businesses with unparalleled flexibility and cost efficiency.",
      "Algorithmic complexity, particularly within the realm of NP-complete problems, requires advanced heuristic approaches to approximate optimal solutions within a feasible time frame.",
      "The multidisciplinary nature of software engineering mandates a holistic approach to both front-end and back-end integration, ensuring the seamless delivery of user-centric solutions.",
      "Mastering debugging techniques, such as breakpoints, stack tracing, and dynamic code analysis, is essential for optimizing code performance and identifying hidden bottlenecks.",
      "The advent of artificial intelligence in healthcare leverages predictive models to enhance diagnostic accuracy, while simultaneously reducing operational overhead in medical institutions.",
      "Version control practices, particularly when utilizing Git, facilitate the collaborative development of software by enabling distributed teams to track code changes and resolve conflicts efficiently.",
      "Data analysis methodologies increasingly rely on big data techniques, harnessing distributed computing power to extract actionable insights from vast datasets.",
      "The integration of APIs allows disparate software systems to communicate effectively, streamlining data exchange and enhancing overall system interoperability."
    ],
    hard: [
      "Artificial intelligence and machine learning are revolutionizing industries by enabling computers to analyze massive amounts of data, identify patterns, and make decisions with minimal human intervention, which has a profound impact on fields like healthcare, finance, and transportation.",
      "In a rapidly evolving tech landscape, developers and engineers must stay abreast of emerging programming paradigms, like functional programming and asynchronous programming, to create efficient, scalable, and maintainable code bases for large-scale software applications.",
      "Complex algorithms, such as those used in neural networks, require vast computational resources and in-depth understanding of both mathematics and computer science principles to optimize and make accurate predictions in fields like natural language processing and image recognition.",
      "The development of quantum computing has the potential to fundamentally change computational theory and practice, as it utilizes quantum bits, or qubits, which can represent both 0 and 1 simultaneously, allowing for unprecedented processing power for certain types of complex calculations.",
      "Cybersecurity is a critical field that involves protecting systems, networks, and data from digital attacks, and it requires a multidisciplinary approach combining knowledge of computer science, cryptography, and risk management to prevent and mitigate potential vulnerabilities.",
      "Sustainable technology practices emphasize the design and utilization of environmentally friendly hardware and software, as the tech industry grapples with minimizing electronic waste and carbon footprints associated with production and energy consumption.",
      "The process of machine learning involves feeding vast amounts of data to an algorithm, allowing it to identify and learn from patterns, which can then be used for predictive analysis in applications ranging from fraud detection to personalized recommendations.",
      "Modern web development frameworks, such as React and Angular, employ component-based architecture, which promotes reusability and modularity, making it easier for developers to maintain and scale applications as they grow in complexity.",
      "Blockchain technology, originally conceived for digital currencies, has expanded into various domains, enabling decentralized applications that provide security, transparency, and trust without relying on centralized authorities.",
      "Natural language processing is an interdisciplinary field that combines linguistics, computer science, and artificial intelligence to enable machines to understand, interpret, and respond to human language in a meaningful and contextually relevant manner."
    ]
    
  };

  const getRandomText = (difficulty: 'easy' | 'medium' | 'hard'): string => {
    const options = texts[difficulty];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const handleStart = () => {
    setIsStarted(true);
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

      <button
        onClick={toggleTheme}
        className="absolute top-4 left-4 flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-lg shadow-lg"
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </button>

      <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Typing Speed Test</h1>
        </div>

        <div className="mb-4">
          <label className="mr-4 text-gray-700 dark:text-gray-300">Difficulty</label>
          <select 
            value={difficulty} 
            onChange={(e) => handleDifficultyChange(e.target.value as 'easy' | 'medium' | 'hard')} 
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {!isStarted ? (
          <button 
            onClick={handleStart} 
            className="w-full bg-indigo-500 text-white py-2 rounded-lg"
          >
            Start
          </button>
        ) : (
          <TypingTest testText={getRandomText(difficulty)} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Home;
