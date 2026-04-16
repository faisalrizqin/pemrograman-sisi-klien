// ...
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		// ...
	],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});