import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Kontakt</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-slate-600 hover:text-primary">Møller Intelligence</li>
              <li className="text-sm text-slate-600 hover:text-primary">Email: mm@mollerintelligence.dk</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Kom i gang med affiliate marketing</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-slate-600 hover:text-primary">Hvad er affiliate marketing?</li>
              <li className="text-sm text-slate-600 hover:text-primary">Best Practices</li>
              <li className="text-sm text-slate-600 hover:text-primary">Success Stories</li>
              <li className="text-sm text-slate-600 hover:text-primary">Resources</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Hjælp og information</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-slate-600 hover:text-primary">Privacy Policy</li>
              <li className="text-sm text-slate-600 hover:text-primary">Privatlivspolitik</li>
              <li className="text-sm text-slate-600 hover:text-primary">Cookiepolitik</li>
              <li className="text-sm text-slate-600 hover:text-primary">
                <Link href="/licenses">Third-Party Licenses</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-slate-600">
            © 2024 Affiliate Programs. All rights reserved. Icons by <a href="https://lucide.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Lucide</a>.
          </p>
        </div>
      </div>
    </footer>
  )
} 