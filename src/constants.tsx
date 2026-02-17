import { ProjectWithStyle, TechItem, Language, StatItem } from './types';
import {
  Code2,
  Database,
  Globe,
  Server,
  Cpu,
  Layout,
  Smartphone,
  Cloud,
  Lock,
  Zap,
  Coffee,
  Leaf,
  Atom,
  Palette,
  Shield,
  Cog,
  Sparkles
} from 'lucide-react';

// UI Translations
export const UI_TEXT = {
  es: {
    hero: {
      badge: "Disponible para nuevos desafíos estratégicos | Open to Work",
      greeting: "Soy Tiago Frencia",
      role: "Construyendo el futuro digital: software escalable con enfoque total en el usuario final.",
      sub: "Especialista en resolver desafíos técnicos complejos mediante arquitecturas robustas. Mi enfoque integra lógica de negocio con experiencia de usuario, asegurando que cada línea de código aporte valor real al producto.",
      cta: "Explorar Proyectos y Soluciones",
      scroll: "Ver Stack & Proyectos",
      stats: [
        { value: "Arquitectura Robusta", label: "Patrones de diseño y Clean Architecture" },
        { value: "Full Stack Avanzado", label: "Java, Spring Boot, React, IA" },
        { value: "Enfoque de Producto", label: "Del código a los objetivos de negocio" },
        { value: "Alto Rendimiento", label: "WebAssembly, caché y optimización" }
      ]
    },
    bento: {
      location: "Córdoba, Argentina",
      locationSub: "Base de Operaciones • UTC-3",
      techTitle: "Tech Arsenal",
      techSub: "Arquitectura escalable y soluciones de IA.",
      motoTitle: "Moto & Road Trips",
      motoSub: "Off the Keyboard",
      musicTitle: "Coding Focus Mode",
      musicSub: "Lo-fi & Deep Work",
      philTitle: "Problem Solver",
      philSub: "Transformando café en código limpio y software que cumple objetivos de negocio."
    },
    projects: {
      title: "Casos de Estudio",
      subtitle: "Proyectos complejos desarrollados desde cero para demostrar dominio técnico en situaciones del mundo real."
    },
    stack: {
      title: "Mi Stack Técnico"
    },
    modal: {
      about: "El Problema y La Solución",
      features: "Funcionalidades Clave",
      challenges: "Cómo resolví los retos técnicos",
      btnLive: "Probar Demo",
      btnCode: "Ver Repositorio"
    },
    footer: {
      cta: "¿Buscas talento?",
      subCta: "¿Tenés un desafío técnico? Transformémoslo en una solución.",
      nav: "Menú",
      social: "Conecta",
      contact: "Contacto",
      time: "Mi Zona Horaria",
      rights: "Portfolio Personal.",
      bio: "Desarrollo de software enfocado en calidad, escalabilidad y objetivos de negocio.",
      emailText: "Copiar Email",
      copiedText: "¡Copiado al portapapeles!"
    },
    nav: {
      home: "Inicio",
      work: "Proyectos",
      stack: "Stack",
      contact: "Contacto"
    }
  },
  en: {
    hero: {
      badge: "Available for strategic challenges | Open to Work",
      greeting: "I'm Tiago Frencia",
      role: "Building the digital future: scalable software with a total focus on the end user.",
      sub: "Specialist in solving complex technical challenges through robust architectures. My approach integrates business logic with user experience, ensuring that every line of code adds real value to the product.",
      cta: "Explore Projects and Solutions",
      scroll: "Explore Work",
      stats: [
        { value: "Robust Architecture", label: "Design patterns & Clean Architecture" },
        { value: "Advanced Full Stack", label: "Java, Spring Boot, React, AI" },
        { value: "Product-Led Approach", label: "From code to business objectives" },
        { value: "High Performance", label: "WebAssembly, caching & optimization" }
      ]
    },
    bento: {
      location: "Córdoba, Argentina",
      locationSub: "Operations Base • UTC-3",
      techTitle: "Tech Arsenal",
      techSub: "Focused on scalable architecture & AI solutions",
      motoTitle: "Moto & Road Trips",
      motoSub: "Off the Keyboard",
      musicTitle: "Coding Focus Mode",
      musicSub: "Lo-fi & Deep Work",
      philTitle: "Problem Solver",
      philSub: "Turning coffee into clean code and software that meets business goals."
    },
    projects: {
      title: "Case Studies",
      subtitle: "Complex projects developed to demonstrate technical mastery in real-world scenarios."
    },
    stack: {
      title: "Technical Arsenal"
    },
    modal: {
      about: "Problem & Solution",
      features: "Key Implementation Details",
      challenges: "How I solved technical hurdles",
      btnLive: "Try Live Demo",
      btnCode: "Check the Code"
    },
    footer: {
      cta: "Hiring?",
      subCta: "Have a technical challenge? I'm ready to solve it.",
      nav: "Menu",
      social: "Connect",
      contact: "Contact",
      time: "My Timezone",
      rights: "Personal Portfolio.",
      bio: "Software development focused on quality, scalability, and business goals.",
      emailText: "Copy Email",
      copiedText: "Copied to clipboard!"
    },
    nav: {
      home: "Home",
      work: "Work",
      stack: "Stack",
      contact: "Contact"
    }
  }
};

