module.exports = {
    entry: {
        app: "./src/front-end/ts/index.ts",
        //polyfill: "./src/polyfill.ts",
        //vendor: "./src/vendor.ts"
    },
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".ts"]
    },
    // vendor: [
    //     '@angular/platform-browser',
    //     '@angular/platform-browser-dynamic',
    //     '@angular/core',
    //     '@angular/common',
    //     '@angular/forms',
    //     '@angular/http',
    //     '@angular/router',
    //     // '@angularclass/hmr',
    //     // 'rxjs',
    // ]
};
