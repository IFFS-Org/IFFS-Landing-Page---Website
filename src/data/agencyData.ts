import { Project, Service, Testimonial, CalculatorOption } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'web-apps',
    title: 'Custom Full-Stack Web Applications',
    description: 'We engineer blazingly fast SaaS platforms and database-driven internal tools tailored precisely to match your workflow.',
    baselinePrice: 8500,
    iconName: 'LayoutGrid',
    features: [
      'Tailored UI/UX designed in Figma (Included)',
      'Highly optimized React, Vite, and Next.js platforms',
      'Robust server architectures with scalable state management',
      'Instant loading speeds with CDN optimizations'
    ]
  },
  {
    id: 'e-commerce',
    title: 'Performance E-Commerce',
    description: 'Elevate your conversion rates and simplify shopping with beautifully integrated payment structures and shopping funnels.',
    baselinePrice: 5800,
    iconName: 'ShoppingCart',
    features: [
      'Stripe, Apple Pay, and local gateway integrations',
      'Advanced product filtering and live inventory synchronization',
      'SEO-structured metadata for immediate Google indexing',
      'Seamless automated checkouts with minimal click paths'
    ]
  },
  {
    id: 'ai-integrations',
    title: 'AI & Large Language Model Integrations',
    description: 'Enrich your platform with smart features like smart summarization, AI voice, predictive modeling, and Gemini assistant agents.',
    baselinePrice: 3500,
    iconName: 'Sparkles',
    features: [
      'Direct integration with the state-of-the-art Gemini API SDK',
      'Tailored prompt-engineering templates and token limit optimization',
      'Autonomous client workflows and automated summarizers',
      'Support-bot agents with secure tool interfaces'
    ]
  },
  {
    id: 'brand-sites',
    title: 'Editorial & Brand Marketing Sites',
    description: 'Tell your story through high-impact, pixel-perfect sites. We merge stunning motion typography with robust conversion strategy.',
    baselinePrice: 2500,
    iconName: 'Compass',
    features: [
      'Stunning typography and layouts with CSS and Motion React',
      'SEO optimized with semantic structures',
      'Airtight CMS system integration for self-governed articles',
      'Fluid responsiveness from mobile screens to 4K desktop previews'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vortex ERP Dashboard',
    description: 'Built a real-time tracking panel for logistics companies to oversee thousands of container movements concurrently.',
    category: 'web-apps',
    tags: ['SaaS', 'Real-time', 'D3.js'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'WebSockets'],
    results: '+230% Operational Efficiency',
    featured: true
  },
  {
    id: '2',
    title: 'Zenith Organic Storefront',
    description: 'A headless high-conversion organic tea showcase featuring lightning-fast filtering, page swaps, and Stripe checkout.',
    category: 'e-commerce',
    tags: ['Jamstack', 'Stripe', 'Fulfillment'],
    techStack: ['Next.js', 'Tailwind CSS', 'Stripe API', 'Framer Motion'],
    results: '+42% Sales Conversion Rate',
    featured: true
  },
  {
    id: '3',
    title: 'Lexicon AI Legal Assistant',
    description: 'Integrated robust legal document categorization and analysis, powered by customized semantic search pipelines.',
    category: 'ai-integrations',
    tags: ['Gemini SDK', 'NLP', 'Vector Database'],
    techStack: ['React', 'Vite', 'Gemini API Pro', 'NodeJS', 'Express'],
    results: '80% Workload Reduction',
    featured: true
  },
  {
    id: '4',
    title: 'Aero Aero Space Brand Experience',
    description: 'An interactive 3D and editorial landing page demonstrating upcoming propulsion vectors with micro-interactions.',
    category: 'brand-sites',
    tags: ['Marketing', '3D Graphics', 'WebGL'],
    techStack: ['React', 'Three.js', 'Tailwind CSS', 'Motion React'],
    results: '4.8M Unique Views in Month 1',
    featured: false
  },
  {
    id: '5',
    title: 'Pulse Medical Booking Engine',
    description: 'HIPAA compliant medical practitioner hub with automatic shifts, reminders, and payment settlements.',
    category: 'web-apps',
    tags: ['Healthcare', 'Payments', 'Calendar'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    results: '99.99% Shift Booking Accuracy',
    featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'LogixFlow Global',
    rating: 5,
    text: 'Building our platform with this team was an absolute gamechanger. They delivered a production-ready dashboard weeks ahead of our timeline and our clients are already raving about the performance.',
    avatarSeed: 'sj'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'EarthBrew Tea',
    rating: 5,
    text: 'The storefront matches our minimalist aesthetic perfectly and converts like crazy. Our checkout is 3x faster, which directly translated to a major lift in margins in our first month.',
    avatarSeed: 'mt'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'CTO',
    company: 'DraftLine Legal',
    rating: 5,
    text: 'We integrated complex document parsing via Gemini. Their design team kept an incredibly complicated interface simple, and the developers engineered a incredibly powerful backend.',
    avatarSeed: 'er'
  }
];

export const CALCULATOR_PLATFORMS: CalculatorOption[] = [
  { id: 'p_landing', name: 'Premium Landing Page', description: 'One high-impact conversion-focused screen with elegant flow & copy structure.', price: 1800, category: 'platform' },
  { id: 'p_multipage', name: 'Multi-Page Marketing Site', description: 'Up to 5 pages, customized editorial layouts for brands and service providers.', price: 3400, category: 'platform' },
  { id: 'p_ecommerce', name: 'Headless E-Commerce Emporium', description: 'Complete product listings, search/filters, secure cart workflow, and checkout integration.', price: 5800, category: 'platform' },
  { id: 'p_saas', name: 'Advanced SaaS Full-Stack App', description: 'Custom login/auth, user workspaces, backend database routing, payment subscriptions.', price: 8200, category: 'platform' }
];

export const CALCULATOR_ADDONS: CalculatorOption[] = [
  { id: 'a_ai', name: 'Gemini AI Assistant Integration', description: 'Integrate dynamic smart agents, AI analytics engines, content summaries, or support layers.', price: 1600, category: 'feature' },
  { id: 'a_analytics', name: 'Advanced Dashboard & Custom Visuals', description: 'Interactive charts using Recharts/D3 to let viewers analyze custom metrics or export reports.', price: 1200, category: 'feature' },
  { id: 'a_crm', name: 'CRM & Marketing Sync Hub', description: 'Sync sales leads directly to HubSpot, Salesforce, or custom mailing loops seamlessly.', price: 600, category: 'feature' },
  { id: 'a_seo', name: 'Ultimate PageSpeed & SEO Package', description: 'Target absolute 100/100 Core Web Vitals alongside complete schema structure audits.', price: 500, category: 'feature' },
  { id: 'a_3d', name: 'Advanced Motion & Micro-Interactions', description: 'Immersive layouts with fluid scrolling animations, custom web gl components, and custom SVG paths.', price: 1400, category: 'design' }
];

export const CALCULATOR_TIMELINES = [
  { id: 't_standard', name: 'Standard (6 - 8 Weeks)', multiplier: 1.0, description: 'Meticulous development, peer-tested QA pipelines.' },
  { id: 't_express', name: 'Express (3 - 5 Weeks)', multiplier: 1.25, description: 'Prioritized resource allocation to deliver in record time. (25% premium)' },
  { id: 't_rapid', name: 'Rapid Pilot (1 - 2 Weeks)', multiplier: 1.5, description: 'All-hands sprint focusing on core elements for immediate market validation. (50% premium)' }
];
