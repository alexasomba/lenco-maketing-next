import Link from 'next/link';
import { BookOpen, Newspaper } from 'lucide-react';

export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8">
			<div className="max-w-4xl w-full">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
						Welcome to Lenco
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-400">
						Banking infrastructure for Africa
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Documentation Card */}
					<Link
						href="/docs/v1"
						className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative">
							<div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
								<BookOpen className="w-7 h-7" />
							</div>
							<h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
								Documentation
							</h2>
							<p className="text-slate-600 dark:text-slate-400 mb-4">
								Explore our API reference, SDKs, and integration guides to start building with Lenco.
							</p>
							<span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
								Get started
								<svg
									className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</Link>

					{/* Blog Card */}
					<Link
						href="/blog"
						className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:shadow-xl hover:border-green-500 dark:hover:border-green-500 hover:-translate-y-1"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative">
							<div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
								<Newspaper className="w-7 h-7" />
							</div>
							<h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
								Blog
							</h2>
							<p className="text-slate-600 dark:text-slate-400 mb-4">
								Stay updated with product announcements, engineering insights, and company news.
							</p>
							<span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium group-hover:gap-2 transition-all">
								Read articles
								<svg
									className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</Link>
				</div>

				<p className="text-center mt-12 text-sm text-slate-500 dark:text-slate-500">
					© {new Date().getFullYear()} Lenco. All rights reserved.
				</p>
			</div>
		</main>
	);
}
