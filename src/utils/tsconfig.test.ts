import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// astro check が Python venv などの大量の JS を解析して OOM になる回帰を防ぐ。
// tsconfig.json の exclude からこれらが外れていないことを検証する。
const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, "../../tsconfig.json"), "utf8"),
) as { exclude: string[] };

describe("tsconfig.json exclude", () => {
  it.each(["dist", "node_modules", "myvenv", "newtonx_adk"])(
    "%s を除外している",
    (dir) => {
      expect(tsconfig.exclude).toContain(dir);
    },
  );
});
