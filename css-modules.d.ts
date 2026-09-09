// Ambient declaration for plain CSS side-effect imports (e.g.
// `import "./globals.css"`). Next.js handles these at build time; this only
// satisfies TypeScript's side-effect import resolution check.
declare module "*.css";
