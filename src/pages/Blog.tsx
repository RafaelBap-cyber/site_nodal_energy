import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight, X, Linkedin, MessageCircle, MessageSquare, Phone, Mail, RefreshCw } from "lucide-react";
import { 
  BlogPost, 
  syncPostsWithCMS, 
  searchPosts, 
  getPostsByCategory,
  calculateReadTime 
} from "@/lib/blogUtils";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Carregar posts dinamicamente
  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await syncPostsWithCMS();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Sincronizar posts com o CMS
  const handleSyncPosts = async () => {
    try {
      setSyncing(true);
      await loadBlogPosts();
    } finally {
      setSyncing(false);
    }
  };

  // Função para abrir artigo
  const openArticle = (post: BlogPost) => {
    setSelectedArticle(post);
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar artigo
  const closeArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

  // Filtrar posts por categoria e busca
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === "" || 
                         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Categorias únicas
  const categories = ["Todos", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Função para renderizar conteúdo Markdown simples
  const renderMarkdownContent = (content: string) => {
    if (!content) return null;

    // Converter quebras de linha em parágrafos
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => {
          const trimmedParagraph = paragraph.trim();
          
          // Verificar se é um cabeçalho
          if (trimmedParagraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-light text-gray-900 mt-8 mb-4">
                {trimmedParagraph.replace('## ', '')}
              </h2>
            );
          }
          
          if (trimmedParagraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-light text-gray-900 mt-6 mb-3">
                {trimmedParagraph.replace('### ', '')}
              </h3>
            );
          }
          
          // Verificar se é uma lista
          if (trimmedParagraph.startsWith('- ')) {
            return (
              <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                {trimmedParagraph.split('\n').map((item, itemIndex) => {
                  if (item.trim().startsWith('- ')) {
                    return (
                      <li key={itemIndex} className="text-gray-700">
                        {item.trim().replace('- ', '')}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            );
          }
          
          // Parágrafo normal
          if (trimmedParagraph) {
            return (
              <p key={index} className="text-gray-700 leading-relaxed">
                {trimmedParagraph}
              </p>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando posts...</p>
        </div>
      </div>
    );
  }

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
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Conteúdo especializado sobre energia solar, eficiência energética e sustentabilidade
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            <Button
              onClick={handleSyncPosts}
              disabled={syncing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Sincronizando...' : 'Sincronizar'}
            </Button>
          </div>

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum post encontrado</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== "Todos" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Ainda não há posts publicados"
                }
              </p>
              <Button 
                onClick={handleSyncPosts} 
                className="mt-4"
                disabled={syncing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                Recarregar Posts
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/30"
                  onClick={() => openArticle(post)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    
                    {post.readTime && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal do Artigo */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
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
                {selectedArticle.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {selectedArticle.readTime}
                  </div>
                )}
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {selectedArticle.excerpt}
                </p>
                
                {/* Renderizar conteúdo Markdown */}
                {renderMarkdownContent(selectedArticle.content)}
                
                {/* Tags */}
                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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