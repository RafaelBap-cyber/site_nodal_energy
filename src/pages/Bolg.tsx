import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, Upload } from "lucide-react";

interface BolgPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const Bolg = () => {
  const [posts, setPosts] = useState<BolgPost[]>([
    {
      id: 1,
      title: "Como a energia solar está mudando o Brasil",
      content: "A energia solar cresce exponencialmente no país, trazendo economia e sustentabilidade para empresas e residências.",
      author: "Equipe Nodal Energy",
      date: "2024-06-01T10:00:00Z",
      readTime: "4 min",
      category: "Energia Solar",
    },
    {
      id: 2,
      title: "Dicas para reduzir o consumo de energia em casa",
      content: "Pequenas mudanças de hábito podem gerar grande economia na conta de luz. Veja nossas dicas práticas!",
      author: "Equipe Nodal Energy",
      date: "2024-05-20T15:30:00Z",
      readTime: "3 min",
      category: "Eficiência Energética",
    },
    {
      id: 3,
      title: "O papel da inovação no setor energético",
      content: "Novas tecnologias estão revolucionando a geração, distribuição e consumo de energia no Brasil.",
      author: "Equipe Nodal Energy",
      date: "2024-05-10T09:00:00Z",
      readTime: "5 min",
      category: "Inovação",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  // Simples upload handler (mock)
  const handleUpload = () => {
    if (!title || !content) return;
    setPosts([
      ...posts,
      {
        id: Date.now(),
        title,
        content,
        author: author || "Dono do Site",
        date: new Date().toISOString(),
        readTime: "2 min",
        category: category || "Geral",
      },
    ]);
    setTitle("");
    setContent("");
    setCategory("");
    setAuthor("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog Nodal Energy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Espaço para o dono do site compartilhar novidades, artigos e informações!
          </p>
        </div>
      </section>

      {/* Upload Section (apenas para o dono do site) */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Upload className="h-5 w-5" /> Novo Post</h2>
            <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="mb-2" />
            <Input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} className="mb-2" />
            <Input placeholder="Autor (opcional)" value={author} onChange={e => setAuthor(e.target.value)} className="mb-2" />
            <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} className="w-full h-24 mb-2 p-2 border rounded" />
            <Button onClick={handleUpload} className="w-full">Publicar</Button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Posts Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground">Nenhum post publicado ainda.</div>
              )}
              {posts.map((post) => (
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
                    <CardDescription className="mb-2">Por {post.author}</CardDescription>
                    <div className="text-muted-foreground whitespace-pre-line">{post.content}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bolg; 