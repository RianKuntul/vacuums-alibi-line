import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Vacuum's Alibi — one line, at most 200 chars, in which a robot vacuum
// explains why it missed a spot. The kit grades the file content, so the
// line must stay under the 200-char limit.
const line = "I did not miss that spot. My lidar found a sock, a charging cable and a dust bunny with squatter's rights, so I filed it under 'not my jurisdiction'.";

// Hard guard: fail loudly instead of submitting an over-long line.
if (line.length > 200) {
  throw new Error(`Entry line is ${line.length} chars, over the 200-char limit.`);
}
if (line.length < 1) {
  throw new Error("Entry line must not be empty.");
}
if (line.includes("\n")) {
  throw new Error("Entry line must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
console.log("Wrote entry.txt, chars:", line.length);
