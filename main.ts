// Describe Your Ex in One Word — make.fun entry.
// Writes one single original word to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic, no network.
//
// The word: Timeshare. An ex as a timeshare: you bought in together,
// now you are stuck paying every year for something you never use
// and can never sell. One concrete thing, no caption needed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read back what was written: a partial or empty write must fail loudly
// instead of submitting a blank entry the judge would reject.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  console.error(
    `Entry mismatch after write: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(written)}.`,
  );
  process.exit(1);
}
console.log(`Wrote ${[...ENTRY].length} characters to ${outPath} (verified)`);
