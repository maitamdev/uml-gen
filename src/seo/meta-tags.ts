// Dynamic Meta Tags Manager
export function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="' + name + '"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function updateTitle(title: string): void {
  document.title = title + ' | UML Generator';
}

export function updateOpenGraph(data: { title: string; description: string; url?: string }): void {
  updateMetaTag('og:title', data.title);
  updateMetaTag('og:description', data.description);
  if (data.url) updateMetaTag('og:url', data.url);
  updateMetaTag('og:type', 'website');
}

export function setCanonicalUrl(url: string): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}