const PROJECT_CONFIGS = [
  {
    id: 'erp-lite',
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS'],
    // Image: SaaS Dashboard / Analytics Dark Mode
    brandColor: "from-sky-500/20",
    imageUrl: '/mockups/erp-lite.png',
    videoUrl: '/videos/erp-lite.webm',
    liveUrl: 'https://erp-lite-tawny.vercel.app/',
    repoUrl: 'https://github.com/TiagoFrencia/erp-lite',
    className: "md:col-span-2"
  },
  {
    id: 'medibook',
    techStack: ['React', 'Spring Boot', 'Spring Security', 'PostgreSQL'],
    // Image: Abstract Blue Tech / Connection / Cybersecurity Vibe
    brandColor: "from-blue-600/20",
    imageUrl: '/mockups/medibook.png',
    videoUrl: '/videos/Medibook.webm',
    liveUrl: 'https://medi-book-chi.vercel.app/',
    repoUrl: 'https://github.com/TiagoFrencia/MediBook',
    className: "md:col-span-1"
  },
  {
    id: 'smartcommerce',
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Gemini AI'],
    // Image: Abstract Node Network / AI Algorithms / Data Connections (Dark & Professional)
    brandColor: "from-purple-500/20",
    imageUrl: '/mockups/smartcommerce.png',
    videoUrl: '/videos/SmartCommerce.webm',
    liveUrl: 'https://smartcommerce-b2b.vercel.app/',
    repoUrl: 'https://github.com/TiagoFrencia/smartcommerce-b2b',
    className: "md:col-span-1"
  },
  {
    id: 'pydungeon',
    techStack: ['React', 'TypeScript', 'WebAssembly', 'Python (Pyodide)'],
    // Image: Retro Gaming / Arcade / Neon / Pixel Art Vibe
    brandColor: "from-amber-600/20",
    imageUrl: '/mockups/pydungeon.png',
    videoUrl: '/videos/Pydungeon.webm',
    liveUrl: 'https://py-dungeon.vercel.app/',
    repoUrl: 'https://github.com/TiagoFrencia/PyDungeon',
    className: "md:col-span-2"
  }
];

