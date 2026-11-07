import { PricingSimulator } from "./components/pricing-simulator";
import { calculatePrice, formatBRL, formatPercent, presets } from "@/lib/pricing";

const repoUrl = "https://github.com/iri-campos/clara-mei";

const example = presets[0];
const exampleResult = calculatePrice(example.input);

const available = [
  "Simulador de preço com o custo completo: ingredientes, embalagem, seu tempo, contas do mês e taxa da venda.",
  "Comparação entre o preço que você cobra hoje e o preço que deixa lucro.",
  "Regras de cálculo abertas e cobertas por testes automatizados.",
];

const next = [
  "Cadastro dos seus produtos, com o custo de cada um salvo.",
  "Aviso quando um ingrediente fica mais caro e o lucro de algum produto some.",
  "Registro de vendas e despesas por texto, com conferência antes de salvar.",
  "Painel do mês com o que entrou, o que saiu e quanto sobrou.",
];

function HeroTag() {
  if (!exampleResult.ok || !exampleResult.current) return null;
  const { current, suggested } = exampleResult;
  const margin = formatPercent(example.input.marginPercent / 100);

  return (
    <figure className="tag-figure">
      <div className="tag">
        <span className="tag-hole" aria-hidden="true" />
        <p className="tag-product">{example.name}</p>
        <dl className="tag-rows">
          <div>
            <dt>Cobra hoje</dt>
            <dd>{formatBRL(current.price)}</dd>
          </div>
          <div>
            <dt>Acha que sobra</dt>
            <dd>{formatBRL(current.naiveProfit)}</dd>
          </div>
          <div className="tag-real">
            <dt>Sobra de verdade</dt>
            <dd>{formatBRL(current.profit)}</dd>
          </div>
        </dl>
        <div className="tag-total">
          <span>Com {margin} de lucro</span>
          <strong>{formatBRL(suggested.price)}</strong>
        </div>
      </div>
      <figcaption>Exemplo com números fictícios. Faça a conta do seu produto logo abaixo.</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Clara, início">
          <span className="brand-mark">c.</span>
          <span>clara</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#problema">O problema</a>
          <a href="#simulador">Simular preço</a>
          <a href="#proximos-passos">Próximos passos</a>
        </nav>
        <a className="button button-small" href="#simulador">
          Calcular meu preço
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="hero-kicker">Precificação para quem empreende sozinha</p>
          <h1>Quanto sobra, de verdade, em cada venda?</h1>
          <p className="hero-description">
            A Clara calcula o custo real do que você vende, com ingredientes, embalagem, seu
            tempo, as contas do mês e a taxa da maquininha, e mostra o preço que deixa lucro.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#simulador">
              Calcular meu preço
            </a>
            <a className="text-link" href={repoUrl} target="_blank" rel="noreferrer">
              Ver o código no GitHub
            </a>
          </div>
        </div>
        <HeroTag />
      </section>

      <section className="problem-section" id="problema">
        <div className="container problem-grid">
          <h2>Vender muito não significa lucrar bem.</h2>
          <div className="problem-copy">
            <p>
              Quem empreende conhece o próprio produto, atende clientes, compra insumos e faz o
              negócio acontecer. Mas nem sempre consegue enxergar quanto custa produzir, quanto
              precisa vender ou quanto realmente sobra.
            </p>
            <p>
              O preço costuma nascer de um chute ou do preço da concorrente. O tempo de trabalho,
              o gás, a luz e a taxa do cartão ficam de fora, e o lucro some sem ninguém perceber.
            </p>
          </div>
        </div>
        <ul className="container problem-strip">
          <li>Custos que ninguém vê</li>
          <li>Preço definido no chute</li>
          <li>Trabalho que não entra na conta</li>
        </ul>
      </section>

      <section className="sim-section" id="simulador">
        <div className="container">
          <div className="section-heading">
            <h2>Descubra o seu preço em quatro passos</h2>
            <p>
              Comece com um exemplo ou use os números do seu produto. O resultado muda enquanto
              você digita, e mostra de onde vem cada parte do preço.
            </p>
          </div>
          <PricingSimulator />
        </div>
      </section>

      <section className="roadmap-section" id="proximos-passos">
        <div className="container">
          <h2>O que a Clara já faz e o que vem a seguir</h2>
          <div className="roadmap-grid">
            <div>
              <h3>Já funciona</h3>
              <ul className="roadmap-list roadmap-done">
                {available.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Em construção</h3>
              <ul className="roadmap-list">
                {next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="principles-section" id="proposito">
        <div className="container principles-content">
          <h2>Mais do que automatizar tarefas, queremos ampliar a autonomia.</h2>
          <p>
            A inteligência artificial pode ajudar a interpretar e organizar informações. Os
            cálculos financeiros, por sua vez, seguem regras claras, verificáveis e transparentes.
            Assim, a tecnologia apoia a compreensão, sem tirar da empreendedora o controle sobre
            seus próprios dados e decisões.
          </p>
        </div>
      </section>

      <section className="closing-section">
        <h2>Pequenos negócios também merecem grandes ferramentas.</h2>
        <p>Clara, projeto do HackBrasil 2026 na trilha Pagamentos e Finanças.</p>
        <a className="button button-light" href={repoUrl} target="_blank" rel="noreferrer">
          Ver o projeto no GitHub
        </a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark">c.</span>
          <span>clara</span>
        </a>
        <span>Um projeto de inclusão e autonomia financeira.</span>
        <span>© 2026 Clara</span>
      </footer>
    </main>
  );
}
