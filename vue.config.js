module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api':{
                 target:'http://api.zhubaba.cn',
                // target:'http://106.12.216.123:8202',
                // target:'http://106.12.216.123:8203',
                target:'http://localhost:8202',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}