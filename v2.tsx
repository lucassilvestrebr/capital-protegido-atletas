import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useReducedMotion } from 'framer-motion'
import { Building2, Check, CircleDollarSign, Expand, Landmark, ShieldCheck, UserRound } from 'lucide-react'
import './v2.css'

type Slide = {
  index: string
  label: string
  title: React.ReactNode
  body?: string
  visual: string
}

const slides: Slide[] = [
  { index: '00', label: 'V2 / A tese', title: <>Capital<br/><em>inteligente.</em></>, body: 'Uma arquitetura de investimento que financia o presente do atleta sem concentrar todo o capital no mesmo risco.', visual: 'cover' },
  { index: '01', label: 'O ponto de partida', title: <>O atleta quer <em>liquidez.</em><br/>O investidor precisa de <em>arquitetura.</em></>, body: 'A proposta só funciona quando começa por essa realidade — e não pela tentativa de vender uma estrutura financeira ao atleta.', visual: 'tension' },
  { index: '02', label: 'O problema', title: <>O risco não está apenas em investir.<br/><em>Está em investir tudo da mesma forma.</em></>, body: 'Quando 100% do capital depende da carreira, qualquer desvio de trajetória atinge 100% da posição.', visual: 'single' },
  { index: '03', label: 'A inversão', title: <>A oferta parte do <em>investidor.</em></>, body: 'O atleta recebe o recurso de que precisa. O investidor define uma arquitetura que separa liquidez imediata e formação de patrimônio imobiliário.', visual: 'offer' },
  { index: '04', label: 'A estrutura', title: <>O mesmo compromisso de capital.<br/><em>Duas funções econômicas.</em></>, body: 'Uma parcela entra na operação da carreira. Outra financia uma aquisição imobiliária programada.', visual: 'split' },
  { index: '05', label: 'A titularidade', title: <>O patrimônio nasce no CNPJ.<br/><em>O ativo é um imóvel.</em></>, body: 'O CNPJ recebe os aportes, conduz a aquisição e permanece como titular do imóvel.', visual: 'vehicle' },
  { index: '06', label: 'A distinção central', title: <><em>Propriedade</em> não é a mesma coisa que <em>benefício.</em></>, body: 'O CNPJ mantém a titularidade do imóvel. O atleta pode ser beneficiário condicionado, sem precisar integrar o quadro societário.', visual: 'roles' },
  { index: '07', label: 'A camada contratual', title: <>O retorno da carreira e o benefício imobiliário vivem em <em>instrumentos distintos.</em></>, body: 'O contrato principal continua definindo a participação econômica. Um instrumento complementar disciplina o benefício sobre o imóvel e suas condições.', visual: 'contracts' },
  { index: '08', label: 'O benefício', title: <>O benefício não nasce livre.<br/><em>Ele é conquistado.</em></>, body: 'O direito econômico do atleta amadurece conforme permanência, conduta e cumprimento das obrigações pactuadas.', visual: 'vesting' },
  { index: '09', label: 'Os gatilhos', title: <>Tempo. Conformidade.<br/><em>Marco econômico.</em></>, body: 'Os três eixos podem operar juntos: não basta esperar, performar ou apenas permanecer — é preciso cumprir a arquitetura.', visual: 'triggers' },
  { index: '10', label: 'As saídas', title: <>Nem toda saída é igual.<br/><em>O contrato precisa saber disso.</em></>, body: 'A consequência deve acompanhar a causa: saída regular, descumprimento sanável ou abandono deliberado.', visual: 'leavers' },
  { index: '11', label: 'Cenário A', title: <>Se a carreira funciona, o atleta recebe <em>mais do que liquidez.</em></>, body: 'Cumpridas as condições, o benefício sobre o imóvel é entregue na forma e no momento definidos pelo contrato.', visual: 'success' },
  { index: '12', label: 'Cenário B', title: <>Se a carreira não funciona, o investidor não precisa perder <em>todas as camadas.</em></>, body: 'O capital consumido na carreira segue exposto. O imóvel permanece no CNPJ, conforme as condições da operação.', visual: 'downside' },
  { index: '13', label: 'A aquisição', title: <>O capital programado se transforma em <em>patrimônio imobiliário.</em></>, body: 'O CNPJ realiza a aquisição, mantém a titularidade e o contrato define a destinação futura do benefício.', visual: 'paths' },
  { index: '14', label: 'O mecanismo', title: <>A aquisição imobiliária é <em>consequência.</em><br/>Não é a tese.</>, body: 'A tese está em separar funções: uma parte do capital desenvolve a carreira; a outra constrói um ativo real sob governança contratual.', visual: 'mechanism' },
  { index: '15', label: 'A leitura do investidor', title: <>Uma posição de crescimento.<br/>Um patrimônio <em>imobiliário em formação.</em></>, body: 'O investidor não elimina o risco esportivo. Ele evita que todo o capital tenha o mesmo destino econômico.', visual: 'portfolio' },
  { index: '16', label: 'O efeito no atleta', title: <>O benefício imobiliário é consequência.<br/><em>Não é a venda inicial.</em></>, body: 'O atleta recebe liquidez hoje e pode conquistar um imóvel amanhã — se cumprir o pacto.', visual: 'athlete' },
  { index: '17', label: 'A tese', title: <>O futuro do atleta continuará incerto.<br/><em>A forma de financiá-lo não precisa ser.</em></>, body: 'Capital inteligente. Contratos com funções claras. Incentivos alinhados do início ao fim.', visual: 'closing' },
]

