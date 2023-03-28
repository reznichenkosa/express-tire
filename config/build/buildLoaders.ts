import { type BuildOptions } from './types/config'
import { type RuleSetRule } from 'webpack'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  const typescriptLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
    exclude: /node_modules/,
  }

  const cssLoader: RuleSetRule = buildCssLoader(isDev)

  const svgLoader = buildSvgLoader()
  const svgLoaderUrl: RuleSetRule = {
    test: /\.svg$/i,
    type: 'asset',
    resourceQuery: /url/, // *.svg?url
  }

  const fontLoader: RuleSetRule = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name].[ext]',
    },
  }

  const imgLoader: RuleSetRule = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: '[hash].[ext]',
    },
  }

  return [svgLoader, svgLoaderUrl, fontLoader, imgLoader, typescriptLoader, cssLoader]
}
