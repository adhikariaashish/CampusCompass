import { Route, Routes } from 'react-router-dom'
import ComparisonTray from './components/ComparisonTray'
import { Footer } from './components/Navigation'
import Navigation from './components/Navigation'
import { ComparisonProvider } from './context/ComparisonContext'
import AdminPage from './pages/AdminPage'
import ComparePage from './pages/ComparePage'
import DiscoveryPage from './pages/DiscoveryPage'
import HomePage from './pages/HomePage'
import InstitutionPage from './pages/InstitutionPage'
import ReviewPage from './pages/ReviewPage'
import SignInPage from './pages/SignInPage'

function NotFound() { return <main className="mx-auto max-w-7xl px-4 py-24 text-center"><p className="text-sm font-bold text-teal">404</p><h1 className="mt-2 text-4xl font-bold text-ink">This page is off the map.</h1></main> }

export default function App() { return <ComparisonProvider><div className="min-h-screen bg-cream text-slate-800"><Navigation /><Routes><Route path="/" element={<HomePage />} /><Route path="/institutions" element={<DiscoveryPage />} /><Route path="/institutions/:slug" element={<InstitutionPage />} /><Route path="/compare" element={<ComparePage />} /><Route path="/review" element={<ReviewPage />} /><Route path="/sign-in" element={<SignInPage />} /><Route path="/admin" element={<AdminPage />} /><Route path="*" element={<NotFound />} /></Routes><ComparisonTray /><Footer /></div></ComparisonProvider> }
