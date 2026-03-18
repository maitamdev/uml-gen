export function createPrintWindow(svgUrl: string, title: string): Window | null {
  const w = window.open('', '_blank');
  if (!w) return null;
  w.document.write('<!DOCTYPE html><html><head><title>' + title + '</title>');
  w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:#fff;padding:20px}img{max-width:100%;height:auto}h2{text-align:center;margin-bottom:16px;font-family:Arial,sans-serif;color:#333}.container{text-align:center}@media print{body{padding:0}h2{font-size:14pt}}</style>');
  w.document.write('</head><body><div class="container"><h2>' + title + '</h2>');
  w.document.write('<img src="' + svgUrl + '" alt="' + title + '" /></div>');
  w.document.write('<script>window.onload=function(){setTimeout(function(){window.print()},300)}</' + 'script>');
  w.document.write('</body></html>');
  w.document.close();
  return w;
}
