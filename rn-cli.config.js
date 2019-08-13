const blacklist = require("metro").createBlacklist;
module.exports = {
  resolver: {
    blacklistRE: blacklist([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      /\~\//
    ])
  }
};
