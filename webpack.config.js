var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var defaultSettings = require('./cfg/defaults');
var publicPath = 'http://localhost:'+defaultSettings.port+'/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
 
var getEntry=function(){
	
	var entry={};
	glob.sync('./client/**/*.js').forEach(function (name) {
		var n = name.slice(name.lastIndexOf('client/') + 7, name.length - 3);
		n = n.slice(0, n.lastIndexOf('/'));
		//接着我对路径字符串进行了一些裁剪成想要的路径
		entry[n] = [name,hotMiddlewareScript];
 	});
 	return entry;
}
var devConfig = {
  entry: getEntry(),
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfig;