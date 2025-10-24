import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import { BlogPost } from "@/lib/blogUtils";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      
      // Tentar carregar da API primeiro
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const posts = await response.json();
          const foundPost = posts.find((p: BlogPost) => p.slug === slug);
          if (foundPost) {
            setPost(foundPost);
            setLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('API não disponível, usando localStorage');
      }
      
      // Fallback: usar localStorage
      const savedPosts = localStorage.getItem('blog_posts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const foundPost = posts.find((p: BlogPost) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post não encontrado');
        }
      } else {
        setError('Post não encontrado');
      }
      
      setLoading(false);
      
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setError('Erro ao carregar post');
      setLoading(false);
    }
  };

  // Função para processar formatação Markdown básica
  const processMarkdownFormatting = (text: string): string => {
    let processedText = text;
    
    // Converter **negrito** para <strong>
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Converter *itálico* para <em>
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Converter __sublinhado__ para <u>
    processedText = processedText.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Converter `código` para <code>
    processedText = processedText.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Converter [texto](link) para <a>
    processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" className="text-primary hover:underline">$1</a>');
    
    // Converter quebras de linha duplas em parágrafos
    processedText = processedText.replace(/\n\n/g, '</p><p>');
    
    // Converter quebras de linha simples em <br>
    processedText = processedText.replace(/\n/g, '<br>');
    
    // Converter ## para h2
    processedText = processedText.replace(/## (.*?)(<br>|$)/g, '<h2 className="text-2xl font-bold mt-6 mb-4">$1</h2>');
    
    // Converter ### para h3
    processedText = processedText.replace(/### (.*?)(<br>|$)/g, '<h3 className="text-xl font-semibold mt-4 mb-3">$1</h3>');
    
    // Converter - para listas
    processedText = processedText.replace(/^- (.*?)(<br>|$)/gm, '<li className="ml-4">$1</li>');
    
    // Envolver em parágrafo se não estiver
    if (!processedText.startsWith('<')) {
      processedText = `<p>${processedText}</p>`;
    }
    
    return processedText;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
          <p className="text-gray-600 mb-6">O post que você está procurando não existe ou foi removido.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Botão voltar */}
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Destaque</Badge>
                )}
              </div>
              
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </CardTitle>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-500" />
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              {post.coverImage && (
                <div className="mb-6">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: processMarkdownFormatting(post.content) 
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
