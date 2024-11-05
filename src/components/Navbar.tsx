import { useState } from 'react';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import useTheme from '../hooks/useTheme'; // Hook para troca de tema
import { useTranslation } from 'next-i18next'; // Hook para i18n
import { useRouter } from 'next/router';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (language: 'en' | 'pt') => {
    i18n.changeLanguage(language);
    router.push(router.pathname, router.asPath, { locale: language });
    setIsOpen(false); // Fechar a sidebar ao trocar de idioma
  };

  return (
    <div className="relative">
      {/* Botão para abrir a Sidebar */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('menu')}</h2>

          {/* Seletor de idioma */}
          <div className="mb-6">
            <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-2">{t('selectLanguage')}</h3>
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value as 'en' | 'pt')} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          {/* Botão de troca de tema */}
          <div>
            <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-2">{t('theme')}</h3>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center space-x-2 w-full p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
              <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fundo escuro para quando a sidebar estiver aberta */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
