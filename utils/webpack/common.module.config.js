const params = {
    rules: [
        {
            test: /pdf\.worker(\.min)?\.js$/,
            use: 'raw-loader',
        },
        {
            test: [/\.(js|jsx)$/],
            exclude: /(node_modules\/(?!@techincity\/ui-kit)|bower_components|pdf\.worker(\.min)?\.js$)/,
            loader: 'babel-loader',
            options: {
                presets: ['env'],
                plugins: ['transform-class-properties', 'transform-object-rest-spread']
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '/fonts/'
                }
            }]
        },
        {
            test: /\.(gif|png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: '/images/'
                }
            }]
        }
    ]
};

module.exports = params;
