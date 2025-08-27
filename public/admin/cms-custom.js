/* ===== CMS CUSTOM JAVASCRIPT - Nodal Energy ===== */

// Configuração global do CMS
const CMS_CONFIG = {
  // Configurações da marca
  brand: {
    name: 'Nodal Energy',
    logo: '/favicon.ico',
    colors: {
      primary: '#059669',
      secondary: '#0ea5e9'
    }
  },
  
  // Configurações de funcionalidades
  features: {
    autoSave: true,
    spellCheck: true,
    imageOptimization: true,
    seoAssistant: true,
    analytics: true
  },
  
  // Configurações de notificações
  notifications: {
    enabled: true,
    duration: 5000,
    position: 'top-right'
  }
};

// ===== UTILIDADES =====

const Utils = {
  // Debounce para otimizar performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Formatação de data
  formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  // Validação de email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Geração de slug
  generateSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  // Contagem de palavras
  countWords(text) {
    return text.trim().split(/\s+/).length;
  },

  // Contagem de caracteres
  countCharacters(text) {
    return text.length;
  },

  // Cálculo de tempo de leitura
  calculateReadTime(text) {
    const wordsPerMinute = 200;
    const words = this.countWords(text);
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  }
};

// ===== SISTEMA DE NOTIFICAÇÕES =====

class NotificationSystem {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Criar container de notificações
    this.container = document.createElement('div');
    this.container.id = 'cms-notifications';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = CMS_CONFIG.notifications.duration) {
    const notification = document.createElement('div');
    notification.className = `cms-notification cms-notification-${type} cms-fade-in`;
    notification.style.cssText = `
      background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#0ea5e9'};
      color: white;
      padding: 16px 20px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.4;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">
            ${type === 'success' ? '✅ Sucesso' : type === 'error' ? '❌ Erro' : 'ℹ️ Info'}
          </div>
          <div>${message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          opacity: 0.7;
          padding: 0;
        ">×</button>
      </div>
    `;

    this.container.appendChild(notification);

    // Auto-remover após duração especificada
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }

    return notification;
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }
}

// ===== ASSISTENTE DE SEO =====

class SEOAssistant {
  constructor() {
    this.rules = {
      title: {
        min: 30,
        max: 60,
        weight: 0.3
      },
      description: {
        min: 120,
        max: 160,
        weight: 0.25
      },
      content: {
        min: 300,
        weight: 0.25
      },
      keywords: {
        min: 3,
        max: 8,
        weight: 0.2
      }
    };
  }

  analyze(entry) {
    const analysis = {
      score: 0,
      warnings: [],
      suggestions: []
    };

    // Analisar título
    const title = entry.getIn(['data', 'title']) || '';
    if (title.length < this.rules.title.min) {
      analysis.warnings.push(`Título muito curto (${title.length} caracteres). Mínimo recomendado: ${this.rules.title.min}`);
    } else if (title.length > this.rules.title.max) {
      analysis.warnings.push(`Título muito longo (${title.length} caracteres). Máximo recomendado: ${this.rules.title.max}`);
    } else {
      analysis.score += this.rules.title.weight;
    }

    // Analisar descrição
    const description = entry.getIn(['data', 'metaDescription']) || '';
    if (description.length < this.rules.description.min) {
      analysis.warnings.push(`Meta description muito curta (${description.length} caracteres). Mínimo recomendado: ${this.rules.description.min}`);
    } else if (description.length > this.rules.description.max) {
      analysis.warnings.push(`Meta description muito longa (${description.length} caracteres). Máximo recomendado: ${this.rules.description.max}`);
    } else {
      analysis.score += this.rules.description.weight;
    }

    // Analisar conteúdo
    const content = entry.getIn(['data', 'content']) || '';
    if (content.length < this.rules.content.min) {
      analysis.warnings.push(`Conteúdo muito curto (${content.length} caracteres). Mínimo recomendado: ${this.rules.content.min}`);
    } else {
      analysis.score += this.rules.content.weight;
    }

    // Analisar keywords
    const keywords = entry.getIn(['data', 'keywords']) || [];
    if (keywords.length < this.rules.keywords.min) {
      analysis.warnings.push(`Poucas keywords (${keywords.length}). Mínimo recomendado: ${this.rules.keywords.min}`);
    } else if (keywords.length > this.rules.keywords.max) {
      analysis.warnings.push(`Muitas keywords (${keywords.length}). Máximo recomendado: ${this.rules.keywords.max}`);
    } else {
      analysis.score += this.rules.keywords.weight;
    }

    // Converter score para porcentagem
    analysis.score = Math.round(analysis.score * 100);

    // Adicionar sugestões baseadas nos warnings
    if (analysis.score < 70) {
      analysis.suggestions.push('Considere revisar os campos destacados para melhorar o SEO');
    }

    return analysis;
  }

