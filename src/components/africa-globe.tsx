'use client';

import { Globe } from '@/components/ui/globe';
import type { COBEOptions } from 'cobe';

// Africa-focused globe configuration
const AFRICA_GLOBE_CONFIG: COBEOptions = {
	width: 800,
	height: 800,
	onRender: () => {},
	devicePixelRatio: 2,
	phi: 0,
	theta: 0.1,
	dark: 0,
	diffuse: 0.4,
	mapSamples: 16000,
	mapBrightness: 1.2,
	baseColor: [0.9, 0.9, 0.9],
	markerColor: [0.2, 0.4, 0.9], // Lenco blue
	glowColor: [0.9, 0.9, 0.9],
	markers: [
		// Nigeria - Lagos, Abuja
		{ location: [6.5244, 3.3792], size: 0.12 }, // Lagos
		{ location: [9.0765, 7.3986], size: 0.08 }, // Abuja
		// Zambia - Lusaka
		{ location: [-15.3875, 28.3228], size: 0.1 }, // Lusaka
		// Other African cities
		{ location: [-1.2921, 36.8219], size: 0.06 }, // Nairobi
		{ location: [-33.9249, 18.4241], size: 0.06 }, // Cape Town
		{ location: [30.0444, 31.2357], size: 0.06 }, // Cairo
		{ location: [5.6037, -0.187], size: 0.05 }, // Accra
		{ location: [-6.7924, 39.2083], size: 0.05 }, // Dar es Salaam
	],
};

export function AfricaGlobe({ className }: { className?: string }) {
	return <Globe className={className} config={AFRICA_GLOBE_CONFIG} />;
}
