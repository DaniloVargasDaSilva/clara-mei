const features = [
  {
    number: "01",
    title: "Organização financeira",
    description:
      "Registre receitas e despesas, acompanhe as movimentações e construa uma visão mais clara do dinheiro do negócio.",
  },
  {
    number: "02",
    title: "Registros em linguagem natural",
    description:
      "Conte o que aconteceu no seu dia a dia. A proposta é transformar descrições simples em informações organizadas, para você revisar antes de confirmar.",
  },
  {
    number: "03",
    title: "Precificação consciente",
    description:
      "Organize custos, taxas e margem desejada para simular preços e entender quais premissas formam o valor de venda.",
  },
  {
    number: "04",
    title: "Informação que orienta",
    description:
      "Visualize indicadores e receba explicações em linguagem simples para apoiar decisões mais conscientes.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Clara, início">
          <span className="brand-mark">c.</span>
          <span>clara</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#solucao">Como funciona</a>
          <a href="#proposito">Nosso propósito</a>
        </nav>
        <a className="header-link" href="https://github.com/iri-campos/clara-mei" target="_blank" rel="noreferrer">
          Acompanhe o projeto <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> Gestão financeira para quem empreende</span>
          <h1>Seu negócio merece entender <em>o próprio dinheiro.</em></h1>
          <p className="hero-description">
            A Clara é uma assistente de gestão financeira pensada para microempreendedoras
            que querem organizar suas finanças, compreender seus resultados e tomar
            decisões melhores para o negócio.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#solucao">Conheça a Clara <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="https://github.com/iri-campos/clara-mei" target="_blank" rel="noreferrer">
              Ver desenvolvimento no GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-note">Uma ideia que transforma números em autonomia.</p>
        </div>

        <div className="hero-art" aria-label="Ilustração conceitual de organização financeira">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card art-card-main">
            <div className="art-card-top"><span className="mini-brand">c.</span><span className="art-label">VISÃO DO NEGÓCIO</span><span className="art-menu">···</span></div>
            <div className="art-caption">Clareza para decidir</div>
            <div className="art-bars"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="art-card-bottom"><span>Organização</span><span className="art-status">em construção</span></div>
          </div>
          <div className="floating-note note-top"><span className="note-icon">✳</span><span>Do dia a dia<br /><strong>para a gestão</strong></span></div>
          <div className="floating-note note-bottom"><span className="note-icon note-icon-soft">↗</span><span>Preço com<br /><strong>mais consciência</strong></span></div>
          <div className="art-sparkle sparkle-one">✳</div>
          <div className="art-sparkle sparkle-two">✳</div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>CLAREZA FINANCEIRA</span></div>
      </section>

      <section className="problem-section" id="sobre">
        <div className="section-kicker">O desafio</div>
        <div className="problem-grid">
          <h2>Vender muito<br />não significa<br /><em>lucrar bem.</em></h2>
          <div className="problem-copy">
            <p>
              Quem empreende conhece o próprio produto, atende clientes, compra insumos
              e faz o negócio acontecer. Mas nem sempre consegue enxergar com clareza
              quanto custa produzir, quanto precisa vender ou quanto realmente sobra.
            </p>
            <p>
              A dificuldade não está apenas em registrar números. Está em transformar
              esses números em informação compreensível e decisões possíveis.
            </p>
          </div>
        </div>
        <div className="problem-strip">
          <span>Custos pouco visíveis</span><span className="strip-separator">✳</span>
          <span>Preços sem método</span><span className="strip-separator">✳</span>
          <span>Finanças difíceis de interpretar</span>
        </div>
      </section>

      <section className="solution-section" id="solucao">
        <div className="section-heading">
          <div>
            <div className="section-kicker">A proposta</div>
            <h2>Uma gestão que<br /><em>fala a sua língua.</em></h2>
          </div>
          <p>
            A Clara combina uma experiência simples, inteligência artificial e regras
            financeiras estruturadas para aproximar a gestão da rotina de quem empreende.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-top"><span>{feature.number}</span><span className="feature-arrow">↗</span></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section" id="proposito">
        <div className="principles-mark">c.</div>
        <div className="principles-content">
          <div className="section-kicker">Tecnologia com propósito</div>
          <h2>Mais do que automatizar tarefas, queremos <em>ampliar a autonomia.</em></h2>
          <p>
            A inteligência artificial pode ajudar a interpretar e organizar informações.
            Os cálculos financeiros, por sua vez, devem seguir regras claras, verificáveis
            e transparentes. Assim, a tecnologia apoia a compreensão — sem tirar da
            empreendedora o controle sobre seus próprios dados e decisões.
          </p>
        </div>
      </section>

      <section className="closing-section">
        <div className="section-kicker">Clara · HackBrasil 2026</div>
        <h2>Pequenos negócios também merecem <em>grandes ferramentas.</em></h2>
        <p>Gestão financeira que fala a sua língua.</p>
        <a className="button button-light" href="https://github.com/iri-campos/clara-mei" target="_blank" rel="noreferrer">
          Conheça o projeto no GitHub <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark">c.</span><span>clara</span></a>
        <span>Um projeto de inclusão e autonomia financeira.</span>
        <span>© 2026 Clara</span>
      </footer>
    </main>
  );
}
