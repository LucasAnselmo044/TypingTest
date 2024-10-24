import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração de internacionalização (idiomas)
  i18n: {
    locales: ['en', 'pt'],     // Idiomas suportados: inglês e português
    defaultLocale: 'en',       // Idioma padrão: inglês  // Detecta automaticamente o idioma do navegador
  },
};

export default nextConfig;
