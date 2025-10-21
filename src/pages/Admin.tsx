import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadPosts();
      } else {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar posts",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        loadPosts();
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso!"
        });
      } else {
        toast({
          title: "Erro",
          description: data.error || "Credenciais inválidas",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login",
        variant: "destructive"
      });
    }
  };

  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
        loadPosts();
      } else {
        throw new Error('Erro ao salvar post');
      }
    } catch (error) {
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
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Post deletado!"
        });
        loadPosts();
      } else {
        throw new Error('Erro ao deletar post');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar post",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPosts([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CMS Nodal Energy</h1>
            <p className="text-gray-600">Gerencie o conteúdo do seu blog</p>
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
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
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

// Componente de Login
const LoginForm = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Usuário</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
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
