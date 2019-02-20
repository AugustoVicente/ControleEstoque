var mysql = require('mysql');
var PDFDocument = require('pdfkit2');
var fs = require('fs');
window.$ = window.jQuery = require('jquery');
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
        document.location.href = 'altera_produtos.html';
    }
    else
    {
        alert("Selecione algum item!");
    }
}
function carrega_fornencedores()
{
    var query = "SELECT * FROM fornecedor";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            var div_forn = document.getElementById("fornecedores");
            rows.forEach(fornecedor => 
            {
                var div = document.createElement("div");
                div.className = "col-md-6";
                var input = document.createElement("input");
                input.type = "checkbox";
                input.id = fornecedor.idfornecedor;
                var label = document.createElement("label");
                label.innerHTML = "&nbsp"+fornecedor.nome_fantasia;
                var div_input = document.createElement("div");
                div_input.className = "col-md-6";
                var preco = document.createElement("input");
                preco.placeholder = "Preço do fornecedor";
                preco.id = "valor"+fornecedor.idfornecedor;
                preco.type = "number";
                div_input.appendChild(preco);
                div.appendChild(input);
                div.appendChild(label);
                div_forn.appendChild(div);
                div_forn.appendChild(div_input);
            });
        }
    }); 
}
function carrega_fornencedores_altera()
{
    var query = "SELECT * FROM fornecedor";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            var match;
            var query = "SELECT * FROM fornecedor_produto where id_produto = "+sessionStorage.getItem("produto");
            connection.query(query, function(err, rows2, fields)
            {
                if(err)
                {
                    alert(err);
                    return;
                }
                else
                {
                    match = rows2;
                    var div_forn = document.getElementById("fornecedores");
                    rows.forEach(fornecedor => 
                    {
                        var div = document.createElement("div");
                        div.className = "col-md-6";
                        var input = document.createElement("input");
                        input.type = "checkbox";
                        input.id = fornecedor.idfornecedor;
                        var label = document.createElement("label");
                        label.innerHTML = "&nbsp"+fornecedor.nome_fantasia;
                        var div_input = document.createElement("div");
                        div_input.className = "col-md-6";
                        var preco = document.createElement("input");
                        preco.placeholder = "Preço do fornecedor";
                        preco.id = "valor"+fornecedor.idfornecedor;
                        preco.type = "number";
                        match.forEach((row, index) => 
                        {
                            if(row.id_fornecedor == fornecedor.idfornecedor)
                            {
                                input.checked = "true";
                                preco.value = match[index].preco_custo;
                            }
                        });;
                        div_input.appendChild(preco);
                        div.appendChild(input);
                        div.appendChild(label);
                        div_forn.appendChild(div);
                        div_forn.appendChild(div_input);
                    });
                }
            });
        }
    }); 
}
function cadastra()
{
    var dados = [];
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("marca").value);
    dados.push(document.getElementById("qtd").value);
    dados.push(document.getElementById("qtd_min").value);
    dados.push(document.getElementById("unidade").value);
    dados.push(document.getElementById("preco_final").value);
    dados.push(document.getElementById("descricao").value);
    var query = "call insere_produto('"+dados[0]+"','"+dados[1]+"',"+dados[2]+","+dados[3]+",'"+dados[4]+"', "+dados[5]+", '"+dados[6]+"');";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            $("input:checkbox:checked").map(
                function()
                {
                    var preco = $("#valor"+$(this)[0].id)[0].value;
                    var query3 = "insert into fornecedor_produto (id_fornecedor, id_produto, preco_custo) values ("+$(this)[0].id+","+rows[0][0].id+","+preco+");";
                    connection.query(query3, function(err, rows, fields)
                    {
                        if(err)
                        {
                            alert(err);
                            return;
                        }
                    });
                    setTimeout(function()
                    {
                        document.location.href = 'produtos.html';
                        alert("Produto cadastrado!");
                    }, 2000);
                }
            );
        }
    });
}
function lista()
{
    var query = "SELECT idproduto, nome, marca FROM produto where status = 1;";
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
            rows.forEach(produto => 
            {
                var row = document.createElement("tr");
                row.className = "linha";
                var produto_linha = document.createElement("td");
                produto_linha.innerHTML = produto.nome+" ("+produto.marca+")";
                var cod_bar = document.createElement("td");
                cod_bar.innerHTML = "Impimir Código";
                cod_bar.className = "remove";
                cod_bar.onclick = function () 
                {
                    codigo(produto);
                };
                var entrada = document.createElement("td");
                entrada.innerHTML = "Entrada de produto";
                entrada.className = "remove";
                entrada.onclick = ()=> 
                {
                    pag_entrada(produto);
                };
                var editar = document.createElement("td");
                editar.innerHTML = "Editar";
                editar.className = "remove";
                editar.onclick = function () 
                {
                    pag_editar(produto);
                };
                var excluir = document.createElement("td");
                excluir.innerHTML = "Excluir";
                excluir.className = "remove";
                excluir.onclick = function () 
                {
                    excluir_prod(produto);
                };
                row.appendChild(produto_linha);
                row.appendChild(cod_bar);
                row.appendChild(entrada);
                row.appendChild(editar);
                row.appendChild(excluir);
                select.appendChild(row);
            });
        }
    });
}
function lista2()
{ 
    var match;
    var query = "SELECT * FROM fornecedor";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            var query = "SELECT * FROM fornecedor_produto where id_produto = "+sessionStorage.getItem("produto");
            connection.query(query, function(err, rows2, fields)
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
                        match = rows2;
                        match.forEach((row, index) => 
                        {
                            if(row.id_fornecedor == fornecedor.idfornecedor)
                            {
                                var select = document.getElementById("lista");
                                var option = document.createElement("option");
                                option.text = fornecedor.idfornecedor+" - "+fornecedor.nome_fantasia+" ("+fornecedor.cpfcnpj+")";
                                option.value = fornecedor.idfornecedor;
                                select.appendChild(option);
                            }
                        });
                    });
                }
            });
        }
    });
}
function carrega_dados()
{
    var id = sessionStorage.getItem("produto");
    var query = "SELECT * FROM produto where idproduto = "+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            rows.forEach(produto => 
            {
                document.getElementById("nome").value = produto.nome;
                document.getElementById("marca").value = produto.marca;
                document.getElementById("qtd_min").value = produto.qtd_minima;
                document.getElementById("unidade").value = produto.unidade;
                document.getElementById("preco_final").value = produto.preco_final;
                document.getElementById("descricao").value = produto.descricao;
            });
        }
    });
}
function edita()
{
    var id = sessionStorage.getItem("produto");
    var dados = [];
    dados.push(document.getElementById("nome").value);
    dados.push(document.getElementById("marca").value);
    dados.push(document.getElementById("qtd_min").value);
    dados.push(document.getElementById("unidade").value);
    dados.push(document.getElementById("preco_final").value);
    dados.push(document.getElementById("descricao").value);
    var query = "UPDATE produto SET nome = '"+dados[0]+"', marca = '"+dados[1]+
    "', qtd_minima = '"+dados[2]+"', unidade = '"+dados[3]+"', preco_final = '"+dados[4]+"', descricao = '"+dados[5]+"'"
    +"WHERE idproduto ="+id;
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            var query = "delete FROM fornecedor_produto where id_produto = "+id;
            connection.query(query, function(err, rows2, fields)
            {
                if(err)
                {
                    alert(err);
                    return;
                }
                else
                {
                    $("input:checkbox:checked").map(
                        function()
                        {
                            var forn = $(this);  
                            var preco = document.getElementById("valor"+forn[0].id).value;
                            if(preco > 0)
                            {
                                var query3 = "insert into fornecedor_produto (id_fornecedor, id_produto, preco_custo) values ("+forn[0].id+","+id+","+preco+");";
                                connection.query(query3, function(err, rows, fields)
                                {
                                    if(err)
                                    {
                                        alert(err);
                                        return;
                                    }
                                });
                            }
                            else
                            {
                                alert("Preencha o preço do fornecedor!")
                            }
                        }
                    );
                    setTimeout(function()
                    {
                        document.location.href = 'produtos.html';
                        alert("As alterações foram salvas!");
                    }, 2000);
                }
            });
        }
    });
}
function excluir_prod(produto)
{
    var ok = confirm("Realmente deja excluir o produto?");
    if(ok == true)
    {
        var id = produto.idproduto;
        var query = "call deleta_produto("+id+")";
        connection.query(query, function(err, rows, fields)
        {
            if(err)
            {
                alert(err);
                return;
            }
            else
            {
                document.location.href = 'produtos.html';
                alert("Produto excluído!");
            }
        });
    }
}
function get_date(data)
{
    date = new Date(data);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) 
    {
        dt = '0' + dt;
    }
    if (month < 10) 
    {
        month = '0' + month; 
    }
    return (year+'-'+month+'-'+dt);
}
function jq()
{
    $(document).ready(function()
    {
        $("#myInput").on("keyup", function() 
        {
            var value = $(this).val().toLowerCase();
            $("#myTable tr.linha").filter(function() 
            {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}
function pag_entrada(produto)
{
    sessionStorage.setItem("produto", produto.idproduto);
    document.location.href = 'entrada.html';
}
function pag_entrada_produto()
{
    var query = "SELECT nome, marca FROM produto where idproduto = "+sessionStorage.getItem("produto");
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            rows.forEach(produto => 
            {
                var prod_label = document.getElementById("produto");
                prod_label.innerHTML = produto.nome+" ("+produto.marca+")";
            });
        }
    });
}
function adiciona_estoque()
{
    var dados = [];
    dados.push(document.getElementById("qtd").value);
    dados.push(document.getElementById("preco_custo").value);
    dados.push(document.getElementById("preco_final").value);
    dados.push(document.getElementById("lista").value);
    var query = "call entrada_estoque("+sessionStorage.getItem("produto")+","+dados[0]+","+dados[1]+","+dados[2]+","+dados[3]+");";
    connection.query(query, function(err, rows, fields)
    {
        if(err)
        {
            alert(err);
            return;
        }
        else
        {
            document.location.href = 'produtos.html';
            alert("Entrada registrada!");
        }
    });
}
function pag_editar(produto)
{
    sessionStorage.setItem("produto", produto.idproduto);
    document.location.href = 'altera_produtos.html';
}
function codigo(produto)
{
    sessionStorage.setItem("produto", produto.idproduto);
    sessionStorage.setItem("produto_nome", produto.nome);
    document.location.href = 'imprime.html';
}
function imprime_codigo()
{
    var canvas = document.getElementById('barcode');
    var image = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.setAttribute("href", image);
    link.setAttribute("download", sessionStorage.getItem("produto")+"-"+sessionStorage.getItem("produto_nome")+".png");
    link.click();
}