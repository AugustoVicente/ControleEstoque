var mysql = require('mysql');
var connection = mysql.createConnection
({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'estoque_jeboni'
});
connection.connect(function(err) 
{
    if(err)
    {
        alert("Erro: Banco não encontrado!");
    }
});
function cadastra()
{
    var dados = [];
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("cpf_cnpj").value);
    dados.push(document.getElementById("telefone").value);
    dados.push(document.getElementById("contato").value);
    dados.push(document.getElementById("email").value);
    dados.push(document.getElementById("wpp").value);
    dados.push(document.getElementById("end").value);
    var query = "INSERT INTO cliente (nome, cpfcnpj, telefone, contato, email, wpp, endereco) VALUES"
    +"('"+dados[0]+"','"+dados[1]+"','"+dados[2]+"','"+dados[3]+"', '"+dados[4]+"', '"+dados[5]+"', '"+dados[6]+"');";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'clientes.html';
            alert("Cadastrado!");
        }
    });
}
function lista()
{
    var query = 'SELECT nome, idcliente as id, cpfcnpj FROM cliente';
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            var select = document.getElementById("lista");
            rows.forEach(cliente => 
            {
                var option = document.createElement("option");
                option.text = cliente.id+" - "+cliente.nome+" ("+cliente.cpfcnpj+")";
                option.value = cliente.id;
                select.appendChild(option);
            });
            faz_filtro_cliente();
        }
    });
}
function carrega_dados()
{
    var id = sessionStorage.getItem('id');
    var query = 'SELECT * FROM cliente';
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            rows.forEach(cliente => 
            {
                document.getElementById("nome").value = cliente.nome;
                document.getElementById("cpf_cnpj").value = cliente.cpfcnpj;
                document.getElementById("telefone").value = cliente.telefone;
                document.getElementById("contato").value = cliente.contato;
                document.getElementById("email").value = cliente.email;
                document.getElementById("wpp").value = cliente.wpp;
                document.getElementById("end").value = cliente.endereco;
            });
        }
    });
}
function edita()
{
    var id = sessionStorage.getItem('id');
    var dados = [];
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("cpf_cnpj").value);
    dados.push(document.getElementById("telefone").value);
    dados.push(document.getElementById("contato").value);
    dados.push(document.getElementById("email").value);
    dados.push(document.getElementById("wpp").value);
    dados.push(document.getElementById("end").value);
    var query = "update cliente set nome = '"+dados[0]+"', cpfcnpj = '"+dados[1]+"', telefone = '"+dados[2]+"', contato = '"+dados[3]
    +"', email = '"+dados[4]+"', wpp = '"+dados[5]+"', endereco = '"+dados[6]+"' where idcliente = "+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'clientes.html';
            alert("Editado!");
        }
    });
}
function excluir()
{
    var id = sessionStorage.getItem('id');
    var query = "delete from cliente where idcliente = "+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            alert("Excluido!");
            document.location.href = 'clientes.html';
        }
    });
}
function muda_pagina()
{
    if(document.getElementById("lista").value != 0)
    {
        sessionStorage.setItem('id', document.getElementById("lista").value);
        document.location.href = 'altera_cliente.html';
    }
    else
    {
        alert("Selecione algum item!");
    }
}
window.onload = function() 
{
    lista();
    jq();
};
function jq()
{
    window.$ = window.jQuery = require('jquery');
    jQuery.fn.filterByText = function(textbox) 
    {
        return this.each(function() 
        {
            var select = this;
            var options = [];
            $(select).find('option').each(function() 
            {
                options.push({value: $(this).val(), text: $(this).text()});
            });
            $(select).data('options', options);
            $(textbox).bind('change keyup', function() 
            {
                var options = $(select).empty().scrollTop(0).data('options');
                var search = $(this).val().trim();
                var regex = new RegExp(search,"gi");
                $.each(options, function(i) 
                {
                    var option = options[i];
                    if(option.text.match(regex) !== null) 
                    {
                        $(select).append(
                        $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
            });            
        });
    };   
}
function faz_filtro_cliente()
{
    // You could use it like this:
    $(function() 
    {
        $('#lista').filterByText($('#filtro_clientes'));
    }); 
}