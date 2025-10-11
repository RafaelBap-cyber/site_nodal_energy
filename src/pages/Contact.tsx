import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const handleCall = () => {
    window.open('tel:+5519998704240', '_self');
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "E-mail Corporativo",
      content: "fcarrasco@nodalenergy.com.br",
      description: "Para propostas comerciais e parcerias"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefone/WhatsApp",
      content: "+55 19 99870-4240",
      description: "Atendimento de segunda a sábado"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Localização",
      content: "Campinas, SP",
      description: "Atendemos todo o território nacional"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      subtitle: "Fábio Carrasco",
      url: "https://linkedin.com/in/fabio-carrasco-baptista-7114464",
      description: "Conecte-se profissionalmente"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      subtitle: "Loida Duarte",
      url: "https://linkedin.com/in/loida-duarte-ba624343",
      description: "Conecte-se profissionalmente"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      subtitle: "NodalEnergy",
      url: "https://www.linkedin.com/company/nodal-energy/posts/?feedView=all",
      description: "Acompanhe nossas atualizações"
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
                <Send className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-6xl font-light mb-8 text-gray-900 tracking-tight">
              Entre em
              <span className="block text-primary font-semibold">Contato</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pronto para transformar a eficiência energética da sua empresa? 
              Entre em contato conosco e descubra como podemos ajudar.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">

        <div className="space-y-12">
          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border-green-200 shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Informações de Contato</CardTitle>
                <CardDescription>
                  Entre em contato conosco através dos canais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="p-4 bg-primary/10 rounded-full text-primary">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        <p className="text-primary font-medium text-lg mb-1">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-green-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Redes Sociais</CardTitle>
                <CardDescription>
                  Acompanhe nossos projetos e novidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 ease-in-out group"
                    >
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{social.title}</h3>
                        <p className="text-sm text-primary font-medium">{social.subtitle}</p>
                        <p className="text-xs text-muted-foreground">{social.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <Card className="bg-primary text-primary-foreground border-green-200">
            <CardContent className="p-12">
              <h2 className="text-3xl font-light mb-4 text-white">Consulta Gratuita</h2>
              <p className="text-lg mb-6 opacity-90">
                Oferecemos uma análise inicial gratuita do potencial de economia energética da sua empresa.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={handleCall}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;