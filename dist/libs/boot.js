"use strict";

module.exports = function (app) {
  app.listen(app.get('port'), function () {
    console.log('Server on PORT', app.get('port'));
  });
};