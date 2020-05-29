const proxy = require('http-proxy-middleware');
const http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: true });
module.exports = function(app) {
  app.use(
    proxy( "/api",{     
      target: 'http://localhost:8000/',
      changeOrigin: true,
      // agent: keepAliveAgent,
      pathRewrite: {
        '^/api/': '/', // remove base path
      },
    })
  );
};
