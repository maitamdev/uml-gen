export function injectPrintStyles(): void {
  if (document.getElementById('uml-print-styles')) return;
  const style = document.createElement('style');
  style.id = 'uml-print-styles';
  style.textContent = '@media print { .header, .hero, .footer, .features-section, .toast-container, .btn-settings, .settings-panel { display: none !important; } .output-section { display: block !important; } .diagram-panel { page-break-inside: avoid; } body { background: white !important; color: black !important; } }';
  document.head.appendChild(style);
}
