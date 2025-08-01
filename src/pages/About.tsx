import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Award, ExternalLink, User } from "lucide-react";
import fabioPortrait from "@/assets/fabio-portrait.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const About = () => {
  const projects = [
    {
      id: 1,
      title: "Modernização Sistema de Iluminação Industrial",
      client: "Indústria Metalúrgica SP",
      image: project1,
      status: "Concluído",
      date: "2024",
      savings: "45%",
      description: "Substituição completa do sistema de iluminação por LED inteligente, resultando em economia significativa de energia e melhoria na qualidade da iluminação.",
      technologies: ["LED Inteligente", "Sensores de Movimento", "Sistema de Controle"]
    },
    {
      id: 2,
      title: "Instalação Solar Fotovoltaica",
      client: "Centro Comercial RJ",
      image: project2,
      status: "Concluído",
      date: "2023",
      savings: "60%",
      description: "Projeto de energia solar com capacidade de 500kWp, incluindo sistema de monitoramento em tempo real e integração com a rede elétrica.",
      technologies: ["Painéis Solares", "Inversores", "Monitoramento IoT"]
    },
    {
      id: 3,
      title: "Automação Predial Inteligente",
      client: "Edifício Corporativo SP",
      image: project3,
      status: "Em Andamento",
      date: "2024",
      savings: "35%",
      description: "Implementação de sistema de automação completo incluindo HVAC inteligente, controle de iluminação e gestão energética centralizada.",
      technologies: ["BMS", "HVAC Inteligente", "Dashboard Analítico"]
    }
  ];

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
              Sobre &
              <span className="block text-primary font-semibold">Projetos</span>
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

        {/* Projects Section */}
        <section>
          <h2 className="text-3xl font-light mb-12 text-center text-gray-900">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant={project.status === "Concluído" ? "default" : "secondary"}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {project.client}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Economia Energética:</span>
                      <span className="text-lg font-bold text-primary">{project.savings}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">Tecnologias:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-20 py-20 bg-green-100 rounded-lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-6 text-gray-900">O que dizem nossos clientes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Depoimentos de empresas que transformaram seus processos energéticos conosco.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-green-200 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-102 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "A abordagem consultiva da Nodal Energy foi crucial para otimizar nossos processos e reduzir custos. 
                  Eles superaram as expectativas com soluções inovadoras e suporte técnico de alto nível."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <div>
                    <div className="font-semibold">Alex Silva</div>
                    <div className="text-sm text-gray-600">Operations Manager, Lumina Group</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-102 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "Reduzimos 40% dos nossos custos energéticos em apenas 8 meses. A expertise da Nodal Energy 
                  em projetos fotovoltaicos transformou nossa operação."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Maria Rodriguez</div>
                    <div className="text-sm text-gray-600">CEO, TechSolar Brasil</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-102 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "O suporte em análise tributária nos ajudou a identificar oportunidades que não víamos. 
                  Profissionalismo e resultados excepcionais."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    CF
                  </div>
                  <div>
                    <div className="font-semibold">Carlos Ferreira</div>
                    <div className="text-sm text-gray-600">CFO, Indústrias Verdes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-20 py-16 bg-green-200 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-12 text-gray-900">Números que Impressionam</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">100+</div>
                <p className="text-gray-600">Projetos Concluídos</p>
              </div>
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">R$ 50M</div>
                <p className="text-gray-600">Em Economias Geradas</p>
              </div>
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">1000+</div>
                <p className="text-gray-600">Toneladas CO₂ Evitadas</p>
              </div>
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">98%</div>
                <p className="text-gray-600">Satisfação do Cliente</p>
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