const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const mf = require('@angular-architects/module-federation/webpack')
const path = require('path')
const shareAll = mf.shareAll
const sharedGlobalServicesConfig = require('../../helpers/shared-global-services.config')
const tsConfigPath = path.join(__dirname, '../../tsconfig.base.json')
const workspaceRootPath = path.join(__dirname, '../../')
const sharedMappings = new mf.SharedMappings()

sharedMappings.register(
    tsConfigPath,
    [...sharedGlobalServicesConfig],
    workspaceRootPath,
)

module.exports = {
    output: {
        uniqueName: 'levelTwoMf2',
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
        new ModuleFederationPlugin({
            library: { type: 'module' },
            name: 'levelTwoMf2',
            filename: 'remoteEntry.js',
            exposes: {
                './AppComponent': './apps/level-two-mf-2/src/app.component.ts',
            },
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
