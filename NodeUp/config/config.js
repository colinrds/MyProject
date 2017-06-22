var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodeservice'
    },
    port: process.env.PORT || 7777,
    db: 'mongodb://localhost/nodeservice-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodeservice'
    },
    port: process.env.PORT || 7777,
    db: 'mongodb://localhost/nodeservice-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodeservice'
    },
    port: process.env.PORT || 7777,
    db: 'mongodb://localhost/nodeservice-production'
  }
};

module.exports = config[env];
