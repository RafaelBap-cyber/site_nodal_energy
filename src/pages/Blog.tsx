import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight, X, Linkedin, MessageCircle, MessageSquare, Phone, Mail } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "O Futuro da Energia Solar no Brasil",
      excerpt: "Análise das tendências e oportunidades no mercado de energia solar brasileiro para os próximos anos.",
      content: "O Brasil está vivenciando uma revolução no setor de energia solar...",
      author: "Equipe Nodal Energy",
      date: "2024-01-15",
      readTime: "5 min",
      category: "Energia Solar",
      featured: true
    },
    {
      id: 2,
      title: "Como Reduzir Custos Energéticos em 30%",
      excerpt: "Estratégias práticas para empresas que buscam eficiência energética e redução de custos operacionais.",
      content: "A eficiência energética é uma das principais preocupações...",
      author: "Equipe Nodal Energy",
      date: "2024-01-10",
      readTime: "7 min",
      category: "Eficiência Energética",
      featured: false
    },
    {
      id: 3,
      title: "Análise Tributária no Setor Energético",
      excerpt: "Entenda as principais oportunidades fiscais e como otimizar os investimentos em energia.",
      content: "O setor energético brasileiro oferece diversas oportunidades...",
      author: "Equipe Nodal Energy",
      date: "2024-01-05",
      readTime: "6 min",
      category: "Tributário",
      featured: false
    },
    {
      id: 4,
      title: "Tecnologias IoT na Gestão Energética",
      excerpt: "Como a Internet das Coisas está revolucionando o monitoramento e controle de energia em empresas.",
      content: "A IoT está transformando a forma como gerenciamos energia...",
      author: "Equipe Nodal Energy",
      date: "2024-01-03",
      readTime: "8 min",
      category: "Inovação",
      featured: false
    },
    {
      id: 5,
      title: "Baterias de Armazenamento: O Próximo Passo",
      excerpt: "Explorando as possibilidades de armazenamento de energia e sua viabilidade no mercado brasileiro.",
      content: "O armazenamento de energia é a peça que faltava...",
      author: "Equipe Nodal Energy",
      date: "2024-01-01",
      readTime: "9 min",
      category: "Energia Solar",
      featured: false
    },
    {
      id: 6,
      title: "Certificações LEED e Sustentabilidade",
      excerpt: "Guia completo sobre certificações ambientais e como elas impactam a eficiência energética.",
      content: "As certificações LEED são fundamentais para projetos sustentáveis...",
      author: "Equipe Nodal Energy",
      date: "2023-12-28",
      readTime: "6 min",
      category: "Sustentabilidade",
      featured: false
    },
    {
      id: 7,
      title: "Microgrids: Energia Local e Resiliente",
      excerpt: "Como sistemas de microgrid estão criando comunidades energéticas mais independentes e sustentáveis.",
      content: "Os microgrids representam o futuro da distribuição de energia...",
      author: "Equipe Nodal Energy",
      date: "2023-12-25",
      readTime: "7 min",
      category: "Inovação",
      featured: false
    },
    {
      id: 8,
      title: "Hidrogênio Verde: A Energia do Futuro",
      excerpt: "Análise do potencial do hidrogênio verde como fonte de energia limpa e renovável no Brasil.",
      content: "O hidrogênio verde pode ser a solução para descarbonização...",
      author: "Equipe Nodal Energy",
      date: "2023-12-20",
      readTime: "10 min",
      category: "Sustentabilidade",
      featured: false
    },
    {
      id: 9,
      title: "Automação Predial e Eficiência",
      excerpt: "Como sistemas de automação estão otimizando o consumo energético em edifícios comerciais.",
      content: "A automação predial é essencial para eficiência energética...",
      author: "Equipe Nodal Energy",
      date: "2023-12-18",
      readTime: "5 min",
      category: "Eficiência Energética",
      featured: false
    },
    {
      id: 10,
      title: "Financiamento Verde para Projetos Energéticos",
      excerpt: "Oportunidades de financiamento sustentável para empresas que investem em eficiência energética.",
      content: "O financiamento verde está crescendo rapidamente...",
      author: "Equipe Nodal Energy",
      date: "2023-12-15",
      readTime: "6 min",
      category: "Tributário",
      featured: false
    },
    {
      id: 11,
      title: "Energia Eólica Offshore no Brasil",
      excerpt: "O potencial da energia eólica offshore e seus desafios para implementação no litoral brasileiro.",
      content: "O Brasil tem um potencial enorme para energia eólica offshore...",
      author: "Equipe Nodal Energy",
      date: "2023-12-12",
      readTime: "8 min",
      category: "Sustentabilidade",
      featured: false
    },
    {
      id: 12,
      title: "Smart Cities e Eficiência Energética",
      excerpt: "Como as cidades inteligentes estão utilizando tecnologia para otimizar o consumo de energia.",
      content: "As smart cities representam o futuro do urbanismo sustentável...",
      author: "Equipe Nodal Energy",
      date: "2023-12-10",
      readTime: "7 min",
      category: "Inovação",
      featured: false
    }
  ];

  const categories = ["Todos", "Energia Solar", "Eficiência Energética", "Tributário", "Sustentabilidade", "Inovação"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Funções para controlar o scroll
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -450,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 450,
        behavior: 'smooth'
      });
    }
  };

  // Funções para controlar o modal do artigo
  const openArticle = (article: BlogPost) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

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
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-6xl font-light mb-8 text-gray-900 tracking-tight">
              Blog
              <span className="block text-primary font-semibold">Nodal Energy</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights, tendências e análises sobre o futuro da energia no Brasil
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section - Mais Espaçado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Barra de pesquisa elegante */}
            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                />
              </div>
            </div>
            
            {/* Filtros de categoria */}
            <div className="flex justify-center">
              <div className="flex gap-3 flex-wrap justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-6 py-3 ${
                      selectedCategory === category 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post - Redesenhado */}
      {featuredPost && selectedCategory === "Todos" && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary text-primary">
                  Artigo em Destaque
                </Badge>
                <h2 className="text-4xl font-light text-gray-900">Destaque da Semana</h2>
              </div>
              
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-xl">
                <div className="lg:flex">
                  <div className="lg:w-2/5 bg-gradient-to-br from-primary to-green-600 p-12 text-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-light mb-6 leading-tight">{featuredPost.title}</h3>
                      <div className="flex items-center justify-center gap-6 text-sm opacity-90">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-12">
                    <div className="mb-6">
                      <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
                        {featuredPost.category}
                      </Badge>
                      <div className="text-sm text-gray-500 mb-4">
                        {new Date(featuredPost.date).toLocaleDateString('pt-BR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{featuredPost.excerpt}</p>
                    <Button size="lg" className="rounded-full px-8 py-3" onClick={() => openArticle(featuredPost)}>
                      Ler Artigo Completo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid - Scroll Horizontal como Cardápio */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light text-gray-900 mb-4">Artigos Recentes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore nossos insights mais recentes sobre eficiência energética e sustentabilidade
              </p>
            </div>
            
            {/* Container com scroll horizontal */}
            <div className="relative">
              {/* Botão de navegação esquerda */}
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              {/* Botão de navegação direita */}
              <button 
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
              
              {/* Scroll horizontal */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide scroll-smooth"
              >
                {regularPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-lg overflow-hidden min-w-[400px] max-w-[400px] flex-shrink-0">
                    <div className="p-8">
                      {/* Meta informações */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      {/* Categoria */}
                      <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
                        {post.category}
                      </Badge>
                      
                      {/* Título */}
                      <CardTitle className="text-2xl font-light mb-4 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      {/* Resumo */}
                      <CardDescription className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      
                      {/* Autor e botão */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white transition-all" onClick={() => openArticle(post)}>
                          Ler Mais
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Indicadores de scroll */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(regularPosts.length / 3) }, (_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section - Redesenhado */}
      <section className="py-24 bg-gradient-to-br from-primary to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            
            <h2 className="text-5xl font-light mb-8">Conecte-se Conosco</h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Tem dúvidas sobre eficiência energética? Quer discutir seu projeto? 
              Entre em contato e vamos conversar sobre como podemos ajudar sua empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90 rounded-xl px-8">
                <Link to="/contatos">
                  <Phone className="mr-2 h-4 w-4" />
                  Fale Conosco
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-primary rounded-xl px-8 bg-transparent">
                <Link to="/contatos">
                  <Mail className="mr-2 h-4 w-4" />
                  Solicitar Consultoria
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal do Artigo Completo */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
                    {selectedArticle.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(selectedArticle.date).toLocaleDateString('pt-BR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <button
                  onClick={closeArticle}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conteúdo do Artigo */}
            <div className="p-6">
              <h1 className="text-4xl font-light text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedArticle.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {selectedArticle.excerpt}
                </p>
                
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">
                    Introdução
                  </h2>
                  
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">
                    Desenvolvimento
                  </h2>
                  
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  
                  <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">
                    Conclusão
                  </h2>
                  
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Compartilhar:</span>
                  <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                <Button onClick={closeArticle} variant="outline">
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;