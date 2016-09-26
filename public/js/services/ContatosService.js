angular.module('contatooh').factory('Contatos',
    function($resource) {
        return $resource('/contatos');
    });