const Node = ({ children, accent = false }: { children: React.ReactNode, accent?: boolean }) => <div className={`node ${accent ? 'accent' : ''}`}>{children}</div>

function Visual({ kind }: { kind: string }) {
  if (kind === 'cover') return <div className="cover-art"><span className="ghost">02</span><div className="cover-stack"><i/><i/><b>CAPITAL</b></div><p>CARREIRA<br/>+<br/>PATRIMÔNIO</p></div>
  if (kind === 'tension') return <div className="tension visual-frame"><div><UserRound/><small>ATLETA</small><strong>DINHEIRO<br/>AGORA</strong></div><span>≠</span><div><ShieldCheck/><small>INVESTIDOR</small><strong>RETORNO<br/>+ RESGUARDO</strong></div></div>
  if (kind === 'single') return <div className="single-risk"><div className="capital-dot">CAPITAL</div><div className="risk-line"/><div className="risk-box"><span>100%</span><strong>CARREIRA</strong><small>uma única variável central</small></div></div>
  if (kind === 'offer') return <div className="offer-flow"><Node accent>INVESTIDOR</Node><span>estrutura a oferta</span><div className="arrow-long">→</div><Node>ATLETA</Node><span>recebe liquidez</span></div>
  if (kind === 'split') return <div className="split"><div className="split-head"><span>CAPITAL TOTAL</span><b>100%</b></div><div className="split-track"><i/><i/></div><div className="split-labels"><div><b>CAMADA 01</b><strong>CARREIRA</strong><span>liquidez + desenvolvimento</span></div><div><b>CAMADA 02</b><strong>IMÓVEL</strong><span>aquisição programada</span></div></div><small>Proporção ilustrativa — calibrada caso a caso.</small></div>
  if (kind === 'vehicle') return <div className="vehicle"><div className="vehicle-people"><span>INVESTIDORES</span><span>APORTES</span></div><div className="vehicle-core"><Building2/><strong>CNPJ<br/>TITULAR</strong><small>patrimônio imobiliário</small></div><div className="vehicle-tail"><span>AQUISIÇÃO</span><span>GOVERNANÇA</span></div></div>
  if (kind === 'roles') return <div className="roles"><div><Landmark/><small>TITULAR</small><strong>CNPJ</strong><span>propriedade<br/>do imóvel</span></div><div className="role-link">condições</div><div><UserRound/><small>BENEFICIÁRIO</small><strong>ATLETA</strong><span>direito futuro<br/>condicionado</span></div></div>
  if (kind === 'contracts') return <div className="contracts"><div><b>01</b><strong>CONTRATO<br/>PRINCIPAL</strong><span>retorno econômico<br/>da carreira</span></div><i>+</i><div className="contract-accent"><b>02</b><strong>BENEFÍCIO<br/>CONDICIONADO</strong><span>regras sobre<br/>o imóvel</span></div></div>
  if (kind === 'vesting') return <div className="vesting"><div className="vesting-track"><i/><i/><i/><i/></div><div className="vesting-years"><span>INÍCIO</span><span>MARCO 01</span><span>MARCO 02</span><span>ENTREGA</span></div><div className="vesting-value"><b>0%</b><b>25%</b><b>60%</b><b>100%</b></div><small>Curva conceitual. Percentuais e prazos dependem da operação.</small></div>
  if (kind === 'triggers') return <div className="triggers"><div><span>01</span><strong>TEMPO</strong><small>permanência mínima</small></div><div><span>02</span><strong>CONFORMIDADE</strong><small>obrigações cumpridas</small></div><div><span>03</span><strong>MARCO</strong><small>evento econômico definido</small></div><b className="trigger-result">BENEFÍCIO<br/>MADURO</b></div>
  if (kind === 'leavers') return <div className="leavers"><div><span>SAÍDA REGULAR</span><b>direito adquirido preservado</b><small>conforme condições já cumpridas</small></div><div><span>DESCUMPRIMENTO SANÁVEL</span><b>notificação + prazo de cura</b><small>consequência proporcional</small></div><div className="bad"><span>ABANDONO / MÁ-FÉ</span><b>benefício não adquirido se perde</b><small>imóvel permanece no CNPJ</small></div></div>
  if (kind === 'success') return <div className="branch success"><div className="branch-start">CARREIRA<br/><b>FUNCIONA</b></div><span>→</span><div><Check/><strong>CONDIÇÕES<br/>CUMPRIDAS</strong></div><span>→</span><div className="branch-end">BENEFÍCIO<br/><b>ENTREGUE</b></div></div>
  if (kind === 'downside') return <div className="downside"><div><span>CAMADA 01</span><strong>CAPITAL DE CARREIRA</strong><b>EXPOSTO</b></div><div><span>CAMADA 02</span><strong>IMÓVEL</strong><b>NO CNPJ</b></div><small>A preservação efetiva depende do estágio da aquisição e das condições contratuais.</small></div>
  if (kind === 'paths') return <div className="paths"><div className="path-root"><CircleDollarSign/><strong>CAPITAL<br/>PROGRAMADO</strong></div><div className="path-lines"><i/><i/></div><div className="path-options"><Node>COMPRA DO<br/>IMÓVEL</Node><Node>TITULARIDADE<br/>DO CNPJ</Node></div><div className="path-base">DESTINAÇÃO FUTURA DEFINIDA EM CONTRATO</div></div>
  if (kind === 'mechanism') return <div className="mechanism"><span>CAPITAL<br/>DEFINIDO</span><i>→</i><span>APORTES<br/>PROGRAMADOS</span><i>→</i><span>AQUISIÇÃO<br/>IMOBILIÁRIA</span><i>→</i><span>ATIVO<br/>REAL</span></div>
  if (kind === 'portfolio') return <div className="portfolio"><div className="portfolio-top"><span>EXPOSIÇÃO TOTAL</span><b>R$</b></div><div className="portfolio-grid"><div><small>01 / UPSIDE</small><strong>RETORNO DA<br/>CARREIRA</strong><span>alto potencial<br/>alta incerteza</span></div><div><small>02 / RESGUARDO</small><strong>PATRIMÔNIO<br/>IMOBILIÁRIO</strong><span>ativo definido<br/>governança contratual</span></div></div></div>
  if (kind === 'athlete') return <div className="athlete-path"><div><b>HOJE</b><strong>LIQUIDEZ</strong><span>para executar<br/>a carreira</span></div><i>+</i><div><b>DURANTE</b><strong>DISCIPLINA</strong><span>para cumprir<br/>o pacto</span></div><i>=</i><div className="athlete-result"><b>AMANHÃ</b><strong>PATRIMÔNIO</strong><span>benefício<br/>conquistado</span></div></div>
  return <div className="closing-mark"><div><span>C</span><span>I</span></div><p>CAPITAL<br/><b>INTELIGENTE</b></p><small>LUCAS SILVESTRE — 2026</small></div>
}

