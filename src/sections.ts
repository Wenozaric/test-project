import type { Question } from './data'
import { QUESTIONS } from './questions'

export type Section = {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  accent: string
  questionIds: string[]
}

export const SECTIONS: Section[] = [
  {
    id: 'web',
    title: 'Веб-безопасность',
    subtitle: 'XSS · SQLi · IDOR',
    description: 'Уязвимости фронтенда и доступа к данным. Разберёшь CSP, DOMPurify и параметризацию запросов.',
    icon: '◈',
    accent: '#00e599',
    questionIds: ['q_db', 'q_front'],
  },
  {
    id: 'auth',
    title: 'Аутентификация',
    subtitle: 'JWT · Пароли · MFA',
    description: 'Сессии, хеширование Argon2/bcrypt и контроль доступа. Где ломают вход.',
    icon: '⬢',
    accent: '#38bdf8',
    questionIds: ['q_auth', 'q_passwords'],
  },
  {
    id: 'network',
    title: 'Сети и шифрование',
    subtitle: 'TLS · WAF · Порты',
    description: 'Периметр, TLS 1.3, HSTS и закрытие открытых портов.',
    icon: '⬣',
    accent: '#f59e0b',
    questionIds: ['q_network', 'q_tls'],
  },
  {
    id: 'ops',
    title: 'Контейнеры и Ops',
    subtitle: 'K8s · Логи · Supply Chain',
    description: 'Архитектура, мониторинг SIEM и защита зависимостей.',
    icon: '⬔',
    accent: '#a78bfa',
    questionIds: ['q_type', 'q_ops'],
  },
]

export function questionsForSection(id: string): Question[] {
  if (id === 'all') return QUESTIONS
  const s = SECTIONS.find(x => x.id === id)
  if (!s) return QUESTIONS
  return QUESTIONS.filter(q => s.questionIds.includes(q.id))
}
export const ALL_QUESTIONS_IDS = QUESTIONS.map(q => q.id)
