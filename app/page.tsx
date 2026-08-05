import Link from 'next/link';

const destinations = [
  { title: 'Lake George', copy: 'A mountain-lake weekend built around marinas, waterfront dining, islands, and family adventure.', href: '/destinations/lake-george' },
  { title: 'Thousand Islands', copy: 'Castles, island passages, quiet coves, and dockside stops across New York and Ontario.', href: '/destinations/thousand-islands' },
  { title: 'Finger Lakes', copy: 'Deep water, wine-country towns, easy launches, and relaxed weekend cruising.', href: '/destinations/finger-lakes' },
];

const gear = [
  { title: 'Chartplotters', copy: 'Real navigation guidance for inland lakes, fishing, and coastal cruising.', href: '/gear/chartplotters' },
  { title: 'Boat Coolers', copy: 'Durable options that stay cold without taking over the deck.', href: '/gear/boat-coolers' },
  { title: 'Life Jackets', copy: 'Comfortable, correctly rated options for adults and children.', href: '/gear/life-jackets' },
];

function Cards({ items }: { items: typeof destinations }) {
  return <div className="cardGrid">{items.map(item => <article className="card" key={item.href}><div className="cardMedia">Verified photography reserved</div><div className="cardBody"><h3>{item.title}</h3><p>{item.copy}</p><Link className="textLink" href={item.href}>Open guide →</Link></div></article>)}</div>;
}

export default function HomePage() {
  return <main>
    <section className="hero"><div className="shell heroInner"><div className="eyebrow">Premium guidance for life on the water</div><h1>Live the Water.</h1><p>Discover remarkable waterways, trustworthy gear, and practical planning for better weekends aboard.</p><div className="actions"><Link className="button" href="/destinations">Explore Destinations</Link><Link className="button alt" href="/gear">Browse Gear Guides</Link></div></div></section>
    <section><div className="shell"><div className="sectionHead"><div><div className="eyebrow" style={{color:'var(--blue)'}}>Featured waterways</div><h2>Go somewhere worth remembering.</h2></div><p>Every destination receives its own route, content model, and verified photo library. No mislabeled scenery and no dead-end links.</p></div><Cards items={destinations}/></div></section>
    <section className="dark"><div className="shell"><div className="sectionHead"><div><div className="eyebrow">Captain approved</div><h2>Gear that earns its place aboard.</h2></div><p>Each category now opens a dedicated buying guide instead of falling through to a generic cooler page.</p></div><Cards items={gear}/></div></section>
  </main>;
}
