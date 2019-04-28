var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    let urlData = data.toString();
    let urlArray = urlData.split('\n');
    // console.log(urlArray);
    callback(urlArray);
  });
  
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urlArray) => {
    let flag = false;
    urlArray.forEach(element => {
      if (url === element) {
        flag = !flag;
      }

    });
    callback(flag);
  });
  // exports.readListOfUrls( function(urlArray) {
  //   let flag = false;
  //   urlArray.forEach(function(element) {
  //     if (element === url ) {
  //       flag = !flag;
  //     }
  //   });
  //   callback(flag);
  // });
};

exports.addUrlToList = function(url, callback) {
  
  fs.writeFile(exports.paths.list, url, (err) => {
    if (err) { throw err; }
  });
  callback(url);
};

exports.isUrlArchived = function(url, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);
  //console.log(sitePath);

  //about fs.access : https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
  fs.access(sitePath, function (err) {
    callback(!err);
  });

  // fs.readdir(exports.paths.archivedSites, (err, files) => {
  //   let exists = false;
  //   if (err) { throw err; }
  //   files.forEach((file) => {
  //     console.log(file);
  //     console.log(url);
  //     if (url === file) {
  //       exists = !exists;
  //     }
  //   });
  // });
  // console.log(exists);
  // callback(exists);
};

exports.downloadUrls = function(urls) {
};
