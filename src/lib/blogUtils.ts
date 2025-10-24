// Utilitários para gerenciar posts do blog
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime?: string;
  category: string;
  featured?: boolean;
  tags?: string[];
  coverImage?: string;
  slug?: string;
}

// Função para carregar posts do localStorage
export const loadPostsFromStorage = (): BlogPost[] => {
  try {
    const storedPosts = localStorage.getItem('nodalEnergyPosts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      return Array.isArray(posts) ? posts : [];
    }
  } catch (error) {
    console.error('Erro ao carregar posts do localStorage:', error);
  }
  return [];
};

// Função para salvar posts no localStorage
export const savePostsToStorage = (posts: BlogPost[]): void => {
  try {
    localStorage.setItem('nodalEnergyPosts', JSON.stringify(posts));
  } catch (error) {
    console.error('Erro ao salvar posts no localStorage:', error);
  }
};

// Função para adicionar um novo post
export const addPost = (post: BlogPost): void => {
  const posts = loadPostsFromStorage();
  posts.push(post);
  savePostsToStorage(posts);
};

// Função para atualizar um post existente
export const updatePost = (updatedPost: BlogPost): void => {
  const posts = loadPostsFromStorage();
  const index = posts.findIndex(p => p.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    savePostsToStorage(posts);
  }
};

// Função para remover um post
export const removePost = (postId: string): void => {
  const posts = loadPostsFromStorage();
  const filteredPosts = posts.filter(p => p.id !== postId);
  savePostsToStorage(filteredPosts);
};

// Função para obter posts por categoria
export const getPostsByCategory = (category: string): BlogPost[] => {
  const posts = loadPostsFromStorage();
  if (category === 'Todos') return posts;
  return posts.filter(post => post.category === category);
};

// Função para buscar posts
export const searchPosts = (searchTerm: string): BlogPost[] => {
  const posts = loadPostsFromStorage();
  if (!searchTerm.trim()) return posts;
  
  const term = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term) ||
    post.author.toLowerCase().includes(term) ||
    post.tags?.some(tag => tag.toLowerCase().includes(term))
  );
};

// Função para obter post por ID
export const getPostById = (postId: string): BlogPost | undefined => {
  const posts = loadPostsFromStorage();
  return posts.find(post => post.id === postId);
};

// Função para obter posts em destaque
export const getFeaturedPosts = (): BlogPost[] => {
  const posts = loadPostsFromStorage();
  return posts.filter(post => post.featured);
};

// Função para obter posts recentes
export const getRecentPosts = (limit: number = 10): BlogPost[] => {
  const posts = loadPostsFromStorage();
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Função para gerar slug único
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Função para calcular tempo de leitura estimado
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

// Função para validar post
export const validatePost = (post: Partial<BlogPost>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!post.title?.trim()) errors.push('Título é obrigatório');
  if (!post.excerpt?.trim()) errors.push('Resumo é obrigatório');
  if (!post.content?.trim()) errors.push('Conteúdo é obrigatório');
  if (!post.author?.trim()) errors.push('Autor é obrigatório');
  if (!post.category?.trim()) errors.push('Categoria é obrigatória');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função para converter HTML para Markdown simples
export const htmlToMarkdown = (html: string): string => {
  if (!html) return '';
  
  let markdown = html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '__$1__')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n')
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, '\n$1\n')
    .replace(/<ol[^>]*>(.*?)<\/ol>/gi, '\n$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]*>/g, '') // Remove tags HTML restantes
    .replace(/\n\s*\n/g, '\n\n') // Remove linhas em branco extras
    .trim();
  
  return markdown;
};

