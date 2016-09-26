module.exports = function(app) {
    var controller = app.controllers.contato;
    var verificaAutenticacao = require('../../config/auth');
    app.route('/contatos')
        .get(verificaAutenticacao, controller.listaContatos)
        .post(verificaAutenticacao, controller.salvaContato);

    app.route('/contatos/:id')
        .get(verificaAutenticacao, controller.obtemContato)
        .delete(verificaAutenticacao, controller.removeContato);


};