function App() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  const reduce = useReducedMotion()

  const go = (next: number) => refs.current[Math.max(0, Math.min(slides.length - 1, next))]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.slide))
    }), { threshold: .62 })
    refs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(active + 1) }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(active - 1) }
      if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, reduce])

  return <main className="deck">
    <header className="masthead">
      <div className="identity"><a className="backToPortal" href="/">← TESES</a><img className="verossLogo light" src="https://www.veross.com.br/img/logos/logo-veross.svg" alt="Veross"/><p>CAPITAL INTELIGENTE<small>HOLOFOTE NO INVESTIDOR</small></p></div>
      <div className="author">LUCAS SILVESTRE / 2026<button onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Abrir em tela cheia"><Expand size={14}/></button></div>
    </header>
    <aside className="rail" aria-label="Progresso da apresentação"><i style={{ height: `${((active + 1) / slides.length) * 100}%` }}/></aside>
    <div className="counter"><b>{slides[active].index}</b><span>— {String(slides.length - 1).padStart(2, '0')}</span></div>
    <div className="slides">
      {slides.map((slide, index) => <section className={`slide slide-${slide.visual}`} key={slide.index} data-slide={index} ref={element => { refs.current[index] = element }}>
        <div className="grid">
          <motion.div className="copy" initial={{ opacity: 0, y: reduce ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .55 }} transition={{ duration: .65 }}>
            <span className="label">{slide.index} / {slide.label}</span>
            <h1>{slide.title}</h1>
            {slide.body && <p>{slide.body}</p>}
          </motion.div>
          <motion.div className="visual" initial={{ opacity: 0, scale: reduce ? 1 : .975 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .4 }} transition={{ duration: .8, delay: .08 }}><Visual kind={slide.visual}/></motion.div>
        </div>
      </section>)}
    </div>
    <footer><span>SCROLL / SETAS / ESPAÇO</span><span>F — TELA CHEIA</span></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)



