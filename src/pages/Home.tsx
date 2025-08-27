import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Leaf, Zap, BarChart3, Shield, ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-energy-production.jpg";

const Home = () => {
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/sobre">
                Conheça Nossos Projetos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm">
              <Link to="/contatos">Entre em Contato</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Sobre a Nodal Energy</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                A Nodal Energy lidera a transição energética no Brasil, oferecendo soluções inovadoras em energias renováveis e eficiência para setores industrial e comercial. Atuamos de forma estratégica, conectando recursos naturais a tecnologia para gerar valor sustentável.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Nosso portfólio inclui prospecção de áreas, elaboração de pareceres de acesso, negociação de usinas fotovoltaicas e implantação de projetos de eficiência energética. Também realizamos análises tributárias para reduzir custos e emissões de carbono.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Com abordagem consultiva e integrada, desenvolvemos projetos personalizados que aliam performance energética e sustentabilidade, sempre focados nas necessidades do cliente e no impacto positivo ao meio ambiente.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Conte com a Nodal Energy para identificar oportunidades, otimizar operações e impulsionar resultados sustentáveis no setor de energia.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-light mb-4 text-gray-900">Nossa História</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sendo uma das pioneiras no mercado de Energias Renováveis, 
                desenvolvemos uma abordagem única que combina tecnologia de ponta 
                com conhecimento profundo do setor. Nosso foco é entregar soluções 
                personalizadas que geram resultados mensuráveis.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>45% de Redução de Custos na Autoprodução</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>7% Créditos Energéticos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>12% Diminuição de Carbono</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">32%</div>
                    <div className="text-muted-foreground">Aumento de Eficiência</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">35%</div>
                    <div className="text-muted-foreground">Economia Média</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Soluções Energéticas para o seu Negócio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Oferecemos soluções completas em eficiência energética, 
              desde auditoria até implementação e monitoramento contínuo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/40">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Context Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-8 text-gray-900">O Setor de Eficiência Energética</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-semibold text-primary mb-2">R$ 200bi</div>
                <p className="text-gray-600">Potencial de economia no Brasil</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-primary mb-2">30%</div>
                <p className="text-gray-600">Redução possível no consumo</p>
              </div>
             </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              O Brasil possui um dos maiores potenciais mundiais para eficiência energética. 
              Com o crescimento da consciência ambiental e pressões regulatórias, 
              empresas que investem em eficiência energética hoje estarão na vanguarda 
              da sustentabilidade amanhã.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light mb-8 text-center text-gray-900">Perguntas Frequentes sobre Energia</h2>
            <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
              Esclareça dúvidas sobre eficiência, renováveis e soluções estratégicas para seu negócio.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-3 text-primary">Como a eficiência reduz custos?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Projetos eficientes cortam desperdícios e despesas, elevando a competitividade e sustentabilidade empresarial.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light mb-3 text-primary">Quais os ganhos das renováveis?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fontes renováveis reduzem emissões, custos e dependência de combustíveis fósseis no setor corporativo.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-3 text-primary">O que é análise tributária no setor?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Identificamos oportunidades fiscais em energia, otimizando encargos e ampliando o retorno do investimento.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light mb-3 text-primary">Por que optar por projetos sob medida?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Soluções personalizadas atendem demandas específicas, maximizando resultados e acelerando a transição energética.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/contatos">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light mb-6 text-white">Pronto para Transformar sua Empresa?</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Faça uma consulta gratuita e descubra como podemos reduzir seus custos energéticos.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contatos">
              Solicitar Consulta Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;