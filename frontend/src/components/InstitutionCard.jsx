import { Check, MapPin, Plus, Scale } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useComparison } from '../context/useComparison'
import { Badge, Stars } from './ui'

export function InstitutionVisual({ institution, className = '' }) {
  return <div className={`institution-art ${institution.palette} ${className}`} role="img" aria-label={`Illustrated campus placeholder for ${institution.name}`}><span className="art-sun" /><span className="art-building art-building-one" /><span className="art-building art-building-two" /><span className="art-ground" /></div>
}

export default function InstitutionCard({ institution, layout = 'grid' }) {
  const { comparisonIds, toggleComparison } = useComparison()
  const selected = comparisonIds.includes(institution.id)
  return <article className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lift ${layout === 'list' ? 'sm:flex' : ''}`}>
    <InstitutionVisual institution={institution} className={layout === 'list' ? 'h-48 sm:h-auto sm:w-72' : 'h-44'} />
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3"><Badge tone={institution.badge === 'Top rated' ? 'amber' : 'teal'}>{institution.badge}</Badge><button onClick={() => toggleComparison(institution.id)} className={`grid size-9 place-items-center rounded-lg border transition focus:outline-none focus:ring-4 focus:ring-teal/10 ${selected ? 'border-teal bg-mist text-teal' : 'border-slate-200 text-slate-500 hover:border-teal hover:text-teal'}`} aria-label={`${selected ? 'Remove' : 'Add'} ${institution.name} ${selected ? 'from' : 'to'} comparison`}>{selected ? <Check size={17} /> : <Plus size={17} />}</button></div>
      <Link to={`/institutions/${institution.slug}`} className="mt-4 block"><h3 className="text-lg font-bold text-ink transition group-hover:text-teal">{institution.name}</h3></Link>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={15} />{institution.city}, {institution.state}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{institution.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><div><Stars value={institution.rating} /><span className="ml-1 text-xs text-slate-500">({institution.reviews})</span></div><span className="text-sm font-semibold text-ink">{institution.fee}</span></div>
      <div className="mt-4 flex gap-2"><Link className="flex-1 rounded-xl bg-ink px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-ink/90" to={`/institutions/${institution.slug}`}>View details</Link><button onClick={() => toggleComparison(institution.id)} className="rounded-xl border border-slate-200 px-3 text-slate-600 hover:border-teal hover:text-teal" aria-label="Compare institution"><Scale size={18} /></button></div>
    </div>
  </article>
}
