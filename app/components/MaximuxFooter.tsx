'use client'

import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export default function MaximuxFooter() {
  return (
    <footer className="relative border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-slate-900">Klara AI</h3>
            <p className="mt-2 text-sm text-slate-600">
              Automate workflows, move faster, and scale growth.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-900">Product</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Features</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Pricing</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Integrations</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Changelog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-900">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Security</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Cookies</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-slate-900">Stay Updated</h4>
            <p className="mt-2 text-sm text-slate-600">
              Get the latest updates on AI automation.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition">
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-600">
              © 2024 Klara AI. All rights reserved.
            </p>
            <p className="text-sm text-slate-600">
              Made with ❤️ by the Klara team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
