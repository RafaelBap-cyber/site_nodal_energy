import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Leaf, Zap, BarChart3, Shield, ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-energy-production.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const aboutCards = [
    {
      title: "Quem Somos",
      content: [
        "A Nodal Energy atua na transição energética no Brasil, oferecendo soluções claras e eficientes em energias renováveis e eficiência energética para os setores industrial e comercial. Nosso objetivo é conectar conhecimento técnico, tecnologia e recursos naturais para gerar valor sustentável aos nossos clientes.",
        "Nosso portfólio inclui prospecção de áreas, elaboração de pareceres de acesso, negociação de usinas fotovoltaicas e implantação de projetos de eficiência energética, além de análises tributárias voltadas à redução de custos e otimização de resultados.",
        "Com uma abordagem consultiva e integrada, desenvolvemos projetos personalizados que unem desempenho energético, sustentabilidade e segurança regulatória, sempre alinhados às necessidades e estratégias de cada cliente. Atuamos também na resolução de impasses e questões regulatórias, assegurando os direitos dos clientes no setor de energia, com profissionalismo e colaboração.",
        "Contamos com assessoria jurídica especializada, disponível sempre que necessário, garantindo que as soluções estejam alinhadas às exigências legais e regulatórias. Nossa atuação integra aspectos técnicos, regulatórios e jurídicos, proporcionando uma visão completa e estratégica do setor elétrico para os clientes.",
        "A equipe da Nodal Energy combina experiência técnica, regulatória e jurídica, sendo fundada e liderada por Fábio Carrasco, engenheiro eletricista com mais de 25 anos de experiência no setor elétrico, e contando com Loida Duarte, advogada com formação em Direito e Ciências Contábeis, MBA em Controladoria, com foco em tributação e experiência em gestão industrial e comercial em distribuidora de energia.",
        "Juntos, combinamos conhecimento técnico e jurídico-tributário para entregar soluções completas, seguras e sustentáveis no setor de energia."
      ]
    },
    {
      title: "Nossa História",
      content: [
        "A Nodal Energy nasceu do desejo de Fábio Carrasco de empreender após anos de experiência no setor elétrico corporativo. Fábio atuou na gestão de soluções técnicas e comerciais para grandes clientes, incluindo ligações novas, geração distribuída e mercado livre, com participação em análises de projetos e resolução de impasses regulatórios, além de profundo conhecimento em operação, perdas não técnicas e faturamento.",
        "Percebendo que o setor elétrico exige soluções que considerem aspectos regulatórios e jurídicos, Fábio convidou a Dra. Loida Duarte para integrar a empresa. Loida trouxe sua expertise tributária, experiência no setor elétrico com atuação no comercial, incluindo faturamento, vivência em grandes clientes e serviços técnico-comerciais, e 10 anos de gestão no setor industrial, fortalecendo a abordagem integrada da Nodal Energy.",
        "Hoje, a Nodal Energy combina conhecimento técnico, regulatório e jurídico para entregar soluções personalizadas e estratégicas, apoiando clientes industriais e comerciais a reduzir custos, otimizar processos e gerar valor sustentável, sempre com segurança e confiança.",
        "O diferencial da Nodal Energy está na abordagem prática e integrada, que une conhecimento técnico, experiência regulatória e visão jurídica, garantindo que cada solução seja eficiente, segura e alinhada às necessidades de cada cliente."
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aboutCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aboutCards.length) % aboutCards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const services = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Negociação de usinas",
      description: "Apoiamos na negociação e implantação de usinas fotovoltaicas, garantindo performance e sustentabilidade"
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Projetos Personalizados",
      description: "Desenvolvemos soluções sob medida em energia, alinhadas às necessidades do setor industrial e comercial."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Eficiência e análise tributária",
      description: "Implantamos projetos de eficiência energética e realizamos análises tributárias para reduzir custos e emissões."
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Prospecção de Áreas",
      description: "Identificamos locais com alto potencial para projetos de energia renovável, otimizando recursos e resultados."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Assessoria em Impasses Regulatórios",
      description: "Oferecemos suporte estratégico e jurídico-técnico para empresas do setor de energia, atuando na resolução de impasses e questões regulatórias."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-background"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-white text-foreground tracking-tight">
            Conectando Energia
            <span className="block text-primary font-semibold">Tecnologia e Sustentabilidade</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Transformamos empresas através de soluções inteligentes em energia,
            reduzindo custos e impacto ambiental.
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm">
              <Link to="/contatos">Entre em Contato</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section - Carrossel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-20">
            {/* Carrossel Container */}
            <div className="relative">
              {/* Navegação por setas */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 border border-primary/20 hover:border-primary/40"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 border border-primary/20 hover:border-primary/40"
                aria-label="Próximo slide"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-primary" />
              </button>

              {/* Card Atual */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {aboutCards.map((card, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Card className="bg-white border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 mx-2 md:mx-4">
                        <CardHeader className="pb-4 md:pb-6 px-4 md:px-6">
                          <CardTitle className="text-2xl md:text-4xl font-light text-gray-900 text-center">
                            {card.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 md:px-6">
                          <div className="space-y-3 md:space-y-4">
                            {card.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores */}
              <div className="flex justify-center mt-8 space-x-3">
                {aboutCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-primary scale-125'
                        : 'bg-primary/30 hover:bg-primary/60'
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Cards de Estatísticas */}
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-12">
              Nossos Resultados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">45%</div>
                    <div className="text-sm md:text-base text-muted-foreground">Redução de Custos na Autoprodução</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">7%</div>
                    <div className="text-sm md:text-base text-muted-foreground">Créditos Energéticos</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">12%</div>
                    <div className="text-sm md:text-base text-muted-foreground">Diminuição de Carbono</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">32%</div>
                    <div className="text-sm md:text-base text-muted-foreground">Aumento de Eficiência</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-br from-secondary via-green-50 to-emerald-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-300/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-8 text-gray-900">Soluções Energéticas para o seu Negócio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Oferecemos soluções completas em eficiência energética, 
              desde auditoria até implementação e monitoramento contínuo.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
            {/* Card 1: Negociação de usinas */}
            <Card className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] text-center hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-3 cursor-pointer border-primary/30 hover:border-primary/60 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Zap className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold mb-3">Negociação de usinas</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Apoiamos na negociação e implantação de usinas fotovoltaicas, garantindo performance e sustentabilidade
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 2: Projetos Personalizados */}
            <Card className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] text-center hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-3 cursor-pointer border-primary/30 hover:border-primary/60 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Leaf className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold mb-3">Projetos Personalizados</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Desenvolvemos soluções sob medida em energia, alinhadas às necessidades do setor industrial e comercial.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 3: Eficiência e análise tributária */}
            <Card className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] text-center hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-3 cursor-pointer border-primary/30 hover:border-primary/60 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <BarChart3 className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold mb-3">Eficiência e análise tributária</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Implantamos projetos de eficiência energética e realizamos análises tributárias para reduzir custos e emissões.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 4: Prospecção de Áreas */}
            <Card className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] text-center hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-3 cursor-pointer border-primary/30 hover:border-primary/60 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <MapPin className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold mb-3">Prospecção de Áreas</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Identificamos locais com alto potencial para projetos de energia renovável, otimizando recursos e resultados.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 5: Assessoria em Impasses Regulatórios */}
            <Card className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] text-center hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-3 cursor-pointer border-primary/30 hover:border-primary/60 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold mb-3">Assessoria em Impasses Regulatórios</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Oferecemos suporte estratégico e jurídico-técnico para empresas do setor de energia, atuando na resolução de impasses e questões regulatórias.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light mb-8 text-center text-white">Perguntas Frequentes sobre Energia</h2>
            <p className="text-lg text-gray-200 mb-12 text-center leading-relaxed">
              Esclareça dúvidas sobre eficiência, renováveis e soluções estratégicas para seu negócio.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-3 text-white">Como a eficiência reduz custos?</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Projetos eficientes cortam desperdícios e despesas, elevando a competitividade e sustentabilidade empresarial.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light mb-3 text-white">Quais os ganhos das renováveis?</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Fontes renováveis reduzem emissões, custos e dependência de combustíveis fósseis no setor corporativo.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-3 text-white">O que é análise tributária no setor?</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Identificamos oportunidades fiscais em energia, otimizando encargos e ampliando o retorno do investimento.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light mb-3 text-white">Por que optar por projetos sob medida?</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Soluções personalizadas atendem demandas específicas, maximizando resultados e acelerando a transição energética.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              {/* Botão de contato removido */}
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA removida */}
    </div>
  );
};

export default Home;