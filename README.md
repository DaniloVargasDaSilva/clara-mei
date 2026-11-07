# Clara

**Quanto sobra, de verdade, em cada venda?**
A Clara calcula o custo real do que uma microempreendedora vende e mostra o preço que deixa lucro.

> **Status:** MVP em desenvolvimento
> **Hackathon:** HackBrasil 2026
> **Trilha:** Pagamentos & Finanças
> **Página pública:** https://clara-hackbrasil.vercel.app

**In English:** Clara is a pricing copilot for Brazilian micro-entrepreneurs (MEIs). Most of them price by guessing: they subtract ingredient cost from the price and call the rest profit, leaving out their own time, monthly bills and card fees. Clara puts every cost in the same calculation, shows where each real of the price goes, and suggests a price that actually leaves profit. The pricing engine is deterministic, open and covered by automated tests.

---

## O problema

O Brasil tem milhões de MEIs, e grande parte vende produtos feitos à mão: doces, salgados, artesanato, cosméticos. Na hora de definir o preço, a conta mais comum é esta:

```text
preço de venda - ingredientes = lucro
```

Ficam de fora:

- a embalagem de cada unidade;
- o tempo de trabalho de quem produz;
- as contas do mês do negócio (gás, luz, internet, DAS);
- a taxa da maquininha, do link de pagamento ou da plataforma.

Resultado: a empreendedora vende muito, trabalha muito e não entende por que o dinheiro não sobra. Muitas vezes, ela perde dinheiro em cada venda sem perceber.

O problema não é falta de ferramenta financeira. É que as ferramentas existentes pedem conhecimento de contabilidade e não explicam o resultado em linguagem simples.

## A solução

A Clara começa pelo que mais dói: **o preço**. Em quatro passos, a empreendedora informa:

| Passo | O que ela informa |
|---|---|
| 1. A receita | gasto com ingredientes, quantas unidades rende e a embalagem de cada uma |
| 2. Seu tempo | horas para produzir e quanto quer ganhar por hora |
| 3. Contas do mês | total das contas fixas e quantas unidades vende por mês |
| 4. Venda e lucro | taxa da venda, lucro desejado e, se quiser, o preço que cobra hoje |

E recebe, enquanto digita:

- o **preço sugerido** que cobre todos os custos e deixa o lucro desejado;
- a comparação entre a **conta de cabeça** e a **conta completa** no preço que ela cobra hoje;
- uma barra que mostra **para onde vai o dinheiro de cada venda**, com o prejuízo destacado quando o preço não cobre os custos.

### Exemplo: brigadeiro

Números fictícios, usados como exemplo na página.

| Informação | Valor |
|---|---|
| Ingredientes da receita | R$ 62,00 para 50 brigadeiros |
| Embalagem (forminha) | R$ 0,18 por unidade |
| Tempo | 2,5 h a R$ 15/h |
| Contas do mês | R$ 300,00, vendendo 600 brigadeiros por mês |
| Taxa da maquininha | 3,5% |
| Lucro desejado | 25% |
| Preço cobrado hoje | R$ 3,00 |

O que a Clara mostra:

| | Valor por brigadeiro |
|---|---|
| Ingredientes | R$ 1,24 |
| Embalagem | R$ 0,18 |
| Tempo | R$ 0,75 |
| Contas do mês | R$ 0,50 |
| **Custo real** | **R$ 2,67** |
| Conta de cabeça (R$ 3,00 - ingredientes) | R$ 1,76 |
| **O que sobra de verdade a R$ 3,00** | **R$ 0,23** (7,5% do preço) |
| **Preço sugerido para 25% de lucro** | **R$ 3,74** |

A empreendedora achava que ganhava R$ 1,76 por brigadeiro. Ganha R$ 0,23.

### Como o preço é calculado

```text
custo por unidade = ingredientes / rendimento
                  + embalagem
                  + (horas x valor da hora) / rendimento
                  + contas do mês / unidades vendidas no mês

preço sugerido = custo por unidade / (1 - taxa da venda - lucro desejado)
```

Taxa e lucro são percentuais do preço final, por isso entram no denominador. O preço é arredondado para cima no centavo, para nunca ficar abaixo do lucro desejado.

> Os cálculos têm finalidade gerencial e educativa. Não substituem orientação contábil, apuração tributária oficial ou aconselhamento profissional.

## Público

Microempreendedoras individuais que já vendem produtos e querem saber se o preço que cobram dá lucro. A experiência é feita para quem não tem conhecimento de contabilidade, finanças ou tecnologia.

## O que já funciona e o que vem a seguir

**Já funciona**

- [x] Simulador de preço com custo completo (ingredientes, embalagem, tempo, contas do mês, taxa);
- [x] Comparação entre o preço atual e o preço sugerido, com destaque para prejuízo;
- [x] Exemplos prontos (brigadeiro, bolo de pote, sabonete artesanal);
- [x] Motor de cálculo com testes automatizados;
- [x] Página pública responsiva;
- [x] Backend FastAPI com health check integrado ao frontend;
- [x] Headers de segurança e documentação da API desabilitada em produção.

**Em construção**

1. Cadastro dos produtos, com o custo de cada um salvo (Supabase);
2. Autenticação e isolamento dos dados por negócio;
3. Aviso quando um ingrediente fica mais caro e algum produto deixa de dar lucro;
4. Registro de vendas e despesas por texto, com conferência antes de salvar (IA);
5. Painel do mês com entradas, saídas e quanto sobrou;
6. Integração contínua com GitHub Actions.

