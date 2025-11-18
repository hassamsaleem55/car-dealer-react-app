/* ===== JSON imports (typed as DealerConfig) ===== */
declare module "@dealers-dir/*.json" {
  const value: import("./dealer-props").DealerConfig;
  export default value;
}

declare module "@dealers-dir/*/*.json" {
  const value: import("./dealer-props").DealerConfig;
  export default value;
}

/* ===== Image imports (typed as string paths) ===== */
declare module "@dealers-dir/*.(png|jpg|jpeg|svg|webp)" {
  const src: string;
  export default src;
}

declare module "@dealers-dir/*/*.(png|jpg|jpeg|svg|webp)" {
  const src: string;
  export default src;
}
