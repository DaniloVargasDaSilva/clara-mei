# CLARA
Uma assistente financeira para microempreendedoras que já vendem e querem entender melhor seu negócio.

> Status do projeto: MVP em desenvolvimento  
> Trilha: Pagamentos e Finanças - HackBrasil 2026

## 🤖 Sobre o Projeto

A Clara é uma copiloto para microempreendedoras brasileiras que busca simplificar a gestão financeira, especialmente daquelas que já possuem um negócio em funcionamento, mas encontram dificuldades para controlar entradas e saídas, identificar custos e calcular preços de venda.

Muitas pequenas empreendedoras acompanham o dinheiro do negócio de maneira informal, misturando despesas pessoais e profissionais ou utilizando controles manuais que não oferecem uma visão clara dos resultados. Como consequência, podem vender sem conhecer seus custos reais e ter dificuldade para avaliar se os preços praticados são suficientes para manter o negócio.

A Clara nasce para tornar essas informações mais acessíveis, utilizando uma interface simples e recursos de inteligência artificial para facilitar a organização das movimentações, calcular indicadores, auxiliar na formação de preço e explicar os resultados em linguagem simples, oferecendo mais condições para a tomada de decisão.


## 🎯 Problemas que queremos resolver

Pequenas empreendedoras frequentemente enfrentam dificuldades para:

* Registrar e categorizar receitas e despesas;

* Separar as movimentações financeiras pessoais das movimentações do negócio;

* Conhecer os custos envolvidos na produção de um produto ou na prestação de um serviço;

* Definir preços considerando custos, taxas e margem desejada;

* Entender se o negócio está gerando resultados positivos;

* Transformar informações financeiras em decisões práticas.


O problema não é necessariamente a falta de ferramentas financeiras, mas a dificuldade de utilizá-las de maneira consistente e compreender as informações que elas apresentam.

## ▶️ Nossa Solução

O MVP terá dois pilares principais:

### Controle Financeiro
Permite que a empreendedora registre receitas e despesas por meio de formulários guiados ou descrevendo a movimentação em linguagem natural.

Exemplo:
```` 
Hoje vendi 4 potes de doce por R$15,00 cada. Gastei R$20,00 com leite condensado.
````

A Clara deverá interpretar as informações, apresentar uma prévia para conferência e solicitar a confirmação do usuário antes de registrar os dados.  
A partir dessas informações, será possível visualizar entradas, saídas, saldo de caixa e indicadores gerenciais.

### Precificação Simplificada
Auxiliar o empreendedor a identificar os custos de seus produtos ou serviços e simular preços de venda.  
A análise poderá considerar:

- Matéria-prima e insumos
- Embalagens
- Mão de obra estimada
- Custos indiretos
- Taxas de cartão e plataformas
- Margem desejada
- Rateio gerencial de despesas fixas, quando aplicável

A Clara apresentará o preço sugerido e explicará as premissas utilizadas, permitindo que o empreendedor compreenda como o valor foi calculado.

> ‼️Os resultados serão orientações gerenciais, não substituindo serviços contábeis ou a apuração fiscal oficial.‼️  

## 🧚‍♂️ Público Alvo
O público inicial são Microempreenderas (MEIs) que já comercializam produtos ou prestam serviços, mas precisam melhorar a organização financeira e a formação de preços.

A experiência será desenvolvida considerando usuárias que não necessariamente possuem conhecimentos de contabilidade, finanças ou tecnologia.

## 🛡️ Funcionalidades Previstas

* Cadastro do negócio: registra informações básicas da atividade.
* Registro financeiro: controle de entradas e saídas.
* Assistente com IA: interpreta as movimentações descritas em linguagem natural.
* Painel financeiro: apresenta inidicadores gerenciais.
* Cadastro de produtos e serviços: organiza itens comercializados.
* Precificação: calculadora de custos e sugestão de preços de venda.
 
> 🔷 As funcionalidades serão implementadas gradualmente. O primeiro MVP priorizará o registro financeiro e a precificação.

## 🛠️ Arquitetura e Tecnologias

O projeto utilizará uma arquitetura de monólito modular, adequada ao escopo inicial e preparada para evoluir sem a complexidade prematura de microsserviços.

1. Frontend
    - Next.js
    - TypeScript
    - Interface web responsiva

2. Backend
    - Python
    - FastAPI
    - API REST com comunicação JSON

3. Banco de dados e autenticação
    - Supabase
    - PostgreSQL
    - Supabase Auth

4. Inteligência artificial
    - Interpretação de mensagens em linguagem natural.
    - Extração estruturada de informações.
    - Confirmação do usuário antes da persistência de movimentações.

### Visão Simplificada da Arquitetura

````
Usuário
   |
   v
Frontend — Next.js / TypeScript
   |
   | HTTPS / JSON
   v
Backend — Python / FastAPI
   |
   +---- Regras financeiras
   |
   +---- Interpretação com IA
   |
   +---- Autorização e validações
   |
   v
Supabase / PostgreSQL
````

O backend será responsável pelas regras de negócio, validações e autorização de acesso aos dados.   
A inteligência artificial não realizará cálculos financeiros oficiais nem terá autorização para gravar movimentações sem confirmação do usuário.

## 🕵️‍♀️ Como executar o projeto

### Pré-requisitos
* Git
* Node.js (versão LTS recomendada)
* npm
* Python 3.11 ou superior
* Visual Studio Code

### Clonar o repoditório
````
git clone https://github.com/iri-campos/clara-mei.git
cd clara-mei
````

## 🔒 Segurança e Confiabilidade
A Clara será desenvolvida considerando alguns princípios:

* Autenticação e autorização dos usuários.
* Isolamento dos dados de cada negócio.
* Validação das informações no backend.
* Proteção de credenciais e segredos.
* Cálculos financeiros determinísticos e rastreáveis.
* Confirmação do usuário antes de registrar informações interpretadas por IA.
* Utilização de dados sintéticos para demonstrações e testes.

## 📄 Licença

Projeto desenvolvido para fins educacionais e demonstração de conceitos de Inteligência Artificial aplicada à Educação Financeira.

## 👩‍💻 Autor
</p>
<p align="center">
Desenvolvido com 💙 por <strong>Iridiana Campos</strong>
</p>
<p align="center">
<a href="https://www.linkedin.com/in/iridiana-amarante/" target="_blank">
<img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
&nbsp;&nbsp;