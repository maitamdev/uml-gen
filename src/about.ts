export function getAppInfo(): { name: string; version: string; commit: string } {
  return { name: 'UML Generator', version: '1.2.0', commit: 'latest' };
}
export function showAboutDialog(): void {
  const info = getAppInfo();
  console.log(info.name + ' v' + info.version);
}
