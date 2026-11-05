# Clara — MEI na Mão

Copiloto financeiro para microempreendedoras brasileiras que já vendem e querem compreender melhor os números do próprio negócio.

> **Status:** MVP em desenvolvimento  
> **Hackathon:** HackBrasil 2026  
> **Trilha:** Pagamentos & Finanças

## Sobre o projeto

A Clara busca tornar a gestão financeira mais simples e acessível para MEIs que encontram dificuldades para registrar receitas e despesas, identificar custos e definir preços de venda sustentáveis.

A proposta combina uma experiência guiada com recursos de inteligência artificial para transformar descrições do dia a dia em informações financeiras organizadas. A usuária poderá conferir e corrigir os dados antes de confirmar qualquer registro.

## Problema

Muitas microempreendedoras:

- Registram entradas e saídas de maneira informal ou irregular;
- Misturam, na prática, o dinheiro pessoal e o dinheiro do negócio;
- Não conhecem todos os custos envolvidos em seus produtos ou serviços;
- Definem preços sem considerar taxas, despesas e margem desejada;
- Têm dificuldade para interpretar os números e transformá-los em decisões.

O desafio não é apenas registrar valores: é compreender o que eles significam para a saúde financeira do negócio.

## Solução proposta

O MVP será construído em torno de dois pilares.

### 1. Controle financeiro

- Registro de entradas e saídas por formulários guiados;
- Interpretação de descrições em linguagem natural;
- Prévia para conferência e confirmação antes de salvar;
- Visão de movimentações e saldo de caixa;
- Indicadores gerenciais apresentados em linguagem simples.

**Exemplo de entrada em linguagem natural:**

```text
Hoje vendi 4 potes de doce por R$ 15 cada.
Também gastei R$ 20 com leite condensado.
```

A IA deverá estruturar as informações para revisão. Os dados só serão persistidos após a confirmação da usuária e as validações do backend.

### 2. Precificação simplificada

A Clara ajudará a organizar os componentes do custo e simular preços de venda, considerando, conforme os dados informados:

- Matéria-prima e insumos;
- Embalagens;
- Mão de obra estimada;
- Custos indiretos;
- Taxas de cartão e plataformas;
- Margem desejada;
- Rateio gerencial de despesas fixas.

O resultado será acompanhado das premissas utilizadas, para que a empreendedora entenda como o preço foi formado.

> Os cálculos têm finalidade gerencial e educativa. Não substituem orientação contábil, apuração tributária oficial ou aconselhamento profissional.

## Público inicial

Microempreendedoras individuais (MEIs) que já comercializam produtos ou prestam serviços e desejam melhorar a organização financeira e a formação de preços. A experiência será pensada para pessoas que não necessariamente têm conhecimento de contabilidade, finanças ou tecnologia.

## Escopo do MVP

O desenvolvimento será incremental. A prioridade é validar um fluxo funcional de registro financeiro e precificação, sem tentar reproduzir um sistema contábil ou ERP completo.

Funcionalidades planejadas:

- Cadastro básico do negócio;
- Registro de receitas e despesas;
- Interpretação assistida por IA;
- Painel com indicadores gerenciais;
- Cadastro de produtos e serviços;
- Simulação de preço de venda.

Funcionalidades ainda não implementadas devem ser consideradas planejadas, não disponíveis.

## Arquitetura e tecnologias

A Clara adotará um **monólito modular** no MVP, mantendo os domínios organizados sem introduzir prematuramente a complexidade de microsserviços.

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js + TypeScript |
| Backend | Python + FastAPI |
| Banco de dados | Supabase + PostgreSQL |
| Autenticação | Supabase Auth |
| Comunicação | API REST, HTTPS e JSON |

### Visão simplificada

```text
Usuária
   |
   v
Frontend — Next.js / TypeScript
   |
   | HTTPS / JSON
   v
Backend — Python / FastAPI
   |
   +---- Regras e cálculos financeiros
   +---- Interpretação de linguagem natural com IA
   +---- Validação e autorização
   |
   v
Supabase / PostgreSQL
```

O backend será responsável pelas regras de negócio, cálculos, validações e autorização de acesso. A IA atuará na interpretação e estruturação de informações, não na execução de comandos SQL nem na gravação autônoma de movimentações.

## Estrutura inicial do repositório

```text
clara-mei/
├── frontend/   # Aplicação web Next.js
├── backend/    # API Python/FastAPI
├── docs/       # Documentação e decisões de arquitetura
└── README.md
```

As pastas e aplicações serão criadas conforme a implementação evoluir.

## Como executar

### Pré-requisitos

- Git;
- Node.js em versão LTS e npm;
- Python 3.11 ou superior;
- Visual Studio Code.

### 1. Clonar o repositório

```bash
git clone https://github.com/iri-campos/clara-mei.git
cd clara-mei
```

### 2. Criar o frontend

Na raiz do repositório:

```bash
npx create-next-app@latest frontend --ts --app --eslint --use-npm
```

Quando a instalação terminar:

```bash
cd frontend
npm run dev
```

A aplicação de desenvolvimento ficará disponível em http://localhost:3000.

### 3. Preparar o backend

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

Instale as dependências iniciais:

```bash
pip install fastapi uvicorn
```

Crie o arquivo `backend/app/main.py` com o conteúdo:

```python
from fastapi import FastAPI

app = FastAPI(title="Clara API", version="0.1.0")


@app.get("/health")
def health_check():
    return {"status": "ok"}
```

Com o ambiente virtual ativo e dentro da pasta `backend`, execute:

```bash
uvicorn app.main:app --reload
```

A API ficará disponível em http://localhost:8000. A documentação interativa poderá ser acessada em http://localhost:8000/docs e o teste de saúde em http://localhost:8000/health.

> **Atenção:** estes passos inicializam as aplicações. A integração com Supabase, autenticação, funcionalidades financeiras e recursos de IA serão configurados nas próximas etapas do desenvolvimento.

## Configuração e variáveis de ambiente

Não armazene credenciais no código-fonte. Quando a integração for implementada, utilize arquivos locais de ambiente, como `.env.local` no frontend e `.env` no backend, mantendo-os fora do Git.

Exemplos de nomes de variáveis esperadas:

**Frontend — exemplo futuro**
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend — exemplo futuro**
```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

Preencha os valores somente após configurar os serviços correspondentes. A chave `SUPABASE_SERVICE_ROLE_KEY` é secreta e deve existir exclusivamente no backend; nunca a exponha no frontend ou em commits.

## Segurança e confiabilidade

Princípios que orientarão a implementação:

- Autenticação e autorização de acesso;
- Isolamento dos dados por negócio;
- Validação de entradas e regras no backend;
- Proteção de credenciais e segredos;
- Cálculos financeiros determinísticos e rastreáveis;
- Confirmação explícita antes de persistir dados interpretados por IA;
- Uso de dados sintéticos em testes e demonstrações;
- Separação entre saldo de caixa, resultado gerencial estimado e lucro contábil.

## Próximos passos

1. Preparar a estrutura do monorepositório;
2. Inicializar frontend e backend;
3. Configurar Supabase e persistência;
4. Implementar autenticação e isolamento por negócio;
5. Construir o fluxo de registro financeiro;
6. Implementar os cálculos de precificação;
7. Integrar a interpretação com IA e a etapa de confirmação;
8. Construir o painel e preparar a demonstração.

## Licença e autoria

Projeto em desenvolvimento para fins educacionais e demonstração de aplicação de inteligência artificial à inclusão e à gestão financeira.

Desenvolvido por **Iridiana Campos**.

[LinkedIn](https://www.linkedin.com/in/iridiana-amarante/)
