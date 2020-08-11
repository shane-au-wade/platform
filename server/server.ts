// port value || this could be swapped out for env variable
const port = 4000

// next js imports 
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// original express app imports from bin/www
const http = require('http');
const debug = require('debug')('backend:server');

// express app imports
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('./socketIO')

// global base dir name setup for routes 
//global.__basedir = __dirname;

// express routes imports 
// const indexRouter = require('./routes/index');
// const ridesRouter = require('./routes/rides')
// const authRouter = require('./routes/auth')


nextApp.prepare().then(() => {
  const app = express()
  app.io = io
    
  /**
   * Express app setup
   */
  app.use(logger('dev'));
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({extended: true, limit: '50mb'}));
  app.use(cookieParser());

    // routes
    // app.use('/', indexRouter);
    // app.use('/rides', ridesRouter);
    // app.use('/auth', authRouter)

//   app.get('/a', (req, res) => {
//     return nextApp.render(req, res, '/a', req.query)
//   })

//   app.get('/b', (req, res) => {
//     return nextApp.render(req, res, '/b', req.query)
//   })

// next js catch-all router
  app.all('*', (req, res) => {
    return handle(req, res)
  })


  app.set('port', port);
    console.table({'listening on port': port})

    let server = http.createServer(app);
    app.io.attach(server)

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

//   app.listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })


    /**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }


 // end nextApp.prepare()
})

