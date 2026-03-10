// JSON-LD Structured Data
export function injectStructuredData(): void {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UML Diagram Generator',
    description: 'AI-powered UML diagram generator from natural language descriptions in Vietnamese',
    url: 'https://uml-generator.vercel.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'MaiTamDev',
      url: 'https://github.com/maitamdev',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
