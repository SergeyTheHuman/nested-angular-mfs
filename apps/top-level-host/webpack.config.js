const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const mf = require('@angular-architects/module-federation/webpack')
const path = require('path')
const shareAll = mf.shareAll
const sharedGlobalServicesConfig = require('../../helpers/shared-global-services.config')
const webpack = require('webpack')
const tsConfigPath = path.join(__dirname, '../../tsconfig.base.json')
const workspaceRootPath = path.join(__dirname, '../../')
const sharedMappings = new mf.SharedMappings()

sharedMappings.register(
    tsConfigPath,
    [
        /* mapped paths to share */
        ...sharedGlobalServicesConfig,
    ],
    workspaceRootPath,
)

module.exports = {
    output: {
        uniqueName: 'topLevelHost',
        publicPath: 'auto',
    },
    optimization: {
        runtimeChunk: false,
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            ngDevMode: false,
        }),
        new ModuleFederationPlugin({
            library: { type: 'module' },

            remotes: {},

            shared: {
                ...shareAll({
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                }),

                ...sharedMappings.getDescriptors(),
            },
        }),
        sharedMappings.getPlugin(),
    ],
}
