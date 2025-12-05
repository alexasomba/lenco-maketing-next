import Link from 'next/link';
import { BookOpen, Newspaper, ArrowRight } from 'lucide-react';
import LencoHeader from '@/components/LencoHeader';
import LencoFooter from '@/components/LencoFooter';
import { AfricaGlobe } from '@/components/africa-globe';

export default function Home() {
	return (
		<>
			<LencoHeader />
			<main className="flex-1">
				{/* Hero Section with Globe */}
				<section className="relative min-h-[80vh] flex items-center overflow-hidden bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
					{/* Globe Background */}
					<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-60 dark:opacity-40 pointer-events-none md:pointer-events-auto">
						<AfricaGlobe className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" />
					</div>
					
					{/* Content */}
					<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
						<div className="max-w-2xl">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mb-6">
								<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
								Now live in Nigeria, Zambia, Mozambique & Kenya
							</div>
							<h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
								Banking infrastructure for{' '}
								<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
									Africa
								</span>
							</h1>
							<p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
								Build powerful financial products with our APIs. Accept payments, 
								manage accounts, and scale across African markets.
							</p>
							<div className="flex flex-wrap gap-4">
								<Link
									href="/docs/v1"
									className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
								>
									Get Started
									<ArrowRight className="w-4 h-4" />
								</Link>
								<Link
									href="/docs/v1"
									className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
								>
									View Documentation
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Cards Section */}
				<section className="py-20 bg-white dark:bg-slate-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
								Explore Lenco
							</h2>
							<p className="text-lg text-slate-600 dark:text-slate-400">
								Everything you need to build and scale
							</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
							{/* Documentation Card */}
							<Link
								href="/docs/v1"
								className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1"
							>
								<div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative">
									<div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
										<BookOpen className="w-7 h-7" />
									</div>
									<h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
										Documentation
									</h3>
									<p className="text-slate-600 dark:text-slate-400 mb-4">
										Explore our API reference, SDKs, and integration guides to start building with Lenco.
									</p>
									<span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
										Get started
										<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
									</span>
								</div>
							</Link>

							{/* Blog Card */}
							<Link
								href="/blog"
								className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:shadow-xl hover:border-green-500 dark:hover:border-green-500 hover:-translate-y-1"
							>
								<div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative">
									<div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
										<Newspaper className="w-7 h-7" />
									</div>
									<h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
										Blog
									</h3>
									<p className="text-slate-600 dark:text-slate-400 mb-4">
										Stay updated with product announcements, engineering insights, and company news.
									</p>
									<span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium group-hover:gap-2 transition-all">
										Read articles
										<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
									</span>
								</div>
							</Link>
						</div>
					</div>
				</section>
			</main>
			<LencoFooter />
		</>
	);
}
