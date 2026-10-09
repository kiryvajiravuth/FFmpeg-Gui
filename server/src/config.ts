function envNum(name: string, def: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return def;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : def;
}

function envStr(name: string, def: string): string {
  return process.env[name] ?? def;
}

export const config = {
  host: envStr("HOST", "127.0.0.1"),
  port: envNum("PORT", 8787),
} as const;
