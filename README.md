# Clara

Copiloto financeiro para microempreendedoras brasileiras que já vendem e querem compreender melhor os números do próprio negócio.

> **Status:** MVP em desenvolvimento  
> **Hackathon:** HackBrasil 2026  
> **Trilha:** Pagamentos & Finanças

## Sobre o projeto

A Clara busca tornar a gestão financeira mais simples e acessível para MEIs que encontram dificuldades para registrar receitas e despesas, identificar custos e definir preços de venda sustentáveis.

A proposta combina uma experiência guiada com recursos de inteligência artificial para transformar descrições do dia a dia em informações financeiras organizadas. A usuária poderá conferir e corrigir os dados antes de confirmar qualquer registro.

## Problema

Microempreendedoras frequentemente enfrentam dificuldades para:

- Registrar e categorizar receitas e despesas;
- Separar as movimentações financeiras pessoais das movimentações do negócio;
- Conhecer os custos envolvidos na produção de um produto ou na prestação de um serviço;
- Definir preços considerando custos, taxas e margem desejada;
- Entender se o negócio está gerando resultados positivos;
- Transformar informações financeiras em decisões práticas.

O problema não é necessariamente a falta de ferramentas financeiras, mas a dificuldade de utilizá-las de maneira consistente e compreender as informações que elas apresentam.

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
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── .env.example
│   ├── next.config.ts
│   └── README.md
├── backend/
│   ├── app/
│   │   └── main.py
│   └── requirements.txt
├── docs/
├── README.md
└── .gitignore
```

A estrutura será ampliada conforme a implementação dos módulos de negócio, testes, documentação e persistência.

## Como executar

### Pré-requisitos

- Git;
- Node.js em versão LTS e npm;
- Python 3.10.11;
- Visual Studio Code.

### 1. Clonar o repositório

```bash
git clone https://github.com/iri-campos/clara-mei.git
cd clara-mei
```

### 2. Configurar o backend

Na raiz do repositório:

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

Instale as dependências:

```bash
python -m pip install -r requirements.txt
```

Com o ambiente virtual ativo e dentro da pasta `backend`, execute:

```bash
python -m uvicorn app.main:app --reload
```

A API ficará disponível em:

- API: http://127.0.0.1:8000
- Health check: http://127.0.0.1:8000/health
- Documentação interativa: http://127.0.0.1:8000/docs

A documentação interativa fica disponível no ambiente de desenvolvimento. Em produção, as rotas `/docs`, `/redoc` e `/openapi.json` são desabilitadas.

### 3. Configurar o frontend

Abra outro terminal na raiz do repositório:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo local de variáveis de ambiente a partir do exemplo:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env.local
```

**Linux/macOS / bash**
```bash
cp .env.example .env.local
```

> Execute esse comando somente se o arquivo `.env.local` ainda não existir. Não sobrescreva configurações locais já existentes.

Inicie a aplicação:

```bash
npm run dev
```

O frontend ficará disponível em http://localhost:3000.

### 4. Validar a integração

Com frontend e backend em execução, acesse: http://localhost:3000/api/health.

A rota do frontend consulta o endpoint de saúde do backend e retorna uma resposta filtrada, sem expor diretamente toda a resposta da API.

### 5. Validar o build de produção

Na pasta `frontend`, execute:

```bash
npm run build
```

Esse comando verifica a compilação otimizada da aplicação e a validação de tipos do TypeScript.

## Configuração e variáveis de ambiente

Não armazene credenciais no código-fonte. Utilize arquivos locais de ambiente e mantenha-os fora do Git.

**Frontend**

Arquivo `.env.local`:

```env
API_BASE_URL=http://127.0.0.1:8000
```

O `API_BASE_URL` é utilizado pelas rotas do Next.js para se comunicar com a API FastAPI. Não deve ser exposto como variável pública do navegador.

O arquivo `.env.example` contém o exemplo de configuração e pode ser compartilhado no repositório, pois não possui credenciais.

**Backend**

A variável `ENVIRONMENT` controla o ambiente de execução:

```env
ENVIRONMENT=development
```

Quando configurada como produção, a API desabilita os endpoints de documentação interativa e OpenAPI.

## Segurança e confiabilidade

A implementação já contempla algumas medidas iniciais de segurança e confiabilidade.

**Medidas implementadas**

- Variáveis de ambiente para configurações locais;
- Arquivos `.env.local` excluídos do controle de versão;
- Timeout de 5 segundos na comunicação entre frontend e backend;
- Filtragem e validação da resposta recebida pelo endpoint de saúde;
- Tratamento de falhas de comunicação sem exposição de detalhes internos;
- Headers HTTP de segurança no frontend;
- HSTS habilitado somente em ambiente de produção;
- Documentação e endpoints OpenAPI desabilitados em produção.

**Princípios que orientarão a implementação**

- Autenticação e autorização de acesso;
- Isolamento dos dados por negócio;
- Validação de entradas e regras no backend;
- Proteção de credenciais e segredos;
- Cálculos financeiros determinísticos e rastreáveis;
- Confirmação explícita antes de persistir dados interpretados por IA;
- Uso de dados sintéticos em testes e demonstrações;
- Separação entre saldo de caixa, resultado gerencial estimado e lucro contábil.

A implementação de autenticação, autorização, persistência e isolamento por negócio ainda faz parte da evolução do projeto.

## Estado atual do desenvolvimento

### Infraestrutura inicial

- [x] Repositório GitHub configurado;
- [x] Frontend Next.js com TypeScript inicializado;
- [x] Backend FastAPI inicializado;
- [x] Ambiente virtual Python configurado;
- [x] Dependências diretas do backend organizadas em `requirements.txt`;
- [x] Variáveis de ambiente do frontend configuradas;
- [x] Endpoint `/health` implementado no backend;
- [x] Rota `/api/health` implementada no frontend;
- [x] Comunicação frontend → backend validada;
- [x] Headers HTTP de segurança configurados;
- [x] Proteção dos endpoints de documentação em produção;
- [x] Build de produção do frontend validado.

### Próximos passos

1. Estruturar os testes automatizados do backend;
2. Configurar Ruff para padronização e análise estática do Python;
3. Implementar integração contínua com GitHub Actions;
4. Consolidar a documentação de arquitetura e modelo de dados;
5. Configurar Supabase e persistência;
6. Implementar autenticação e isolamento por negócio;
7. Construir o fluxo de registro financeiro;
8. Implementar os cálculos de precificação;
9. Integrar a interpretação com IA e a etapa de confirmação;
10. Construir o painel e preparar a demonstração.

## Licença e autoria

Projeto em desenvolvimento para fins educacionais e demonstração de aplicação de inteligência artificial à inclusão e à gestão financeira.



</p>
<p align="center">
Desenvolvido com 💙 por <strong>Iridiana Campos</strong>
</p>
<p align="center">
<a href="https://www.linkedin.com/in/iridiana-amarante/" target="_blank">
<img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
&nbsp;&nbsp;
