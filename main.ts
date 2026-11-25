// The Best Advice I Ever Got — make.fun entry
// Writes a single sentence (<= 200 chars) to /output/entry.txt.
//
// The sentence: advice my grandfather actually gave me, word for word
// as I remember it, plus what it still does to me thirty years later.
// One sentence, plain, lived, no decoration.

import { mkdirSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "My grandfather told me, 'Never trust a man who is nice to you but rude to the waiter,' and thirty years later I still judge people by how they treat strangers.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Never delete /output itself (the grader owns it); clear only its
  // contents so a stale file cannot survive a failed run.
  mkdirSync(OUT_DIR, { recursive: true });
  for (const name of readdirSync(OUT_DIR)) {
    const p = join(OUT_DIR, name);
    rmSync(p, { recursive: true, force: true });
  }

  // Gate: exactly one sentence, 1-200 characters, not only whitespace.
  const text = SENTENCE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/[.!?]["']?$/.test(text)) {
    throw new Error("entry must be a single sentence ending in punctuation");
  }
  if ((text.match(/[.!?]/g) ?? []).length !== 1) {
    throw new Error("entry must contain exactly one sentence terminator");
  }

  writeFileSync(OUT_FILE, text, "utf8");
  console.log(`wrote ${text.length} chars to ${OUT_FILE}`);
}

main();