## Arquitetura e tecnologias

A Clara adota um **monólito modular** no MVP, com os domínios organizados sem a complexidade de microsserviços.

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js + TypeScript |
| Motor de precificação | TypeScript puro (`frontend/lib/pricing.ts`), sem dependências |
| Backend | Python + FastAPI |
| Banco de dados | Supabase + PostgreSQL (planejado) |
| Autenticação | Supabase Auth (planejado) |
| Comunicação | API REST, HTTPS e JSON |

```text
Usuária
   |
   v
Frontend — Next.js / TypeScript
   |   +---- Simulador de preço (motor de cálculo puro e testado)
   |
   | HTTPS / JSON
   v
Backend — Python / FastAPI
   +---- Regras de negócio e validações
   +---- Interpretação de linguagem natural com IA (planejado)
   +---- Autorização
   |
   v
Supabase / PostgreSQL (planejado)
```

O motor de precificação é uma função pura: recebe números e devolve o resultado, sem acessar rede, banco ou navegador. Por isso roda instantaneamente na página pública e pode ser levado para o backend sem mudar a lógica. A IA vai atuar na interpretação de textos, nunca no cálculo do preço nem na gravação de dados sem confirmação.

## Estrutura do repositório

```text
clara-mei/
├── frontend/
│   ├── app/
│   │   ├── api/health/route.ts       # consulta o health check do backend
│   │   ├── components/
│   │   │   └── pricing-simulator.tsx # simulador interativo
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # página pública
│   ├── lib/
│   │   ├── pricing.ts                # motor de precificação
│   │   └── pricing.test.ts           # testes do motor
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── app/main.py
│   └── requirements.txt
├── docs/
└── README.md
```

## Como executar

### Pré-requisitos

- Git;
- Node.js 22.18 ou mais recente (LTS) e npm;
- Python 3.10 ou mais recente.

### 1. Clonar o repositório

```bash
git clone https://github.com/iri-campos/clara-mei.git
cd clara-mei
```

### 2. Rodar o frontend (simulador de preço)

O simulador funciona só com o frontend.

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:3000 e vá até **Descubra o seu preço em quatro passos**. Clique em um exemplo ou em **Usar meus números**.

### 3. Rodar os testes

Na pasta `frontend`:

```bash
npm test
```

Os testes usam o executor nativo do Node (`node --test`) e cobrem o custo por unidade, o preço sugerido, o arredondamento, a comparação com o preço atual, o caso de prejuízo e as validações de entrada.

### 4. Rodar o backend (opcional)

Em outro terminal, na raiz do repositório:

```bash
cd backend
python -m venv .venv
```

Ative o ambiente virtual:

**Windows PowerShell**
```powershell
.venv\Scripts\Activate.ps1
```

**Linux/macOS**
```bash
source .venv/bin/activate
```

Instale as dependências e inicie a API:

```bash
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

- API: http://127.0.0.1:8000
- Health check: http://127.0.0.1:8000/health
- Documentação interativa: http://127.0.0.1:8000/docs (somente em desenvolvimento)

Para o frontend conversar com o backend, crie o arquivo de ambiente na pasta `frontend` (só se ele ainda não existir):

**Windows PowerShell**
```powershell
Copy-Item .env.example .env.local
```

**Linux/macOS**
```bash
cp .env.example .env.local
```

Com os dois rodando, http://localhost:3000/api/health deve responder `{"status":"ok", ...}`.

### 5. Validar o build de produção

Na pasta `frontend`:

```bash
npm run build
```

## Configuração e variáveis de ambiente

Não armazene credenciais no código-fonte. Use arquivos locais de ambiente e mantenha-os fora do Git.

| Arquivo | Variável | Uso |
|---|---|---|
| `frontend/.env.local` | `API_BASE_URL=http://127.0.0.1:8000` | URL da API usada pelas rotas do Next.js. Não é exposta ao navegador. |
| ambiente do backend | `ENVIRONMENT=development` | Em `production`, desabilita `/docs`, `/redoc` e `/openapi.json`. |

## Segurança e confiabilidade

**Já implementado**

- Variáveis de ambiente fora do controle de versão;
- Timeout de 5 segundos e filtragem da resposta entre frontend e backend;
- Falhas tratadas sem expor detalhes internos;
- Headers HTTP de segurança e HSTS em produção;
- Documentação da API desabilitada em produção;
- Cálculos determinísticos, abertos e testados;
- Somente dados fictícios na demonstração.

**Princípios para as próximas etapas**

- Autenticação, autorização e isolamento dos dados por negócio;
- Validação de entradas e regras no backend;
- Confirmação explícita antes de salvar qualquer dado interpretado por IA;
- Separação entre saldo de caixa, resultado gerencial estimado e lucro contábil.

## Licença e autoria

Projeto desenvolvido para o HackBrasil 2026, para fins educacionais e de demonstração da aplicação de tecnologia à inclusão e à gestão financeira. O código pode ser lido, executado e testado livremente para avaliação.

<p align="center">
Desenvolvido com 💙 por <strong>Iridiana Campos</strong>
</p>
<p align="center">
<a href="https://www.linkedin.com/in/iridiana-amarante/" target="_blank">
<img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>
