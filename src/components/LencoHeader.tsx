'use client';
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

export default function LencoHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/lenco-logo.svg"
              alt="Lenco"
              className="h-7 dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <div className="relative group">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-medium">
                Products
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-medium">
                Business
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Pricing
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-medium">
                Support
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <a href="#login" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Log in
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatedThemeToggler className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors [&_svg]:size-5" />
            <a
              href="#get-started"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md transition-colors"
            >
              Get Started in Minutes
            </a>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <AnimatedThemeToggler className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors [&_svg]:size-5" />
            <button
              className="p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border py-4">
          <nav className="flex flex-col gap-4 px-4">
            <a href="#products" className="text-muted-foreground hover:text-foreground font-medium py-2">
              Products
            </a>
            <a href="#business" className="text-muted-foreground hover:text-foreground font-medium py-2">
              Business
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground font-medium py-2">
              Pricing
            </a>
            <a href="#support" className="text-muted-foreground hover:text-foreground font-medium py-2">
              Support
            </a>
            <a href="#login" className="text-muted-foreground hover:text-foreground font-medium py-2">
              Log in
            </a>
            <a
              href="#get-started"
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors text-center"
            >
              Get Started in Minutes
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
