import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import CMSLogin from "./CMSLogin";

const CMSButton = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Se as credenciais estão corretas, abrir o CMS
    if (credentials.username === 'fábiocarrascoCEO' && credentials.password === 'Faralufe101273') {
      // Usar a nova versão do CMS
      window.open('/admin/cms.html', '_blank');
      setShowLogin(false);
    }
    
    setIsLoading(false);
  };

  const openLogin = () => {
    setShowLogin(true);
  };

  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null;
  }

  if (showLogin) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowLogin(false)}></div>
        <div className="relative z-10">
          <CMSLogin onLogin={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={openLogin}
        className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        size="sm"
      >
        <Settings className="w-4 h-4 mr-2" />
        Admin CMS
      </Button>
    </div>
  );
};

export default CMSButton; 