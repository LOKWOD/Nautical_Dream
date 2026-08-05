import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const guides = {
  chartplotters: {
    title: 'Best Chartplotters',
    kicker: 'Marine navigation',
    intro: 'A dedicated guide to choosing the right display size, charts, sonar support, networking, and controls for your boat.',
    criteria: ['Screen visibility in direct sun','Chart coverage and update costs','Sonar and radar compatibility','Physical controls versus touchscreen','NMEA 2000 networking'],
  },
  'boat-coolers': {
    title: 'Best Boat Coolers',
    kicker: 'Dock and deck',
    intro: 'A dedicated guide to coolers that retain ice, fit safely aboard, resist sliding, and survive repeated marine use.',
    criteria: ['Usable interior capacity','Deck footprint','Ice retention','Latch and hinge durability','Drain placement and grip'],
  },
  'life-jackets': {
    title: 'Best Life Jackets',
    kicker: 'Family safety',
    intro: 'A dedicated guide to properly rated PFDs that fit correctly and remain comfortable enough to wear all day.',
    criteria: ['USCG classification','Correct weight and chest fit','Mobility and comfort','Grab handles for children','Visibility and reflective details'],
  },
} as const;

type GuideSlug = keyof typeof guides;

export function generateStaticParams(){ return Object.keys(guides).map(slug=>({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const guide=guides[slug as GuideSlug];
  return guide ? {title:guide.title,description:guide.intro} : {};
}

export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const guide=guides[slug as GuideSlug]; if(!guide) notFound();
  return <main><section className="pageHero"><div className="shell"><div className="eyebrow">{guide.kicker}</div><h1>{guide.title}</h1><p>{guide.intro}</p></div></section><section><div className="shell guideGrid"><article className="panel"><div className="eyebrow" style={{color:'var(--blue)'}}>Buying framework</div><h2>What this guide evaluates</h2><p>This page now has its own route and subject-specific content model. Product photography and recommendations will only be added after they are verified against this exact category.</p><div className="routeList">{guide.criteria.map(item=><div key={item}>{item}</div>)}</div></article><aside className="panel"><div className="eyebrow" style={{color:'var(--blue)'}}>Publishing status</div><h2>Foundation complete</h2><p>No placeholder affiliate links. No unrelated product page. No image goes live until the subject is visually confirmed.</p></aside></div></section></main>;
}
