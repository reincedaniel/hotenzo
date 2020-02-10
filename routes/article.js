"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List Article/service
  app.get('/api/articles', _verifyToken["default"], function (req, res) {
    _models["default"].Article.findAll({
      include: [{
        model: _models["default"].Category
      }, {
        model: _models["default"].User
      }]
    }).then(function (articles) {
      res.json({
        articles: articles
      });
    });
  }), // REGISTER Article V
  app.post('/api/articles', function (req, res) {
    // Params
    var Article = req.body; // Verify if exist into models.articles

    /*         models.Article.findOne({
                attributes: ["internal_code"],
                where: { key: Article.internal_code }
            })
                .then((ArticleFound) => {
                    if (!ArticleFound) { */

    /* (articles) => {
            return res.json({ articles, 'code': 1 })
        } */

    _models["default"].Article.create(Article).then(function (articles) {
      return articles.update({
        internal_code: 'UCL' + articles.id
      }).then(function (d) {
        return res.json({
          articles: articles,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot add Article, error internal code',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot add Article',
        'code': 0
      });
    });
    /*                 } else {
                        return res.json({ 'error': 'Article already exist', 'code': 11 })
                    }
    
                })
                .catch((err) => {
                    return res.json({ 'error': 'Unable to verify Article', err, 'code': -1 })
                }) */

  }); // UPDATE Article

  app.put('/api/articles/:id', function (req, res) {
    // Params
    var Article = req.body; // Verify if exist into models.articles

    _models["default"].Article.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (ArticleFound2) {
      ArticleFound2.update(Article).then(function (articles) {
        return res.json({
          articles: articles,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update Article',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Article',
        err: err,
        'code': 0
      });
    });
  }); // Delete Article

  app["delete"]('/api/articles/:id', function (req, res) {
    // Params
    var Article = {
      id: req.params.id
    }; // Verify if exist into models.articles

    _models["default"].Article.findOne({
      attributes: ["id"],
      where: {
        id: Article.id
      }
    }).then(function (ArticleFound2) {
      ArticleFound2.destroy(Article).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete Article',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Article',
        err: err,
        'code': 0
      });
    });
  });
};