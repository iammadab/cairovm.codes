/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    APP_ROOT: __dirname,
  },
  webpack: (config, options) => {
    const { dir, defaultLoaders } = options

    config.resolve.extensions.push('.ts', '.tsx')
    config.module.rules.push({
      test: /\.+(ts|tsx)$/,
      include: [dir],
      use: [
        defaultLoaders.babel,
        { loader: 'ts-loader', options: { transpileOnly: true } },
      ],
    })

    config.resolve.fallback = {
      fs: false,
      stream: false,
      crypto: false,
      path: false,
      process: require.resolve('process/browser'),
      assert: require.resolve('assert/'),
      events: require.resolve('events/'),
    }

    return config
  },
}