// Função para limpar HTML indevido e converter para texto limpo (melhorada)
export const cleanHtmlContent = (html: string): string => {
  if (!html) return '';
  
  // Se o conteúdo já parece ser Markdown (não tem tags HTML), retornar como está
  if (!/<[^>]*>/.test(html)) {
    return html.trim();
  }
  
  // Criar um elemento temporário para processar o HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remover scripts e estilos
  const scripts = tempDiv.querySelectorAll('script, style');
  scripts.forEach(el => el.remove());
  
  // Processar o HTML de forma mais inteligente
  let cleanContent = html;
  
  // 1. Primeiro, normalizar quebras de linha
  cleanContent = cleanContent
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n');
  
  // 2. Converter tags de formatação para Markdown (uma vez só)
  cleanContent = cleanContent
    // Converter tags b/strong para ** (apenas se não tiver estilos problemáticos)
    .replace(/<b[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/b>/gi, '$1')
    .replace(/<strong[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/strong>/gi, '$1')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    
    // Converter tags i/em para * (apenas se não tiver estilos problemáticos)
    .replace(/<i[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/i>/gi, '$1')
    .replace(/<em[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/em>/gi, '$1')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    
    // Converter tags u para __ (apenas se não tiver estilos problemáticos)
    .replace(/<u[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/u>/gi, '$1')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '__$1__');
  
  // 3. Remover tags de fonte problemáticas (completamente)
  cleanContent = cleanContent
    .replace(/<font[^>]*size\s*=\s*["']?\d+["']?[^>]*>(.*?)<\/font>/gi, '$1')
    .replace(/<font[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/font>/gi, '$1')
    .replace(/<font[^>]*>(.*?)<\/font>/gi, '$1');
  
  // 4. Remover tags span e div com estilos inline
  cleanContent = cleanContent
    .replace(/<span[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<div[^>]*style\s*=\s*["'][^"']*["'][^>]*>(.*?)<\/div>/gi, '\n$1\n')
    .replace(/<div[^>]*>(.*?)<\/div>/gi, '\n$1\n');
  
  // 5. Converter cabeçalhos para Markdown
  cleanContent = cleanContent
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n');
  
  // 6. Converter parágrafos
  cleanContent = cleanContent
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');
  
  // 7. Converter listas
  cleanContent = cleanContent
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, '\n$1\n')
    .replace(/<ol[^>]*>(.*?)<\/ol>/gi, '\n$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1');
  
  // 8. Converter links
  cleanContent = cleanContent
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // 9. Converter citações
  cleanContent = cleanContent
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n');
  
  // 10. Converter código
  cleanContent = cleanContent
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // 11. Remover todas as outras tags HTML restantes
  cleanContent = cleanContent.replace(/<[^>]*>/g, '');
  
  // 12. Limpar formatação Markdown duplicada (melhorado)
  cleanContent = cleanContent
    // Remover asteriscos duplicados
    .replace(/\*\*\s*\*\*/g, '**')
    .replace(/\*\s\*/g, ' ')
    // Remover underscores duplicados
    .replace(/__\s*__/g, '__')
    .replace(/_\s_/g, ' ')
    // Limpar espaços antes e depois de formatação
    .replace(/\s+\*\*/g, ' **')
    .replace(/\*\*\s+/g, '** ')
    .replace(/\s+\*/g, ' *')
    .replace(/\*\s+/g, '* ')
    .replace(/\s+__/g, ' __')
    .replace(/__\s+/g, '__ ')
    .replace(/\s+_/g, ' _')
    .replace(/_\s+/g, '_ ')
    // Limpar formatação duplicada específica
    .replace(/\*\*([^*]+)\*\*\*/g, '**$1**')
    .replace(/\*([^*]+)\*\*/g, '*$1*')
    .replace(/__([^_]+)___/g, '__$1__')
    .replace(/_([^_]+)_/g, '_$1_');
  
  // 13. Limpar quebras de linha e espaços
  cleanContent = cleanContent
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
  
  return cleanContent;
};

// Função para criar posts de exemplo
export const createExamplePosts = (): BlogPost[] => {
  const examplePosts: BlogPost[] = [
    {
      id: "1",
      title: "O Futuro da Energia Solar no Brasil",
      excerpt: "Análise das tendências e oportunidades no mercado de energia solar brasileiro para os próximos anos.",
      content: "O Brasil está vivenciando uma revolução no setor de energia solar. Com o aumento da demanda por energia limpa e renovável, o país tem se destacado como um dos principais mercados para investimentos em energia solar.\n\n## Principais Tendências\n\n- Crescimento exponencial da capacidade instalada\n- Redução dos custos de equipamentos\n- Novas políticas de incentivo governamental\n- Aumento da conscientização ambiental\n\n## Oportunidades de Mercado\n\nO setor solar brasileiro oferece diversas oportunidades para investidores, empresas e consumidores que buscam reduzir custos energéticos e contribuir para a sustentabilidade.",
      author: "Equipe Nodal Energy",
      date: "2024-01-15",
      readTime: "5 min",
      category: "Energia Solar",
      featured: true,
      tags: ["energia solar", "brasil", "sustentabilidade"]
    },
    {
      id: "2",
      title: "Como Reduzir Custos Energéticos em 30%",
      excerpt: "Estratégias práticas para empresas que buscam eficiência energética e redução de custos operacionais.",
      content: "A eficiência energética é uma das principais preocupações das empresas modernas. Com o aumento dos custos de energia, implementar estratégias de otimização se tornou essencial para manter a competitividade.\n\n## Estratégias de Eficiência\n\n### 1. Auditoria Energética\nRealize uma análise completa do consumo energético da sua empresa para identificar pontos de melhoria.\n\n### 2. Automação de Sistemas\nImplemente sistemas inteligentes que otimizem o uso de energia automaticamente.\n\n### 3. Treinamento da Equipe\nCapacite seus colaboradores para práticas mais eficientes de uso energético.\n\n## Resultados Esperados\n\nCom a implementação dessas estratégias, é possível alcançar uma redução significativa nos custos energéticos, contribuindo para a sustentabilidade e lucratividade da empresa.",
      author: "Equipe Nodal Energy",
      date: "2024-01-10",
      readTime: "7 min",
      category: "Eficiência Energética",
      featured: false,
      tags: ["eficiência energética", "custos", "empresas"]
    }
  ];
  
  return examplePosts;
};

// Função para exportar posts como Markdown
export const exportPostAsMarkdown = (post: BlogPost): string => {
  let markdown = `---\n`;
  markdown += `title: "${post.title}"\n`;
  markdown += `author: "${post.author}"\n`;
  markdown += `date: "${post.date}"\n`;
  markdown += `category: "${post.category}"\n`;
  markdown += `excerpt: "${post.excerpt}"\n`;
  
  if (post.tags && post.tags.length > 0) {
    markdown += `tags: [${post.tags.map(t => `"${t}"`).join(', ')}]\n`;
  }
  
  if (post.coverImage) {
    markdown += `coverImage: "${post.coverImage}"\n`;
  }
  
  if (post.featured) {
    markdown += `featured: true\n`;
  }
  
  markdown += `---\n\n`;
  markdown += `# ${post.title}\n\n`;
  markdown += `**Autor:** ${post.author} | **Data:** ${new Date(post.date).toLocaleDateString('pt-BR')} | **Categoria:** ${post.category}\n\n`;
  markdown += `${post.excerpt}\n\n`;
  markdown += `---\n\n`;
  markdown += post.content;
  
  return markdown;
};