export const PROJECTS_EN: ProjectWithStyle[] = PROJECT_CONFIGS.map(config => {
  switch (config.id) {
    case 'erp-lite': return {
      ...config,
      title: 'ERP-Lite | Full Stack SaaS',
      description: 'Business management system focused on data visualization. Includes an interactive dashboard, inventory management, and JWT security.',
      longDescription: "I built ERP-Lite to demonstrate my ability to develop complete enterprise applications, connecting a robust backend architecture with an interactive frontend. The system manages sales, stock control, and clients. To facilitate evaluation by recruiters, I designed an idempotent 'Data Seeding' engine that automates the creation of a test environment with realistic metrics and statistical charts on every deployment.",
      features: [
        "Interactive Dashboard: Visualization of critical metrics (revenue, products, low stock alerts) through dynamic charts of the last 30 days.",
        "Security and Authentication: Secure login system based on JWT with Role-Based Access Control (RBAC) configured from scratch.",
        "Automated Demo Environment: Smart database initialization script that generates catalogs and transactions without duplicating records."
      ],
      challenges: [
        "Cloud Services Integration: Advanced CORS configuration and CSRF policies to allow secure communication between Vercel and Render.",
        "Resource Optimization: Architecture design that securely shares a single PostgreSQL instance across multiple isolated projects.",
        "Security Filters: Resolution of authorization blocks by enabling Preflight (OPTIONS) requests and mapping roles to authorities in Spring Security."
      ]
    };
    case 'medibook': return {
      ...config,
      title: 'MediBook | Real-time WebRTC',
      description: 'Comprehensive medical management platform. Allows scheduling and medical record administration, protected by a robust security architecture and JWT authentication.',
      longDescription: "I developed MediBook to solve the complexity of appointment and access control in a clinical environment. I completely separated the architecture: an interactive frontend in React and a scalable backend in Java (Spring Boot). To make the project easily evaluable in my portfolio, I implemented a 'Data Seeding' engine that auto-configures test users (Doctors and Patients) in the PostgreSQL database every time the server is deployed, guaranteeing a functional environment at all times.",
      features: [
        "Secure Authentication: Login system with JWT tokens and strict Role-Based Access Control (RBAC).",
        "Appointment Management: Creation, assignment, and real-time tracking of medical appointments.",
        "Smart Demo Environment: 'Demo Login' buttons on the frontend synchronized with idempotent scripts on the backend."
      ],
      challenges: [
        "Cloud Security: Resolution of network blocks (CORS) and CSRF protection by configuring Preflight (OPTIONS) requests between Vercel and Render.",
        "Complex Authorization: Mapping database roles to Spring Security authorities to solve 403 (Forbidden) errors on protected routes.",
        "Data Synchronization: Prevention of duplicate records upon server restart by verifying previous credentials before injecting test data."
      ]
    };
    case 'smartcommerce': return {
      ...config,
      title: 'SmartCommerce | AI Integration',
      description: 'B2B commercial intelligence platform. Uses generative AI to analyze sales history, predict closing opportunities, and suggest strategic actions.',
      longDescription: "A traditional B2B CRM only stores data; modern sales teams need actionable insights. I built SmartCommerce B2B by integrating a robust Spring Boot 3 backend with the Gemini Pro API. This architecture processes corporate clients' purchase history to generate analytical reports, calculate an 'Opportunity Score', and draft cross-selling suggestions in real-time, all visualized on a dynamic dashboard built with React and Tailwind.",
      features: [
        "Predictive Analysis with AI: Integration of Gemini Pro to generate executive summaries, retention alerts, and automatic sales strategies.",
        "Scenario Simulator: Interactive frontend tool that allows salespeople to project the impact of discounts and long-term contracts.",
        "B2B Analytical Dashboard: Visualization of monthly spending trends and purchase distribution through dynamic charts connected to PostgreSQL."
      ],
      challenges: [
        "LLM Integration in Production: Design of structured prompts in the backend (Java) to force the AI to respond in predictable formats (JSON) consumable by React.",
        "Asynchronous AI Processing: Implementation of loading Skeletons in React to mask the natural latency of Gemini API responses.",
        "Modern Backend Stack: Adoption of Java 21 and Spring Boot 3.2 to leverage the latest performance and security improvements."
      ]
    };
    case 'pydungeon': return {
      ...config,
      title: 'PyDungeon | Wasm & Rust',
      description: 'Gamified educational platform. Executes real Python code directly in the browser via WebAssembly, without relying on a server.',
      longDescription: "Platforms for learning to program usually depend on external servers to compile and validate user code, introducing latency and infrastructure costs. I developed PyDungeon as a completely 'Serverless' solution: an educational RPG where the player advances by writing real Python code. By integrating Pyodide and WebAssembly within a React architecture, I managed to embed a CPython interpreter directly into the client. This allows for safe, reactive, and zero-latency code execution.",
      features: [
        "Serverless Execution: Python interpreter running 100% in the user's browser via WebAssembly.",
        "Learning Gamification: Resolution of programming logic puzzles wrapped in an interactive RPG experience.",
        "Real-Time Evaluation: Instant validation of the code entered by the user without network calls to a backend."
      ],
      challenges: [
        "Pyodide Integration: Creation of a secure communication bridge between the TypeScript environment (React UI) and the isolated Python environment (WASM).",
        "Security and Sandboxing: Handling of arbitrary user code execution on the client-side, preventing injections and avoiding main thread blocks in the browser.",
        "Asynchronous Load Management: Optimization of the download and initialization of the WebAssembly environment to keep the application smooth."
      ]
    };
    default: return {} as ProjectWithStyle;
  }
});

