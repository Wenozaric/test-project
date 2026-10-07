import type { Question } from './data'
export const QUESTIONS: Question[] = [
  { id:'q_type', step:1, title:'ТИП СИСТЕМЫ', question:'Какую систему тестируем? Опиши архитектуру в двух словах.', hint:'Смоделирую релевантные векторы атак.', options:[
    { label:'🌐 Web-приложение (SPA + API)', value:'web', score:0, threats:[] },
    { label:'📱 Мобильное + бэкенд', value:'mobile', score:0, threats:[] },
    { label:'🏢 Корп. сеть / интранет', value:'corp', score:0, threats:[] },
    { label:'⚙️ IoT / K8s / Микросервисы', value:'infra', score:0, threats:[] },
  ]},
  { id:'q_auth', step:2, title:'АУТЕНТИФИКАЦИЯ', question:'Как пользователи входят? Механизм аутентификации?', hint:'JWT, сессии, OAuth2 — у каждого свои ловушки.', options:[
    { label:'🔐 JWT httpOnly + refresh rotation', value:'jwt_secure', score:12, threats:[] },
    { label:'🔑 OAuth2 / OIDC (Google, Azure AD)', value:'oauth', score:15, threats:[] },
    { label:'🍪 Сессии (express-session)', value:'session', score:8, threats:['no_waf'] },
    { label:'⚠️ JWT в localStorage без refresh', value:'jwt_weak', score:-12, threats:['xss','auth_bypass'] },
    { label:'🚨 Логин/пароль без MFA', value:'plain_auth', score:-15, threats:['auth_bypass','no_waf'] },
  ]},
  { id:'q_passwords', step:3, title:'ХРАНЕНИЕ ПАРОЛЕЙ', question:'Как хранятся пароли в БД?', hint:'Ответь честно — это критично.', options:[
    { label:'🛡️ Argon2id / bcrypt cost≥12 + salt', value:'argon', score:15, threats:[] },
    { label:'🔒 bcrypt cost 10', value:'bcrypt', score:10, threats:[] },
    { label:'⚠️ SHA-256 / MD5 + соль', value:'sha', score:-12, threats:['weak_hash'] },
    { label:'💀 MD5 / SHA1 без соли', value:'md5', score:-18, threats:['weak_hash'] },
    { label:'☠️ Plaintext', value:'plain', score:-22, threats:['weak_hash'] },
  ]},
  { id:'q_db', step:4, title:'ДОСТУП К ДАННЫМ', question:'Как приложение обращается к БД?', hint:'Raw SQL vs ORM решает судьбу SQLi.', options:[
    { label:'✅ ORM / Query Builder с параметризацией', value:'orm', score:12, threats:[] },
    { label:'🛡️ Prepared statements везде', value:'prepared', score:14, threats:[] },
    { label:'⚠️ Местами ORM, местами raw', value:'mixed', score:-6, threats:['sqli','nosql_inj'] },
    { label:'🚨 Raw SQL конкатенация', value:'raw', score:-18, threats:['sqli','nosql_inj','idor'] },
  ]},
  { id:'q_network', step:5, title:'СЕТЕВОЙ ПЕРИМЕТР', question:'Какие порты и сервисы торчат наружу?', hint:'nmap -sV покажет то, что скроешь ты.', options:[
    { label:'🔒 Только 443/80 через WAF + CDN', value:'waf', score:14, threats:[] },
    { label:'🛡️ Закрыто SG, доступ через VPN/Bastion', value:'vpn', score:12, threats:['no_waf'] },
    { label:'⚠️ Открыты 22/3306/6379 с паролями', value:'open', score:-14, threats:['open_ports','no_waf'] },
    { label:'🚨 0.0.0.0/0 + дефолтные пароли', value:'wide_open', score:-20, threats:['open_ports','no_waf','supply_chain'] },
  ]},
  { id:'q_tls', step:6, title:'ШИФРОВАНИЕ', question:'Как защищён трафик клиент ↔ сервер?', hint:'Без TLS сессию уведут в кафе за 30с.', options:[
    { label:'🔐 TLS 1.3 + HSTS + авто-renew', value:'tls13', score:12, threats:[] },
    { label:'🔒 TLS 1.2, валидный сертиф.', value:'tls12', score:8, threats:[] },
    { label:'⚠️ Self-signed / TLS 1.0', value:'self', score:-8, threats:['weak_tls'] },
    { label:'🚨 HTTP-only', value:'http', score:-20, threats:['no_https','weak_tls'] },
  ]},
  { id:'q_front', step:7, title:'ФРОНТЕНД И ВВОД', question:'Как обрабатывается ввод пользователя на фронте?', hint:'XSS там, где innerHTML = userInput', options:[
    { label:'🛡️ CSP + DOMPurify + HttpOnly', value:'secure_front', score:12, threats:[] },
    { label:'✅ React автоэкранирование', value:'react', score:8, threats:['xss'] },
    { label:'⚠️ innerHTML / dangerouslySetInnerHTML', value:'inner', score:-10, threats:['xss','idor'] },
    { label:'🚨 Без валидации, прямо в DOM', value:'none', score:-16, threats:['xss','sqli','idor'] },
  ]},
  { id:'q_ops', step:8, title:'МОНИТОРИНГ', question:'Логи, алёрты, обновления зависимостей?', hint:'Среднее dwell time без логов — 212 дней.', options:[
    { label:'📡 SIEM (ELK/Datadog) + Dependabot', value:'siem', score:14, threats:[] },
    { label:'📝 Центр. логи + npm audit', value:'logs', score:6, threats:['no_logging'] },
    { label:'⚠️ Логи локально, без алёртов', value:'local_logs', score:-6, threats:['no_logging','supply_chain'] },
    { label:'🚨 Нет логов, версии frozen 2 года', value:'no_ops', score:-14, threats:['no_logging','supply_chain'] },
  ]},
]
