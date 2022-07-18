module.exports = (phase, { defaultConfig }) => {
  return {
    trailingSlash: process.env.TRAILING_SLASH === "1",
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `https://мирпутешествий.рф/api/:path*`,
        },
      ];
    },
  };
};
