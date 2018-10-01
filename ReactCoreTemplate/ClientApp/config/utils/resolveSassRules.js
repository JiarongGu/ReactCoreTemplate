module.exports = function ({ test, include, exclude, extractPlugin, cssLoader, localIdentName }) {
    return ({
        test,
        include,
        exclude,
        use: extractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-hot-loader',
                {
                    loader: cssLoader,
                    query: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
                        sourceMap: true,
                        importLoaders: 1,
                        localIdentName: localIdentName,
                    }
                },
                'sass-loader'
            ]
        })
    });
}