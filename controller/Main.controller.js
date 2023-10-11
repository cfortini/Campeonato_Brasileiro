sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
                /*                 let dadosGerais ={
                                    nomeCampeonato : "Brasileirão 2023 Aqui é Galo!",
                                    Rodada :99
                                }
                
                                let dadosModel = new JSONModel() 
                
                                dadosModel.setData(dadosGerais)
                
                                let tela = this.getView()
                
                                tela.setModel(dadosModel, "modeloDadosGerais") */

                // Novos Objetos
                let dadosGerais = {}
                let classificacao = {}
                let partidas = {}

                // 3 Modelos novos

                let dadosModel = new JSONModel()
                let classificacaoModel = new JSONModel()
                let partidasModel = new JSONModel()

                //Colocar dados dentro dos objetos
                dadosModel.setData(dadosGerais)
                classificacaoModel.setData(classificacao)
                partidasModel.setData(partidas)

                let tela = this.getView()
                tela.setModel(dadosModel, "modeloDadosGerais")
                tela.setModel(classificacaoModel, "modeloTabela")
                tela.setModel(partidasModel, "modeloPartidas")

                this.onBuscarClassificacao()
                this.onBuscarDadosGerais()


            },
            onBuscarClassificacao: function () {
                let oModeloTabela = this.getView().getModel("modeloTabela")

                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_68600f6118f8ecd8d906d5086422c6"
                    }
                };

                //API com Ajax
                $.ajax(configuracoes).done(
                    function (response) {

                        //Mudar os dados do model
                        oModeloTabela.setData(
                            {
                                "Classificacao": response
                            }
                        )
                    }.bind(this)
                )

            },
            onBuscarDadosGerais: function () {
                let oModeloDadosGerais = this.getView().getModel("modeloDadosGerais")

                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_68600f6118f8ecd8d906d5086422c6"
                    }
                };

                //API com Ajax
                $.ajax(configuracoes).done(
                    function (response) {

                        //Mudar os dados do model
                        oModeloDadosGerais.setData(response)
                        let rodadaAtual = response.rodada_atual.rodada
                        this.onBuscarPartidas(rodadaAtual)
                    }.bind(this)
                )

            },
            onBuscarPartidas: function (rodadaAtual) {
                debugger
                let oModeloPartidas = this.getView().getModel("modeloPartidas")

                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_68600f6118f8ecd8d906d5086422c6"
                    }
                };
                debugger
                //API com Ajax
                $.ajax(configuracoes).done(
                    function (response) {
                        debugger
                        //Mudar os dados do model
                        oModeloPartidas.setData(response)
                    }.bind(this)
                )

            }                         
        });
    });
