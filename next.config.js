module.exports = (phase, { defaultConfig }) => {
  return {
    trailingSlash: process.env.TRAILING_SLASH === '1',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `https://scarif.stg.rebellion.sh/api/:path*`,
        },
        {
          source: '/static_json/:path*',
          destination: `https://мирпутешествий.рф/static_json/:path*`,
        },
      ]
    },
  }
}
