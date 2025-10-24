import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Save, X, Download, Upload, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import AdminLogin from '@/components/AdminLogin';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  metaDescription?: string;
  keywords: string[];
  date: string;
  slug: string;
  readTime: string;
  featured: boolean;
}

const Admin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();

  // Carregar posts da API
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      
      // Tentar carregar da API primeiro
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setIsLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API não disponível, usando localStorage');
      }
      
      // Fallback: usar localStorage
      const savedPosts = localStorage.getItem('blog_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        // Posts padrão se não houver dados salvos
        const defaultPosts = [
          {
            id: "1",
            title: "O Futuro da Energia Solar no Brasil",
            content: "O Brasil está vivenciando uma revolução no setor de energia solar...",
            author: "Equipe Nodal Energy",
            category: "Energia Solar",
            excerpt: "Análise das tendências e oportunidades no mercado de energia solar brasileiro.",
            tags: ["energia solar", "brasil", "sustentabilidade"],
            coverImage: "/images/hero-energy-production.jpg",
            metaDescription: "Análise do futuro da energia solar no Brasil",
            keywords: ["energia solar", "brasil", "sustentabilidade"],
            date: "2024-01-15",
            slug: "o-futuro-da-energia-solar-no-brasil",
            readTime: "5 min",
            featured: true
          }
        ];
        setPosts(defaultPosts);
        localStorage.setItem('blog_posts', JSON.stringify(defaultPosts));
      }
      
      setIsLoading(false);
      
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar posts",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      // Tentar salvar via API primeiro
      try {
        const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
        const method = editingPost ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });

        if (response.ok) {
          toast({
            title: "Sucesso",
            description: editingPost ? "Post atualizado!" : "Post criado!"
          });
          setShowEditor(false);
          setEditingPost(null);
          setIsEditing(false);
          loadPosts(); // Recarregar posts
          return;
        }
      } catch (apiError) {
        console.log('API não disponível, usando localStorage');
      }

      // Fallback: usar localStorage
      const currentPosts = [...posts];
      const newPost = {
        ...postData,
        id: editingPost ? editingPost.id : Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        slug: postData.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() || 'novo-post',
        readTime: postData.content ? Math.ceil(postData.content.length / 1000) + ' min' : '1 min',
        author: postData.author || 'Equipe Nodal Energy',
        category: postData.category || 'Energia Solar',
        tags: postData.tags || [],
        keywords: postData.keywords || [],
        featured: postData.featured || false
      };

      if (editingPost) {
        const index = currentPosts.findIndex(p => p.id === editingPost.id);
        if (index !== -1) {
          currentPosts[index] = newPost;
        }
      } else {
        currentPosts.unshift(newPost);
      }

      setPosts(currentPosts);
      localStorage.setItem('blog_posts', JSON.stringify(currentPosts));

      toast({
        title: "Sucesso",
        description: editingPost ? "Post atualizado!" : "Post criado!"
      });
      setShowEditor(false);
      setEditingPost(null);
      setIsEditing(false);

    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar post",
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      // Tentar deletar via API primeiro
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Post deletado!"
          });
          loadPosts(); // Recarregar posts
          return;
        }
      } catch (apiError) {
        console.log('API não disponível, usando localStorage');
      }

      // Fallback: usar localStorage
      const currentPosts = posts.filter(p => p.id !== id);
      setPosts(currentPosts);
      localStorage.setItem('blog_posts', JSON.stringify(currentPosts));

      toast({
        title: "Sucesso",
        description: "Post deletado!"
      });

    } catch (error) {
      console.error('Erro ao deletar post:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar post",
        variant: "destructive"
      });
    }
  };

  const handleExportPosts = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blog-posts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPosts = JSON.parse(e.target?.result as string);
          savePostsToStorage(importedPosts);
          toast({
            title: "Sucesso",
            description: "Posts importados com sucesso!"
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao importar posts",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Mostrar login se não autenticado
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor de Blog Local</h1>
            <p className="text-gray-600">Gerencie o conteúdo do seu blog localmente</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setEditingPost(null);
                setIsEditing(false);
                setShowEditor(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
            <Button
              variant="outline"
              onClick={handleExportPosts}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportPosts}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-gray-500">por {post.author}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      {post.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">Destaque</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPost(post);
                        setIsEditing(true);
                        setShowEditor(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showEditor && (
          <BlogEditor
            post={editingPost}
            isEditing={isEditing}
            onSave={handleSavePost}
            onClose={() => {
              setShowEditor(false);
              setEditingPost(null);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
};


// Componente Editor de Blog
const BlogEditor = ({ 
  post, 
  isEditing, 
  onSave, 
  onClose 
}: { 
  post: BlogPost | null;
  isEditing: boolean;
  onSave: (data: Partial<BlogPost>) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    author: 'Equipe Nodal Energy',
    category: 'Energia Solar',
    excerpt: '',
    tags: [],
    coverImage: '',
    metaDescription: '',
    keywords: [],
    featured: false
  });

  useEffect(() => {
    if (post && isEditing) {
      setFormData(post);
    }
  }, [post, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag]
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? 'Editar Post' : 'Novo Post'}</CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título do post"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Autor *</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Nome do autor"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Categoria *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Energia Solar">Energia Solar</option>
                  <option value="Eficiência Energética">Eficiência Energética</option>
                  <option value="Tributário">Tributário</option>
                  <option value="Sustentabilidade">Sustentabilidade</option>
                  <option value="Inovação">Inovação</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagem de Capa</label>
                <Input
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="URL da imagem"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resumo *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve descrição do post"
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Conteúdo *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Conteúdo do post em Markdown"
                className="w-full p-2 border border-gray-300 rounded-md h-64"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Digite uma tag e pressione Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="text-sm">Post em destaque</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Atualizar' : 'Criar'} Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