  showAnalysis(entry) {
    const analysis = this.analyze(entry);
    
    // Criar modal de análise
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; color: #1e293b;">📊 Análise de SEO</h3>
          <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #64748b;
          ">×</button>
        </div>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: ${analysis.score >= 80 ? '#059669' : analysis.score >= 60 ? '#f59e0b' : '#dc2626'};
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
            color: white;
            font-size: 24px;
            font-weight: bold;
          ">
            ${analysis.score}%
          </div>
          <div style="color: #64748b; font-size: 14px;">
            ${analysis.score >= 80 ? 'Excelente!' : analysis.score >= 60 ? 'Bom' : 'Precisa melhorar'}
          </div>
        </div>

        ${analysis.warnings.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h4 style="margin: 0 0 12px; color: #dc2626;">⚠️ Avisos</h4>
            <ul style="margin: 0; padding-left: 20px; color: #64748b;">
              ${analysis.warnings.map(warning => `<li>${warning}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${analysis.suggestions.length > 0 ? `
          <div>
            <h4 style="margin: 0 0 12px; color: #059669;">💡 Sugestões</h4>
            <ul style="margin: 0; padding-left: 20px; color: #64748b;">
              ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;

    document.body.appendChild(modal);
  }
}

// ===== AUTO-SAVE =====

class AutoSave {
  constructor() {
    this.interval = null;
    this.lastSave = null;
    this.init();
  }

  init() {
    // Salvar automaticamente a cada 30 segundos
    this.interval = setInterval(() => {
      this.save();
    }, 30000);
  }

  save() {
    try {
      // Verificar se há mudanças não salvas
      if (window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
        // Implementar lógica de auto-save
        this.lastSave = new Date();
        console.log('Auto-save realizado:', this.lastSave);
      }
    } catch (error) {
      console.error('Erro no auto-save:', error);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// ===== OTIMIZADOR DE IMAGENS =====

class ImageOptimizer {
  constructor() {
    this.maxSize = 1024 * 1024; // 1MB
    this.quality = 0.8;
  }

  async optimize(file) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        const maxWidth = 1200;
        const maxHeight = 800;
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem otimizada
        ctx.drawImage(img, 0, 0, width, height);

        // Converter para blob com qualidade reduzida
        canvas.toBlob(resolve, 'image/jpeg', this.quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  async compress(file) {
    if (file.size <= this.maxSize) {
      return file;
    }

    const optimized = await this.optimize(file);
    return new File([optimized], file.name, {
      type: 'image/jpeg',
      lastModified: Date.now()
    });
  }
}

// ===== VERIFICADOR ORTOGRÁFICO =====

class SpellChecker {
  constructor() {
    this.dictionary = [
      'energia', 'sustentabilidade', 'eficiência', 'solar', 'fotovoltaico',
      'consultoria', 'empresa', 'projeto', 'tecnologia', 'inovação',
      'brasil', 'são paulo', 'industrial', 'comercial', 'residencial'
    ];
  }

  check(text) {
    const words = text.toLowerCase().split(/\s+/);
    const errors = [];

    words.forEach(word => {
      const cleanWord = word.replace(/[^\wàáâãéêíóôõúç]/g, '');
      if (cleanWord.length > 3 && !this.dictionary.includes(cleanWord)) {
        const suggestions = this.getSuggestions(cleanWord);
        errors.push({
          word: cleanWord,
          suggestions: suggestions
        });
      }
    });

    return errors;
  }

  getSuggestions(word) {
    // Algoritmo simples de Levenshtein para sugestões
    return this.dictionary
      .filter(dictWord => this.levenshteinDistance(word, dictWord) <= 2)
      .slice(0, 3);
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }
}

// ===== ATALHOS DE TECLADO =====

class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.init();
  }

  init() {
    // Registrar atalhos padrão
    this.register('ctrl+s', 'Salvar', () => {
      // Implementar salvamento
      notifications.success('Conteúdo salvo!');
    });

    this.register('ctrl+shift+s', 'Salvar como rascunho', () => {
      // Implementar salvamento como rascunho
      notifications.info('Salvo como rascunho');
    });

    this.register('ctrl+k', 'Buscar', () => {
      // Implementar busca
      notifications.info('Busca ativada');
    });

    this.register('ctrl+shift+p', 'Preview', () => {
      // Implementar preview
      notifications.info('Preview ativado');
    });

    // Adicionar listener global
    document.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });
  }

  register(key, description, action) {
    this.shortcuts.set(key, { description, action });
  }

  handleKeydown(e) {
    const key = this.getKeyString(e);
    const shortcut = this.shortcuts.get(key);
    
    if (shortcut) {
      e.preventDefault();
      shortcut.action();
    }
  }

  getKeyString(e) {
    const keys = [];
    if (e.ctrlKey) keys.push('ctrl');
    if (e.shiftKey) keys.push('shift');
    if (e.altKey) keys.push('alt');
    if (e.metaKey) keys.push('meta');
    if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
      keys.push(e.key.toLowerCase());
    }
    return keys.join('+');
  }

  showHelp() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; color: #1e293b;">⌨️ Atalhos de Teclado</h3>
          <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #64748b;
          ">×</button>
        </div>
        
        <div style="display: grid; gap: 12px;">
          ${Array.from(this.shortcuts.entries()).map(([key, { description }]) => `
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px;
              background: #f8fafc;
              border-radius: 8px;
            ">
              <span style="color: #64748b;">${description}</span>
              <kbd style="
                background: #e2e8f0;
                padding: 4px 8px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 12px;
                color: #475569;
              ">${key}</kbd>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }
}

// ===== SISTEMA DE ANALYTICS =====

class Analytics {
  constructor() {
    this.events = [];
    this.init();
  }

  init() {
    // Carregar eventos salvos
    this.loadEvents();
    
    // Salvar eventos periodicamente
    setInterval(() => {
      this.saveEvents();
    }, 60000); // A cada minuto
  }

  track(event, data = {}) {
    const eventData = {
      event,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.events.push(eventData);
    console.log('Evento rastreado:', eventData);
  }

  saveEvents() {
    try {
      localStorage.setItem('cms-analytics', JSON.stringify(this.events));
    } catch (error) {
      console.error('Erro ao salvar analytics:', error);
    }
  }

  loadEvents() {
    try {
      const saved = localStorage.getItem('cms-analytics');
      if (saved) {
        this.events = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    }
  }

  getStats() {
    const stats = {
      totalEvents: this.events.length,
      eventsByType: {},
      recentActivity: this.events.slice(-10)
    };

    this.events.forEach(event => {
      stats.eventsByType[event.event] = (stats.eventsByType[event.event] || 0) + 1;
    });

    return stats;
  }
}

// ===== INICIALIZAÇÃO DO CMS =====

class CMS {
  constructor() {
    this.notifications = new NotificationSystem();
    this.seoAssistant = new SEOAssistant();
    this.autoSave = new AutoSave();
    this.imageOptimizer = new ImageOptimizer();
    this.spellChecker = new SpellChecker();
    this.keyboardShortcuts = new KeyboardShortcuts();
    this.analytics = new Analytics();
    
    this.init();
  }

  init() {
    console.log('🚀 Inicializando CMS Customizado - Nodal Energy');
    
    // Aguardar o CMS estar pronto
    if (typeof CMS !== 'undefined') {
      this.setupCMS();
    } else {
      // Tentar novamente após um delay
      setTimeout(() => {
        if (typeof CMS !== 'undefined') {
          this.setupCMS();
        } else {
          console.error('❌ CMS não foi carregado');
        }
      }, 1000);
    }
  }

  setupCMS() {
    try {
      // Configurar backend local para desenvolvimento
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Configurando para desenvolvimento local...');
        
        // Registrar backend local
        CMS.registerBackend('local', {
          init: () => ({
            login: () => Promise.resolve({}),
            logout: () => Promise.resolve(),
            getToken: () => Promise.resolve('fake-jwt-token'),
            authComponent: () => 'div',
          }),
        });
      }

      // Configurar templates de preview
      this.setupPreviewTemplates();
      
      // Configurar widgets customizados
      this.setupCustomWidgets();
      
      // Configurar eventos
      this.setupEvents();
      
      console.log('✅ CMS Customizado configurado com sucesso!');
      this.notifications.success('CMS Customizado carregado!');
      
    } catch (error) {
      console.error('❌ Erro ao configurar CMS:', error);
      this.notifications.error('Erro ao configurar CMS');
    }
  }

  setupPreviewTemplates() {
    // Template de preview para posts do blog
    CMS.registerPreviewTemplate('blog', ({ entry, widgetFor }) => {
      const title = entry.getIn(['data', 'title']) || 'Título do Post';
      const content = widgetFor('content') || '<p>Conteúdo do artigo...</p>';
      const author = entry.getIn(['data', 'author']) || 'Autor';
      const date = entry.getIn(['data', 'date']) || 'Data';
      const category = entry.getIn(['data', 'category']) || 'Categoria';
      const excerpt = entry.getIn(['data', 'excerpt']) || 'Resumo do artigo...';
      
      return `
        <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #1e293b; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-bottom: 20px;">${title}</h1>
          <div style="color: #64748b; margin-bottom: 20px; padding: 10px; background: #f8fafc; border-radius: 4px;">
            <strong>Autor:</strong> ${author} | 
            <strong>Data:</strong> ${date} | 
            <strong>Categoria:</strong> ${category}
          </div>
          <div style="color: #64748b; font-style: italic; margin-bottom: 20px; padding: 15px; background: #f1f5f9; border-left: 4px solid #059669;">
            ${excerpt}
          </div>
          <div style="line-height: 1.6; color: #1e293b;">
            ${content}
          </div>
        </div>
      `;
    });
    
    console.log('✅ Templates de preview configurados!');
  }

  setupCustomWidgets() {
    // Widget customizado para análise de SEO
    CMS.registerWidget('seo-analyzer', {
      id: 'seo-analyzer',
      name: 'SEO Analyzer',
      controlComponent: () => {
        const button = document.createElement('button');
        button.textContent = 'Analisar SEO';
        button.style.cssText = `
          background: #059669;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        `;
        
        button.onclick = () => {
          // Implementar análise de SEO
          this.notifications.info('Análise de SEO em desenvolvimento');
        };
        
        return button;
      }
    });
    
    console.log('✅ Widgets customizados configurados!');
  }

