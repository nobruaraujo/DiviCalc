// Máscara de dinheiro
$('.dinheiro').mask('#.##0,00', { reverse: true });


// Scroll Suave
$('nav a, .nav-brand').click(function (link) {
    link.preventDefault();
    var id = $(this).attr('href'),
        menuHeight = $('nav').innerHeight(),
        targetOffset = $(id).offset().top;
    $('html, body').animate({
        scrollTop: targetOffset - menuHeight
    }, 1000);
});



// Leia Mais
function leiaMais() {
    var maisTexto = document.querySelector(".mais");
    var maisImg = document.querySelector(".mais-img");
    var btn = document.getElementById("btn-leiaMais");
    if (maisTexto.style.display === "none") {
        maisTexto.style.display = "inline";
        btn.innerHTML = "Leia Menos";
        maisImg.style.display = "inline";
    } else {
        maisTexto.style.display = "none";
        btn.innerHTML = "Leia Mais";
        maisImg.style.display = "none";
    }
};


$(document).ready(function () {
    $('#table_id_empresa').DataTable();
});

$(document).ready(function () {
    $('#table_id_resultado').DataTable();
});



document.getElementById('btn-simulacao').addEventListener('click', function (event) {

    console.log(document.getElementById('acaotxt').value)
    console.log(document.getElementById('apotxt').value)
    // 1 - DECLARAÇÃO DAS VARIÁVEIS HTML/JS



    var exampleFormControlSelect1 = document.getElementById('exampleFormControlSelect1').value
    var acaotxt = document.getElementById('acaotxt').value
    var qntxt = document.getElementById('qntxt').value
    var anostxt = document.getElementById('anostxt').value
    var s = document.getElementById('s')
    var n = document.getElementById('n')
    var apotxt = document.getElementById('apotxt').value
    var data = new Date();
    var anoRedux = data.getFullYear();
    // FIM DECLARAÇÃO DE VARIÁVEIS

    // TRATAMENTO DA MÁSCARA
    apotxt = apotxt.replace(",", ".");
    acaotxt.type = "number"
    apotxt.type = "number"

    // parseFloat(acaotxt)
    // parseFloat(apotxt)


    //VALIDAÇÃO DOS CAMPOS
    if (acaotxt == "" || qntxt == "" || anostxt == "") {
        swal("Campos vazios", "Favor preencher todos os campos obrigatórios", "info");
        return;
    }
    if (acaotxt < 0 || qntxt < 0 || anostxt < 0 || apotxt < 0) {
        swal("Campos incorretos", "Favor verifique os campos novamente", "info");
        return;
    }

    //REMOVENDO TODO O CONTEÚDO DA TBODY
    document.getElementById('tbody-table-resultado').remove()
    document.getElementById('tbody-table-empresa').remove()


    // 2- VALIDAÇÃO DOS CAMPOS
    console.log("Ação escolhida: ", exampleFormControlSelect1)
    console.log("Valor da ação: ", acaotxt)
    console.log("Quantas ações: ", qntxt)
    console.log("Anos investidos: ", anostxt)
    console.log("Aportes mensais: ", apotxt)

    if (s.checked) {
        console.log("Reinvestir os dividendos? Sim")
    } else {
        console.log("Reinvestir os dividendos? Não")
    }
    // FIM VALIDAÇÃO DOS CAMPOS


    // 3- CÁLCULOS
    var dividendYeld = 0;
    var rendaAnual = 0;
    var rendaMensal = 0;
    var array = [];
    var ano = anoRedux;
    var patrimonio = (parseFloat(acaotxt) * parseFloat(qntxt))
    //var qtdeAcoes = 0;
    var acoesCompra = 0;
    console.log("Patrimônio: R$" + patrimonio)


    // VERIFICANDO VALOR DO SELECT / AÇÃO
    var trrEmpresa = document.createElement('TR')
    var tdd1Empresa = document.createElement('TD')
    var tdd2Empresa = document.createElement('TD')
    var showEmpresa = ""

    if (exampleFormControlSelect1 == "ITUB4") {
        dividendYeld = 2.0112
        acaotxt = 26.97
        showEmpresa = "ITAU UNIBANCO"
    } else if (exampleFormControlSelect1 == "BBAS3") {
        dividendYeld = 1.8406
        acaotxt = 34.00
        showEmpresa = "BANCO DO BRASIL"
    } else if (exampleFormControlSelect1 == "ELET6") {
        dividendYeld = 1.4713
        acaotxt = 37.80
        showEmpresa = "ELETROBRAS"
    } else if (exampleFormControlSelect1 == "ABEV3") {
        dividendYeld = 0.4906
        acaotxt = 14.71
        showEmpresa = "AMBEV"
    }
    var tdd1EmpresaText = document.createTextNode(showEmpresa)
    var tdd2EmpresaText = document.createTextNode(dividendYeld)

    tdd1Empresa.appendChild(tdd1EmpresaText)
    tdd2Empresa.appendChild(tdd2EmpresaText)

    trrEmpresa.appendChild(tdd1Empresa)
    trrEmpresa.appendChild(tdd2Empresa)


    //dividendYeld = 0.96
    console.log("Dividend Yeld: ", dividendYeld)
    console.log("======================================")
    // FIM VERIFICAÇÃO SELECT



    // CÁLCULO 1 - REINVESTIR DIVIDENDOS: N | APORTES MENSAIS: N
    if (n.checked && apotxt == "") {
        //alert("REINVESTIR DIVIDENDOS: N | APORTES MENSAIS: N")

        for (i = 0; i < anostxt; i++) {

            rendaAnual = (dividendYeld * qntxt)
            rendaMensal = ((dividendYeld * qntxt) / 12)
            patrimonio = (qntxt * acaotxt)

            array.push({
                ano: ano++,
                rendaAnual: rendaAnual,
                rendaMensal: rendaMensal,
                patrimonio: patrimonio
            })
        }

    } else {
        for (i = 0; i < anostxt; i++) {
            qntxt = parseInt(qntxt) + parseInt(acoesCompra)
            rendaAnual = parseFloat((dividendYeld * qntxt).toFixed(2))
            rendaMensal = parseFloat(((dividendYeld * qntxt) / 12).toFixed(2))

            // CÁLCULO 2 - REINVESTIR DIVIDENDOS: S | APORTES MENSAIS: N
            if (s.checked && apotxt == "") {
                acoesCompra = parseInt(rendaAnual / acaotxt) //RENDA ANUAL / VALOR DA AÇÃO = QUANTIDADE DE AÇÕES PARA REINVESTIR
            }// CÁLCULO 3 - REINVESTIR DIVIDENDOS: N | APORTES MENSAIS: S
            else if (n.checked && apotxt != "") {
                acoesCompra = parseInt((apotxt * 12) / acaotxt) //RENDA ANUAL / VALOR DA AÇÃO = QUANTIDADE DE AÇÕES PARA REINVESTIR
            }// CÁLCULO 4 - REINVESTIR DIVIDENDOS: S | APORTES MENSAIS: S 
            else if (s.checked && apotxt != "") {
                acoesCompra = parseInt((rendaAnual + (apotxt * 12)) / acaotxt) //RENDA ANUAL / VALOR DA AÇÃO = QUANTIDADE DE AÇÕES PARA REINVESTIR
            }
            patrimonio = parseFloat((qntxt * acaotxt).toFixed(2))

            array.push({
                ano: ano++,
                rendaAnual: rendaAnual,
                rendaMensal: rendaMensal,
                patrimonio: patrimonio,
                acoesCompra: acoesCompra
            })
        }
    }


    console.log(array)


    // 4- ADICIONAR NA TABLE

    // CRIANDO UMA TBODY, DANDO UM ID E COLOCANDO DENTRO DA TABLE table_id_empresa e table_id_resultado
    var tbodyTableResultado = document.createElement('TBODY') //CRIA UM TBODY
    tbodyTableResultado.id = 'tbody-table-resultado' // ADICIONA UM ID
    document.getElementById('table_id_resultado').appendChild(tbodyTableResultado) // COLOCA O TBODY DENTRO DA TABLE

    var tbodyTableEmpresa = document.createElement('TBODY') //CRIA UM TBODY
    tbodyTableEmpresa.id = 'tbody-table-empresa' // ADICIONA UM ID
    document.getElementById('table_id_empresa').appendChild(tbodyTableEmpresa) // COLOCA O TBODY DENTRO DA TABLE

    var trrResultado = document.createElement('TR') // CRIANDO UMA TR


    for (var i = 0; i < array.length; i++) {

        // 1- CRIANDO O ELEMENTO TD
        var tdd1 = document.createElement('TD')
        var tdd2 = document.createElement('TD')
        var tdd3 = document.createElement('TD')
        var tdd4 = document.createElement('TD')

        // 2- ATRIBUINDO VALOR
        var text1 = document.createTextNode(array[i].ano)
        var text2 = document.createTextNode(array[i].rendaAnual)
        var text3 = document.createTextNode(array[i].rendaMensal)
        var text4 = document.createTextNode(array[i].patrimonio)

        // 3- CRIANDO UMA TR
        var trrResultado = document.createElement('TR')

        // 4- LINKANDO O TEXTO DENTRO DA TD
        tdd1.appendChild(text1) // COLOCANDO VALOR DENTRO DA TD
        trrResultado.appendChild(tdd1) // COLOCANDO TD DENTRO DA TR

        tdd2.appendChild(text2)
        trrResultado.appendChild(tdd2)

        tdd3.appendChild(text3)
        trrResultado.appendChild(tdd3)

        tdd4.appendChild(text4)
        trrResultado.appendChild(tdd4)


        // 5- COLOCANDO A TR DENTRO DA TBODY
        document.getElementById('tbody-table-empresa').appendChild(trrEmpresa)
        document.getElementById('tbody-table-resultado').appendChild(trrResultado)


        // Tratamento de dados | omitindo inputs não usados da DataTable
        document.getElementById('table_id_empresa_length').style.display = "none"
        document.getElementById('table_id_empresa_filter').style.display = "none"
        document.getElementById('table_id_empresa_info').style.display = "none"
        document.getElementById('table_id_empresa_paginate').style.display = "none"

        document.getElementById('table_id_resultado_length').style.display = "none"
        document.getElementById('table_id_resultado_filter').style.display = "none"
        document.getElementById('table_id_resultado_info').style.display = "none"
        document.getElementById('table_id_resultado_paginate').style.display = "none"

        document.getElementById('tbody-table-resultado').style = "text-align: right"

        // TRATAMENTO DA MÁSCARA
        acaotxt.type = "text"
        apotxt.type = "text"

        // Fim de Tratamento de dados

        document.getElementById('empresa').style.display = "block"
        document.getElementById('resultado').style.display = "block"
    }
})