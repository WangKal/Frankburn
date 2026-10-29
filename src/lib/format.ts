export const formatKsh = (value: number) => `KSh ${value.toLocaleString("en-KE")}`;

export const formatKshShort = (value: number) => {
  if (value >= 1_000_000_000) return `KSh ${trim(value / 1_000_000_000)}B`;
  if (value >= 1_000_000) return `KSh ${trim(value / 1_000_000)}M`;
  if (value >= 1_000) return `KSh ${trim(value / 1_000)}K`;
  return `KSh ${value}`;
};

const trim = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(1).replace(/\.0$/, ""));
