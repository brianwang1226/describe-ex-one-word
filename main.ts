// Describe Your Ex in One Word — make.fun entry.
// Writes one single original word to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic, no network.
//
// The word: Timeshare. An ex as a timeshare: you bought in together,
// now you are stuck paying every year for something you never use
// and can never sell. One concrete thing, no caption needed.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `Timeshare`;

// Kit gate: /output/entry.txt must be UTF-8 text of 1-111 characters,
// not only white space. This competition adds: exactly one word, nothing
// else attached. Fail loudly instead of writing an entry the judge
// would reject.
const len = [...ENTRY].length;
const isSingleWord = /^\S+$/.test(ENTRY);
if (len < 1 || len > 111 || ENTRY.trim().length === 0 || !isSingleWord) {
  console.error(
    `Entry rejected by local gate: ${len} chars, single word: ${isSingleWord} (must be exactly one word, 1-111 chars, non-blank).`,
  );
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${join(outDir, "entry.txt")}`);