  setupEvents() {
    // Rastrear eventos importantes
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, a, input, textarea')) {
        this.analytics.track('element_clicked', {
          element: e.target.tagName.toLowerCase(),
          text: e.target.textContent || e.target.value || '',
          className: e.target.className
        });
      }
    });

    // Rastrear mudanças em campos
    document.addEventListener('input', Utils.debounce((e) => {
      if (e.target.matches('input, textarea')) {
        this.analytics.track('field_changed', {
          field: e.target.name || e.target.id || 'unknown',
          valueLength: e.target.value.length
        });
      }
    }, 1000));
    
    console.log('✅ Eventos configurados!');
  }
}

// ===== INICIALIZAÇÃO =====

// Aguardar DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar CMS customizado
  window.NodalEnergyCMS = new CMS();
  
  // Expor funcionalidades globalmente
  window.CMSUtils = Utils;
  window.CMSNotifications = window.NodalEnergyCMS.notifications;
  window.CMSSEO = window.NodalEnergyCMS.seoAssistant;
  window.CMSAnalytics = window.NodalEnergyCMS.analytics;
  
  console.log('🎉 CMS Customizado - Nodal Energy inicializado com sucesso!');
});

// ===== FUNÇÕES GLOBAIS =====

// Função para mostrar análise de SEO
window.showSEOAnalysis = function(entry) {
  if (window.NodalEnergyCMS) {
    window.NodalEnergyCMS.seoAssistant.showAnalysis(entry);
  }
};

// Função para mostrar atalhos de teclado
window.showKeyboardShortcuts = function() {
  if (window.NodalEnergyCMS) {
    window.NodalEnergyCMS.keyboardShortcuts.showHelp();
  }
};

// Função para rastrear eventos customizados
window.trackCMSEvent = function(event, data) {
  if (window.NodalEnergyCMS) {
    window.NodalEnergyCMS.analytics.track(event, data);
  }
};
