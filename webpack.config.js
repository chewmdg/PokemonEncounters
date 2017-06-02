

module.exports = {
    entry: './source/PokemonEncountersApp.js',
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: '/node-modules',
                query: {
                    presets: ['react', 'es2015', 'stage-0', require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'),],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']

                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]

            }
        ]
    },
    output: {
        filename: '../pokemonEncounters/pokemonEncountersMVC/pokemonEncountersMVC/Scripts/PokemonEncounters.bundle.js',
    }
}