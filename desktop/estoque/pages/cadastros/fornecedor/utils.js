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
window.onload = function() 
{
    lista();
    jq();
};
function muda_pagina()
{
    if(document.getElementById("lista").value != 0)
    {
        sessionStorage.setItem('id', document.getElementById("lista").value);
        document.location.href = 'altera_fornecedor.html';
    }
    else
    {
        alert("Selecione algum item!");
    }
}
function cadastra()
{
    var dados = [];
    dados.push(document.getElementById("razao").value);
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("end").value);
    dados.push(document.getElementById("cep").value);
    dados.push(document.getElementById("estado").value);
    dados.push(document.getElementById("cidade").value);
    dados.push(document.getElementById("email").value);
    dados.push(document.getElementById("contato").value);
    dados.push(document.getElementById("wpp").value);
    dados.push(document.getElementById("cpf_cnpj").value);
    dados.push(document.getElementById("telefone").value);
    var query = "INSERT INTO fornecedor(razao_social, nome_fantasia, endereco, cep, estado, cidade, email, contato, wpp, cpfcnpj, telefone)"
    +" VALUES ('"+dados[0]+"','"+dados[1]+"','"+dados[2]+"','"+dados[3]+"','"+dados[4]+"', '"+dados[5]+"', '"+dados[6]+"', '"+dados[7]+"', '"+dados[8]+
    "','"+dados[9]+"','"+dados[10]+"');";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'fornecedores.html';
            alert("Cadastrado!");
        }
    });
}
function lista()
{
    var query = "SELECT nome_fantasia, idfornecedor as id, cpfcnpj FROM fornecedor";
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
            rows.forEach(fornecedor => 
            {
                var option = document.createElement("option");
                option.text = fornecedor.id+" - "+fornecedor.nome_fantasia+" ("+fornecedor.cpfcnpj+")";
                option.value = fornecedor.id;
                select.appendChild(option);
            });
            faz_filtro_fornecedor();
        }
    });
}
function carrega_dados()
{
    var id = sessionStorage.getItem('id');
    var query = "SELECT * FROM fornecedor where idfornecedor = "+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            rows.forEach(fornecedor => 
            {
                document.getElementById("razao").value = fornecedor.razao_social;
                document.getElementById("nome").value = fornecedor.nome_fantasia;
                document.getElementById("end").value = fornecedor.endereco;
                document.getElementById("cep").value = fornecedor.cep;
                document.getElementById("estado").value = fornecedor.estado;
                document.getElementById("cidade").value = fornecedor.cidade;
                document.getElementById("email").value = fornecedor.email;
                document.getElementById("contato").value = fornecedor.contato;
                document.getElementById("wpp").value = fornecedor.wpp;
                document.getElementById("cpf_cnpj").value = fornecedor.cpfcnpj;
                document.getElementById("telefone").value = fornecedor.telefone;
            });
        }
    });

}
function edita()
{
    var id = sessionStorage.getItem('id');
    var dados = [];
    dados.push(document.getElementById("razao").value);
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("end").value);
    dados.push(document.getElementById("cep").value);
    dados.push(document.getElementById("estado").value);
    dados.push(document.getElementById("cidade").value);
    dados.push(document.getElementById("email").value);
    dados.push(document.getElementById("contato").value);
    dados.push(document.getElementById("wpp").value);
    dados.push(document.getElementById("cpf_cnpj").value);
    dados.push(document.getElementById("telefone").value);
    var query = "UPDATE fornecedor SET razao_social ='"+dados[0]+"', nome_fantasia ='"+dados[1]+
    "', endereco ='"+dados[2]+"', cep ='"+dados[3]+"', estado ='"+dados[4]+"', cidade ='"+dados[5]+"', email ='"+dados[6]+"', contato ='"+dados[7]+
    "', wpp ='"+dados[8]+"', cpfcnpj ='"+dados[9]+"', telefone ='"+dados[10]+"' WHERE idfornecedor ="+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'fornecedores.html';
            alert("Editado!");
        }
    });
}
function excluir()
{
    var id = sessionStorage.getItem('id');
    var query = "delete from fornecedor where idfornecedor = "+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'fornecedores.html';
            alert("Excluido!");
        }
    });
}
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
function faz_filtro_fornecedor()
{
    // You could use it like this:
    $(function() 
    {
        $('#lista').filterByText($('#filtro_fornecedores'));
    }); 
}