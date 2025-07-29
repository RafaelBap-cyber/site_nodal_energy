import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, Search, ArrowRight } from "lucide-react";

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
    }
  ];

  const categories = ["Todos", "Energia Solar", "Eficiência Energética", "Tributário", "Sustentabilidade"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-[#0c4809] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Blog Nodal Energy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Insights, tendências e análises sobre o futuro da energia no Brasil
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "Todos" && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Artigo em Destaque</h2>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-green-200">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-primary to-green-600 p-8 text-white flex items-center justify-center">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-4">Destaque</Badge>
                      <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Badge variant="outline" className="mb-4">{featuredPost.category}</Badge>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <Button>
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

      {/* Blog Posts Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Artigos Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow bg-white border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <Button variant="outline" size="sm">
                        Ler Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Receba Nossos Insights</h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Assine nossa newsletter e receba as últimas tendências do setor energético
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              placeholder="Seu e-mail"
              className="bg-white text-black"
            />
            <Button variant="secondary">
              Assinar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;