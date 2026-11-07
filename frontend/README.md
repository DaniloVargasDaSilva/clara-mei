# Frontend Clara

Aplicação web do projeto Clara, construída com Next.js + TypeScript.

## Objetivo

Esse frontend entrega a interface principal da plataforma, com foco em:

- apresentação do projeto e proposta de valor;
- verificação de disponibilidade e integração com a API backend;
- estrutura inicial de páginas e componentes do MVP.

## Requisitos

- Node.js 22.x;
- npm;
- acesso ao backend em execução em `http://127.0.0.1:8000`.

## Configuração local

Na pasta `frontend`, instale as dependências:

```bash
npm install
```

Crie o arquivo local de ambiente com base no exemplo:

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

O conteúdo esperado é:

```env
API_BASE_URL=http://127.0.0.1:8000
```
> Execute esse comando somente se o arquivo `.env.local` ainda não existir. Não sobrescreva configurações locais já existentes.

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em http://localhost:3000.

## Verificar a integração

A rota `/api/health` do frontend consulta a API backend, utiliza timeout de 5 segundos e valida a resposta antes de disponibilizar os dados.

```bash
curl http://localhost:3000/api/health
```

## Build de produção

```bash
npm run build
```

Esse comando valida a compilação otimizada e a checagem de tipos do TypeScript.

## Estrutura relevante

```text
frontend/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

A documentação principal do projeto continua no arquivo [README.md](../README.md).
