export const VERSION_INFO = {
  version: '1.2.0',
  buildDate: '2026-03-18',
  author: 'MaiTamDev',
  repo: 'https://github.com/maitamdev/uml-gen',
  license: 'MIT',
};
export function getVersionString(): string {
  return 'UML Generator v' + VERSION_INFO.version + ' (' + VERSION_INFO.buildDate + ')';
}
export function logVersion(): void {
  console.log('%c' + getVersionString(), 'color:#818cf8;font-weight:bold;font-size:14px');
  console.log('%cBy ' + VERSION_INFO.author, 'color:#c084fc');
}
