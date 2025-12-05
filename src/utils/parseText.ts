// import i18n from '@/i18n';

import type { I18nText } from '@/types'

// import { I18nText } from '@/types';
export default function parseText(text?: I18nText) {
  if (typeof text !== 'object') return text

  return text?.['en'] ?? text?.['no'] ?? Object.values(text ?? {})?.[0] ?? 'not text found'
}
