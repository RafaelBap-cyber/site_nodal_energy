import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Award, ExternalLink, User } from "lucide-react";
import fabioPortrait from "@/assets/fabio-portrait.jpg";

const About = () => {


  const certifications = [
    "Postgraduate Degree - Administração e Negócios",
    "MBA Setor Elétrico",
    "MBA em Gestão Empresarial",
    "Engenharia Elétrica - UNILINS"
  ];

  const experience = [
    {
      period: "2025 - Presente",
      position: "CEO & Fundador",
      company: "Nodal Energy",
      description: "Liderança estratégica e gestão de projetos de eficiência energética."
    },
    {
      period: "2018 - 2025",
      position: "Gerente de Recuperação de Energia LEC",
      company: "CPFL Energia",
      description: "Gestão de portfólio de projetos de energia renovável e eficiência."
    },
    {
      period: "2005 - 2017",
      position: "Gerente de Operação do Sitema",
      company: "Energisa",
      description: "Gerenciamento da área de Operação do Sistema de Distribuição."
    }
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
              Sobre
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Conheça nossa história, experiência e projetos que transformaram a eficiência energética no Brasil
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Profile Section */}
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
                  CEO & Fundador da Nodal Energy
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Especialista em eficiência energética com mais de 15 anos de experiência 
                  em gestão de projetos complexos no setor energético. Formado em Engenharia 
                  Elétrica e com MBA em Gestão Empresarial, Fábio combina conhecimento 
                  técnico sólido com visão estratégica de negócios.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">100+ Projetos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">MBA Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Campinas, Brasil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm">15+ Anos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12 text-center text-gray-900">Experiência Profissional</h2>
          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 mb-8 last:mb-0">
                <div className="md:w-1/4">
                  <Badge variant="outline" className="text-sm">
                    {exp.period}
                  </Badge>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-light text-gray-900">{exp.position}</h3>
                  <p className="text-primary font-semibold mb-2">{exp.company}</p>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12 text-center text-gray-900">Certificações & Formação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="text-center cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-8">
                  <Award className="h-10 w-10 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <p className="font-semibold text-lg transition-colors duration-300 hover:text-primary leading-relaxed">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="py-32 bg-gradient-to-br from-primary/5 via-green-50 to-emerald-100 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-green-500/20 rounded-3xl mb-8 shadow-lg">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-5xl font-light mb-8 text-gray-900">Benefícios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Soluções energéticas que transformam desafios em oportunidades de crescimento e sustentabilidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Card 1: Soluções Energéticas Integradas */}
              <Card className="group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-3 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src="/src/assets/hero-energy-production.jpg" 
                      alt="Produção de Energia" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                        Soluções Energéticas Integradas
                      </h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-10">
                  <p className="text-gray-700 leading-relaxed text-xl">
                    Consultoria estratégica para eficiência e sustentabilidade. Desenvolvemos projetos personalizados para o setor industrial e comercial, otimizando recursos e reduzindo custos operacionais.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Projetos Fotovoltaicos sob Medida */}
              <Card className="group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-3 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src="/src/assets/project-2.jpg" 
                      alt="Projeto Fotovoltaico" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        Projetos Fotovoltaicos sob Medida
                      </h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-10">
                  <p className="text-gray-700 leading-relaxed text-xl">
                    Identificamos oportunidades, negociamos usinas e elaboramos pareceres de acesso para maximizar o potencial de cada cliente.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Análise Tributária Especializada */}
              <Card className="group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-3 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src="/src/assets/project-1.jpg" 
                      alt="Eficiência Energética" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        Análise Tributária Especializada
                      </h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-10">
                  <p className="text-gray-700 leading-relaxed text-xl">
                    Reduza emissões e custos com avaliações tributárias focadas no setor de energia, promovendo performance e sustentabilidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default About;