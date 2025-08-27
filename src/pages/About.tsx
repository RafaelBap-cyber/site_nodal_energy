import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Award, ExternalLink, User } from "lucide-react";
import fabioPortrait from "@/assets/fabio-portrait.jpg";

const About = () => {


  const certifications = [
    "PMP - Project Management Professional",
    "Certified Energy Manager (CEM)",
    "LEED Green Associate",
    "MBA em Gestão de Projetos",
    "Engenharia Elétrica - USP"
  ];

  const experience = [
    {
      period: "2020 - Presente",
      position: "CEO & Fundador",
      company: "Nodal Energy",
      description: "Liderança estratégica e gestão de projetos de eficiência energética."
    },
    {
      period: "2015 - 2020",
      position: "Gerente de Projetos Sênior",
      company: "EnerTech Solutions",
      description: "Gestão de portfólio de projetos de energia renovável e eficiência."
    },
    {
      period: "2010 - 2015",
      position: "Consultor em Eficiência Energética",
      company: "Green Consulting",
      description: "Consultoria técnica em otimização energética para indústrias."
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
                  Elétrica pela USP e com MBA em Gestão de Projetos, Fábio combina conhecimento 
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
                  <span className="text-sm">PMP Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">São Paulo, Brasil</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="text-center cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-6">
                  <Award className="h-8 w-8 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <p className="font-semibold transition-colors duration-300 hover:text-primary">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">Benefícios para o seu Negócio</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Soluções energéticas que transformam desafios em oportunidades de crescimento e sustentabilidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Soluções Energéticas Integradas */}
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src="/src/assets/hero-energy-production.jpg" 
                      alt="Produção de Energia" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>

                  </div>

                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    Soluções Energéticas Integradas
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                  Consultoria estratégica para eficiência e sustentabilidade. Desenvolvemos projetos personalizados para o setor industrial e comercial, otimizando recursos e reduzindo custos operacionais
                  </p>

                </CardContent>
              </Card>

              {/* Card 2: Projetos Fotovoltaicos sob Medida */}
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src="/src/assets/project-2.jpg" 
                      alt="Projeto Fotovoltaico" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>

                  </div>

                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    Projetos Fotovoltaicos sob Medida
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Identificamos oportunidades, negociamos usinas e elaboramos pareceres de acesso para maximizar o potencial de cada cliente.
                  </p>

                </CardContent>
              </Card>

              {/* Card 3: Análise Tributária Especializada */}
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src="/src/assets/project-1.jpg" 
                      alt="Eficiência Energética" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>

                  </div>

                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    Análise Tributária Especializada
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Reduza emissões e custos com avaliações tributárias focadas no setor de energia, promovendo performance e sustentabilidade.
                  </p>

                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-20 py-20 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 rounded-2xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">O que dizem nossos clientes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Depoimentos de empresas que transformaram seus processos energéticos conosco.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer max-w-lg transform rotate-1 hover:rotate-0">
                <CardContent className="p-8 relative">
                  {/* Quote marks decoration */}
                  <div className="absolute top-4 left-4 text-6xl text-primary/20 font-serif">"</div>
                  <div className="absolute bottom-4 right-4 text-6xl text-primary/20 font-serif">"</div>
                  
                  <div className="relative z-10">
                    <p className="text-gray-700 mb-8 italic leading-relaxed text-lg font-medium">
                      "A abordagem consultiva da Nodal Energy foi crucial para otimizar nossos processos e reduzir custos. 
                      Eles superaram as expectativas com soluções inovadoras e suporte técnico de alto nível."
                    </p>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/5 to-green-50 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        AS
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-900">Alex Silva</div>
                        <div className="text-sm text-gray-600">Operations Manager, Lumina Group</div>
                        <div className="flex items-center mt-2">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Bottom accent */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 text-primary/60">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Depoimento verificado</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="mt-20 py-20 bg-gradient-to-br from-primary to-green-600 text-white rounded-lg">
          <div className="text-center">
            <h2 className="text-4xl font-light mb-6 text-white">Vamos Trabalhar Juntos?</h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato para discutir como posso contribuir com seus projetos energéticos.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/contatos">
                Entrar em Contato
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;