import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Building2, Layers3 } from 'lucide-react'
import { motion } from 'framer-motion'
import './portal.css'

const theses = [
  {
    number: '01',
    title: 'Capital Protegido',
    eyebrow: 'Holofote no atleta',
    description: 'Desenvolver o presente do atleta enquanto uma parcela do capital começa a construir o patrimônio do futuro.',
    detail: 'CARREIRA + PROTEÇÃO + PATRIMÔNIO',
    href: '/tese-original.html',
    icon: Layers3,
    tone: 'athlete',
  },
  {
    number: '02',
    title: 'Capital Inteligente',
    eyebrow: 'Holofote no investidor',
    description: 'Separar funções econômicas: liquidez para a carreira e aquisição imobiliária sob governança contratual.',
    detail: 'LIQUIDEZ + IMÓVEL + ALINHAMENTO',
    href: '/capital-inteligente.html',
    icon: Building2,
    tone: 'investor',
  },
]

function Portal() {
  return <main className="portal">
    <header>
      <div className="portalBrand"><img src="https://www.veross.com.br/img/logos/logo-veross.svg" alt="Veross"/><p>TESES PARA DESENVOLVIMENTO DE ATLETAS<small>LUCAS SILVESTRE / 2026</small></p></div>
      <div className="portalEdition">DUAS ARQUITETURAS<br/>UMA CONVERSA</div>
    </header>
    <section className="portalIntro">
      <span className="portalLabel">SELECIONE UMA TESE</span>
      <h1>Duas formas de estruturar<br/>o <em>mesmo futuro.</em></h1>
      <p>Cada proposta parte de uma perspectiva diferente. Escolha uma delas para abrir a apresentação completa.</p>
    </section>
    <section className="thesisGrid">
      {theses.map((thesis, index) => {
        const Icon = thesis.icon
        return <motion.a className={`thesisCard ${thesis.tone}`} href={thesis.href} key={thesis.number} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .12 + index * .1 }}>
          <div className="footballMark" aria-hidden="true"><i/><i/><b>●</b><b>●</b><b>●</b></div>
          <div className="cardTop"><span>{thesis.number}</span><Icon size={21}/></div>
          <div className="cardCopy"><small>{thesis.eyebrow}</small><h2>{thesis.title}</h2><p>{thesis.description}</p></div>
          <div className="cardFoot"><span>{thesis.detail}</span><ArrowUpRight size={18}/></div>
        </motion.a>
      })}
    </section>
    <footer><span>ARQUITETURA DE CAPITAL / DESENVOLVIMENTO DE ATLETAS</span><span>2026</span></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<Portal />)
