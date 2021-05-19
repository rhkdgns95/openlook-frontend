/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/",
  },
  plugins: [
    ["@snowpack/plugin-react-refresh"],
    ["@snowpack/plugin-babel"],
    ["@snowpack/plugin-dotenv"],
  ],
  // optimize: {
  //   bundle: true,
  //   minify: true,
  //   target: 'es2018',
  //   splitting: true,
  //   treeshake: true,
  //   entrypoints: 'auto',
  //   manifest: true,
  //   sourcemap: false
  // },
  packageOptions: {
    knownEntrypoints: ["react/jsx-runtime"],
  },
  devOptions: {
    port: 3000,
    open: "chrome",
    hmr: true,
  },
  routes: [{ src: ".*", dest: "index.html", match: "routes" }],
};
