import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Award, User, Briefcase } from "lucide-react";

const About = () => {

  const experienceFabio = [
    {
      position: "Fundador",
      company: "Nodal Energy",
      description: "Liderança estratégica e gestão de projetos de eficiência energética."
    },
    {
      position: "Gerente de Recuperação de Energia LEC",
      company: "CPFL Energia",
      description: "Gestão de portfólio de projetos de energia renovável e eficiência."
    },
    {
      position: "Gerente de Operação do Sistema",
      company: "Energisa",
      description: "Gerenciamento da área de Operação do Sistema de Distribuição."
    },
    {
      position: "Gerente P & D",
      company: "KRAUS Muller",
      description: "Gerenciamento da área de Pesquisa e Desenvolvimento."
    },
  ];

  const experienceLoida = [
    {
      position: "Advogada | Direito Tributário",
      company: "Escritório de Advocacia",
      description: "Soluções estratégicas para o setor de energia com foco em direito tributário."
    },
    {
      position: "Coordenadora de Leitura e Entrega de Contas (LEC)",
      company: "CPFL Energia",
      description: "Coordenação de operações de leitura e entrega de contas no setor elétrico."
    },
    {
      position: "Consultoria em Inovação",
      company: "Sebrae-SP",
      description: "Consultoria estratégica em inovação para empresas e empreendedores."
    },
    {
      position: "Gerente Administrativo",
      company: "Modular Sistema Construtivo",
      description: "Gestão administrativa e operacional da empresa."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section - Minimalista e Transparente */}
      <section className="relative py-32 overflow-hidden">
        {/* Background com gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"></div>
        
        {/* Elementos decorativos sutis */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Ícone minimalista */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-6xl font-light mb-8 text-gray-900 tracking-tight">
              Equipe
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Conheça nossa história, experiência e projetos que transformaram a eficiência energética no Brasil
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Profile Section - Fábio Carrasco */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/lovable-uploads/0e0b9015-b6c5-4541-a41d-221d6efc3500.png"
                alt="Fábio Carrasco"
                className="w-80 h-80 rounded-full object-cover shadow-xl border-4 border-primary/20"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-light mb-4 text-gray-900">Fábio Carrasco</h1>
                <p className="text-xl text-primary font-semibold mb-4">
                  Fundador da Nodal Energy
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Especialista em eficiência energética com mais de 25 anos de experiência 
                  em gestão de projetos complexos no setor energético. Formado em Engenharia 
                  Elétrica e com MBA em Gestão Empresarial, Fábio combina conhecimento 
                  técnico sólido com visão estratégica de negócios.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">Pós Administração e Negócios</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">MBA Setor Elétrico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Campinas, Brasil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm">25+ Anos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Fábio Carrasco */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12 text-center text-gray-900">Experiência Profissional - Fábio Carrasco</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {experienceFabio.map((exp, index) => (
                <Card 
                  key={index} 
                  className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-primary/20 hover:border-primary/40 cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-light text-gray-900">{exp.position}</CardTitle>
                        <CardDescription className="text-primary font-semibold text-base">
                          {exp.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section - Loida Duarte */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:order-2">
              <img
                src="/lovable-uploads/Loida_img.jpg"
                alt="Loida Duarte"
                className="w-80 h-80 rounded-full object-cover shadow-xl border-4 border-primary/20"
              />
            </div>
            
            <div className="space-y-6 lg:order-1">
              <div>
                <h1 className="text-4xl font-light mb-4 text-gray-900">Loida Duarte</h1>
                <p className="text-xl text-primary font-semibold mb-4">
                  Cofundadora e Especialista em Direito Tributário
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Advogada com expertise tributária e ampla experiência nos setores industrial e elétrico. 
                  Atua na interface entre o campo técnico e o jurídico, oferecendo análises tributárias e 
                  soluções regulatórias estratégicas que equilibram segurança e eficiência.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">MBA Controladoria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="text-sm">Direito e Contábeis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Campinas, Brasil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm">10+ Anos Gestão</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Loida Duarte */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12 text-center text-gray-900">Experiência Profissional - Loida Duarte</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {experienceLoida.map((exp, index) => (
                <Card 
                  key={index} 
                  className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-primary/20 hover:border-primary/40 cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-light text-gray-900">{exp.position}</CardTitle>
                        <CardDescription className="text-primary font-semibold text-base">
                          {exp.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;