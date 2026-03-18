const ONBOARDING_KEY = 'uml-gen-onboarding-done';
export function isOnboardingDone(): boolean { return localStorage.getItem(ONBOARDING_KEY) === 'true'; }
export function markOnboardingDone(): void { localStorage.setItem(ONBOARDING_KEY, 'true'); }
export function resetOnboarding(): void { localStorage.removeItem(ONBOARDING_KEY); }
export const ONBOARDING_STEPS = [
  { target: '#requirementInput', title: 'Nháº­p mÃ´ táº£', text: 'MÃ´ táº£ há»‡ thá»‘ng báº±ng tiáº¿ng Viá»‡t á»Ÿ Ä‘Ã¢y' },
  { target: '#generateBtn', title: 'Táº¡o sÆ¡ Ä‘á»“', text: 'Nháº¥n nÃºt nÃ y Ä‘á»ƒ AI táº¡o sÆ¡ Ä‘á»“ UML' },
  { target: '#diagramTabs', title: 'Chuyá»ƒn loáº¡i sÆ¡ Ä‘á»“', text: 'Chá»n giá»¯a Use Case, Activity, Sequence, Class' },
  { target: '#settingsBtn', title: 'Cáº¥u hÃ¬nh', text: 'Nháº­p API Key táº¡i Ä‘Ã¢y Ä‘á»ƒ dÃ¹ng AI' },
];
