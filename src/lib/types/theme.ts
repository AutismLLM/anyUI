/** RGB triplet as three numbers (0-255) */
export type RGBTuple = [number, number, number];

/** All glassmorphism parameters a tenant can override */
export interface GlassConfig {
	enabled: boolean;
	blur: number;
	bgOpacity: number;
	borderOpacity: number;
	tint: RGBTuple;
	shadow: string;
	insetShadow: string;
	edgeOpacity: number;
	radius: number;
}

/** Color scale */
export interface ColorScale {
	50?: string;
	100?: string;
	200?: string;
	300?: string;
	400?: string;
	500: string;
	600?: string;
	700?: string;
	800?: string;
	900?: string;
	950?: string;
	DEFAULT: string;
}

/** Core design tokens */
export interface DesignTokens {
	colors: {
		primary: ColorScale;
		secondary: ColorScale;
		accent: ColorScale;
		surface: ColorScale;
		background: string;
		foreground: string;
		muted: string;
		border: string;
	};
	glass: GlassConfig;
	typography: {
		fontFamily: {
			sans: string;
			mono: string;
		};
		/** Google Fonts or other external font URLs to load */
		fontUrls: string[];
		fontSize: {
			xs: string;
			sm: string;
			base: string;
			lg: string;
			xl: string;
			'2xl': string;
			'3xl': string;
		};
	};
	spacing: {
		unit: number;
	};
	borderRadius: {
		sm: string;
		md: string;
		lg: string;
		xl: string;
		full: string;
	};
	shadows: {
		sm: string;
		md: string;
		lg: string;
		xl: string;
	};
}

/** Full resolved tenant config */
export interface TenantConfig {
	id: string;
	name: string;
	tokens: DesignTokens;
}

/** What users pass — everything optional except id */
export type TenantConfigInput = {
	id: string;
	name?: string;
	tokens?: DeepPartial<DesignTokens>;
};

/** Recursive Partial */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
