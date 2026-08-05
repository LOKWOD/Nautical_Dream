import Link from 'next/link';

const guides = [
  ['Chartplotters', '/gear/chartplotters', 'Marine navigation displays for inland, fishing, and coastal use.'],
  ['Boat Coolers', '/gear/boat-coolers', 'Hard-sided coolers selected for ice retention, footprint, and durability.'],
  ['Life Jackets', '/gear/life-jackets', 'Comfortable, correctly rated PFDs for adults and children.'],
];

export default function GearPage(){
  return <main><section className="pageHero"><div className="shell"><div className="eyebrow">Captain-approved equipment</div><h1>Gear Guides</h1><p>Clear recommendations, dedicated routes, and no generic page pretending to cover unrelated products.</p></div></section><section><div className="shell"><div className="cardGrid">{guides.map(([title,href,copy])=><article className="card" key={href}><div className="cardMedia">{title}</div><div className="cardBody"><h3>{title}</h3><p>{copy}</p><Link className="textLink" href={href}>Open guide →</Link></div></article>)}</div></div></section></main>;
}
