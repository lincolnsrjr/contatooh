var sanitize = require('mongo-sanitize');

module.exports = function(app) {



    function verificaAutenticacao(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    }

    var Contato = app.models.contato;
    var controller = {};
    controller.listaContatos = function(req, res) {
        Contato.find().populate('emergencia').exec()
            .then(
                function(contatos) {
                    console.log(contatos);
                    res.json(contatos);
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );

    };
    controller.obtemContato = function(req, res) {
        var idContato = req.params.id;
        Contato.findById(idContato).exec()
            .then(function(contato) {
                    if (!contato) throw new Error("Contato não encontrado");
                    res.json(contato);
                },

                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };
    controller.removeContato = function(req, res) {

        var _id = sanitize(req.params.id);
        Contato.remove({
                "_id": _id
            }).exec()
            .then(
                function() {
                    res.end();
                },
                function(erro) {
                    return console.error(erro);
                }
            );
    };

    controller.salvaContato = function(req, res) {
        var _id = req.body._id;

        var dados = {
            "nome": req.body.nome,
            "email": req.body.email,
            "emergencia": req.body.emergencia || null
        };

        if (_id) {
            Contato.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function(contato) {
                        res.json(contato);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Contato.create(dados)
                .then(
                    function(contato) {
                        res.status(201).json(contato);
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );
        }

    };

    return controller;
};
