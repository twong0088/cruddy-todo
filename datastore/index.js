const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(path.join(exports.dataDir, id + '.txt'), text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, items) => {
    if (err) {
      callback(err);
    } else {
      let data = items.map( items => {
        return {id: items.slice(0, 5), text: items.slice(0, 5)};
      });
      callback(null, data);
    }
  });
};

// var data = _.map(items, (text, id) => {
//   return { id, text };
// });
// callback(null, data);

exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, id + '.txt'), 'utf8', (err, text) => {
    if (err) {
      callback(err);
    } else {
      callback(null, { id, text });
    }
  });
};

// var text = items[id];
// if (!text) {
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   callback(null, { id, text });
// }

exports.update = (id, text, callback) => {
  fs.readFile(path.join(exports.dataDir, id + '.txt'), (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(path.join(exports.dataDir, id + '.txt'), text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

// var item = items[id];
// if (!item) {
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   items[id] = text;
//   callback(null, { id, text });
// }

exports.delete = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, id + '.txt'), (err) => {
    if (err) {
      callback(err);
    } else {
      fs.unlink(path.join(exports.dataDir, id + '.txt'), (err) => {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  });
};

// var item = items[id];
// delete items[id];
// if (!item) {
//   // report an error if item not found
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   callback();
// }
// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
