import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Klara AI</p>
          <p className="mt-4 max-w-xl text-sm text-slate-400">
            The AI revenue system for modern teams, built with elegant workflows and intelligent automation.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <Link href="#" className="transition hover:text-white">Product</Link>
          <Link href="#" className="transition hover:text-white">Features</Link>
          <Link href="#" className="transition hover:text-white">Company</Link>
          <Link href="#" className="transition hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