export const PROJECTS_ES: ProjectWithStyle[] = PROJECT_CONFIGS.map(config => {
  switch (config.id) {
    case 'erp-lite': return {
      ...config,
      title: 'ERP-Lite | Full Stack SaaS',
      description: 'Sistema de gestión empresarial enfocado en la visualización de datos. Incluye panel de control interactivo, gestión de inventario y seguridad con JWT.',
      longDescription: "Construí ERP-Lite para demostrar mi capacidad de desarrollar aplicaciones empresariales completas, conectando una arquitectura backend robusta con un frontend interactivo. El sistema gestiona ventas, control de stock y clientes. Para facilitar su evaluación a reclutadores, diseñé un motor de 'Data Seeding' idempotente que automatiza la creación de un entorno de pruebas con métricas y gráficos estadísticos realistas en cada despliegue.",
      features: [
        "Dashboard Interactivo: Visualización de métricas críticas (ingresos, productos, alertas de stock bajo) mediante gráficos dinámicos de los últimos 30 días.",
        "Seguridad y Autenticación: Sistema de login seguro basado en JWT con Control de Acceso Basado en Roles (RBAC) configurado desde cero.",
        "Entorno Demo Automatizado: Script de inicialización de base de datos inteligente que genera catálogos y transacciones sin duplicar registros."
      ],
      challenges: [
        "Integración de Servicios Cloud: Configuración avanzada de CORS y políticas CSRF para permitir la comunicación segura entre Vercel y Render.",
        "Optimización de Recursos: Diseño de una arquitectura que permite compartir de forma segura una única instancia de PostgreSQL entre múltiples proyectos aislados.",
        "Filtros de Seguridad: Resolución de bloqueos de autorización habilitando peticiones Preflight (OPTIONS) y mapeando roles a autoridades en Spring Security."
      ]
    };
    case 'medibook': return {
      ...config,
      title: 'MediBook | WebRTC en Tiempo Real',
      description: 'Plataforma integral de gestión médica. Permite la administración de turnos y expedientes, protegida por una arquitectura de seguridad robusta y autenticación JWT.',
      longDescription: "Desarrollé MediBook para resolver la complejidad del control de citas y accesos en un entorno clínico. Separé completamente la arquitectura: un frontend interactivo en React y un backend escalable en Java (Spring Boot). Para que el proyecto fuera fácilmente evaluable en mi portafolio, implementé un motor de 'Data Seeding' que autoconfigura usuarios de prueba (Doctores y Pacientes) en la base de datos de PostgreSQL cada vez que el servidor se despliega, garantizando un entorno funcional en todo momento.",
      features: [
        "Autenticación Segura: Sistema de login con tokens JWT y Control de Acceso Basado en Roles (RBAC) estricto.",
        "Gestión de Turnos: Creación, asignación y seguimiento del estado de citas médicas en tiempo real.",
        "Entorno Demo Inteligente: Botones de 'Login Demo' en el frontend sincronizados con scripts idempotentes en el backend."
      ],
      challenges: [
        "Seguridad en la Nube: Resolución de bloqueos de red (CORS) y protección CSRF configurando peticiones Preflight (OPTIONS) entre Vercel y Render.",
        "Autorización Compleja: Mapeo de roles de base de datos a autoridades de Spring Security para solucionar errores 403 (Forbidden) en rutas protegidas.",
        "Sincronización de Datos: Prevención de duplicación de registros al reiniciar el servidor, verificando credenciales previas antes de inyectar datos de prueba."
      ]
    };
    case 'smartcommerce': return {
      ...config,
      title: 'SmartCommerce B2B | IA Generativa',
      description: 'Plataforma de inteligencia comercial B2B. Utiliza IA generativa para analizar historiales de ventas, predecir oportunidades de cierre y sugerir acciones estratégicas.',
      longDescription: "Un CRM B2B tradicional solo guarda datos; los equipos de ventas modernos necesitan insights accionables. Construí SmartCommerce B2B integrando un backend robusto en Spring Boot 3 con la API de Gemini Pro. Esta arquitectura procesa el historial de compras de los clientes corporativos para generar reportes analíticos, calcular un 'Score de Oportunidad' y redactar sugerencias de cross-selling en tiempo real, todo visualizado en un dashboard dinámico construido con React y Tailwind.",
      features: [
        "Análisis Predictivo con IA: Integración de Gemini Pro para generar resúmenes ejecutivos, alertas de retención y estrategias de venta automáticas.",
        "Simulador de Escenarios: Herramienta interactiva en el frontend que permite a los vendedores proyectar el impacto de descuentos y contratos a largo plazo.",
        "Dashboard Analítico B2B: Visualización de tendencias de gasto mensual y distribución de compras mediante gráficos dinámicos conectados a PostgreSQL."
      ],
      challenges: [
        "Integración de LLMs en Producción: Diseño de prompts estructurados en el backend (Java) para obligar a la IA a responder en formatos predecibles (JSON) que el frontend pueda consumir sin errores.",
        "Procesamiento de IA Asíncrono: Implementación de esqueletos de carga (Skeletons) y manejo de estados en React para enmascarar la latencia natural de las respuestas de la API de Gemini.",
        "Stack Backend Moderno: Adopción de Java 21 y Spring Boot 3.2 para aprovechar las últimas mejoras de rendimiento y seguridad en aplicaciones empresariales."
      ]
    };
    case 'pydungeon': return {
      ...config,
      title: 'PyDungeon | Wasm & Python',
      description: 'Plataforma educativa gamificada. Ejecuta código Python real directamente en el navegador mediante WebAssembly, sin depender de un servidor.',
      longDescription: "Las plataformas para aprender a programar suelen depender de servidores externos (backend) para compilar y validar el código del usuario, lo que introduce latencia y costos de infraestructura. Desarrollé PyDungeon como una solución completamente 'Serverless': un RPG educativo donde el jugador avanza escribiendo código Python real. Integrando Pyodide y WebAssembly dentro de una arquitectura de React, logré incrustar un intérprete de CPython directamente en el cliente. Esto permite una ejecución de código segura, reactiva y con latencia cero.",
      features: [
        "Ejecución Serverless: Intérprete de Python corriendo 100% en el navegador del usuario vía WebAssembly.",
        "Gamificación del Aprendizaje: Resolución de puzzles de lógica de programación envueltos en una experiencia RPG interactiva.",
        "Evaluación en Tiempo Real: Validación instantánea del código ingresado por el usuario sin llamadas a un backend."
      ],
      challenges: [
        "Integración de Pyodide: Creación de un puente de comunicación seguro entre el entorno de TypeScript (UI en React) y el entorno aislado de Python (WASM).",
        "Seguridad y Sandboxing: Manejo de la ejecución de código arbitrario del usuario en el lado del cliente, evitando bloqueos en el hilo principal del navegador.",
        "Manejo de Carga Asíncrona: Optimización de la inicialización del entorno de WebAssembly para mantener la aplicación fluida."
      ]
    };
    default: return {} as ProjectWithStyle;
  }
});

export const TECH_STACK: TechItem[] = [
  { name: 'Java', icon: Coffee },
  { name: 'Spring Boot', icon: Leaf },
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: Layout }, // Using Layout as placeholder for generic code/structure if TextQuote/FileCode not preferred, or keeping Code2
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Spring Security', icon: Shield },
  { name: 'WebAssembly', icon: Cog },
  { name: 'IA Generativa', icon: Sparkles },
  { name: 'Render / Vercel', icon: Cloud },
];