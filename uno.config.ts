import { defineConfig, presetWind3 } from 'unocss';
import { presetAnyUI } from './src/lib/presets/preset-anyui.js';

export default defineConfig({
	presets: [presetWind3(), presetAnyUI()],
});
