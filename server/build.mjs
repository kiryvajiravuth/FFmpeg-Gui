import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [join(root, "src/index.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node18",
  outfile: join(root, "dist/index.cjs"),
  logLevel: "info",
});
