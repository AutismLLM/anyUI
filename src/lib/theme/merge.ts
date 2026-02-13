import type { DesignTokens, TenantConfigInput, TenantConfig, DeepPartial } from '../types/theme.js';
import { defaultTokens } from './tokens.js';

/** Deep merge source into target, source wins */
export function deepMerge<T extends Record<string, unknown>>(
	target: T,
	source: DeepPartial<T>,
): T {
	const output = { ...target };
	for (const key in source) {
		const sourceVal = source[key];
		if (
			sourceVal !== undefined &&
			typeof sourceVal === 'object' &&
			!Array.isArray(sourceVal) &&
			sourceVal !== null
		) {
			output[key] = deepMerge(
				(target[key] ?? {}) as Record<string, unknown>,
				sourceVal as Record<string, unknown>,
			) as T[typeof key];
		} else if (sourceVal !== undefined) {
			output[key] = sourceVal as T[typeof key];
		}
	}
	return output;
}

/** Resolve a partial tenant input into a full TenantConfig */
export function resolveTenantConfig(input: TenantConfigInput): TenantConfig {
	return {
		id: input.id,
		name: input.name ?? input.id,
		tokens: deepMerge(defaultTokens, input.tokens ?? {}),
	};
}
