let shell = require('electron').shell;
var PDFDocument = require('pdfkit2');
var fs = require('fs');
const path = require('path');
const app = require('electron');
var dir = path.join(app.remote.app.getAppPath().replace("app.asar", "")+'tmp');
if (!fs.existsSync(dir))
{
    fs.mkdirSync(dir);
}
var dir = dir+'/relatorios';
if (!fs.existsSync(dir))
{
    fs.mkdirSync(dir);
}
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
    jq();
    lista();
};
function jq()
{
    window.$ = window.jQuery = require('jquery');
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
function lista()
{
    var query = "SELECT idproduto, nome, marca, quantidade, unidade FROM produto where status = 1;";
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
                var quantidade = document.createElement("td");
                quantidade.innerHTML = produto.quantidade + " " +produto.unidade;
                row.appendChild(produto_linha);
                row.appendChild(quantidade);
                row.appendChild(cod_bar);
                row.appendChild(entrada);
                select.appendChild(row);
            });
        }
    });
}
function formatDate(date) 
{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return  date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear() + "  (" + strTime + ")";
}
function transforma_to_preco(preco)
{
    /* convertendo o preço para float, deixa com duas casas decimais fixas, 
    convertendo para string, substituindo o ponto por vírgula e adiconando o prefixo R$*/
    var strPreco = "R$ " + parseFloat(preco).toFixed(2).toString().replace(".", ",");
    // retornando o resultado
    return strPreco;
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
function codigo(produto)
{
    sessionStorage.setItem("produto", produto.idproduto);
    document.location.href = 'imprime.html';
}
function imprime_codigo()
{
    var canvas = document.getElementById('barcode');
    var image = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.setAttribute("href", image);
    link.setAttribute("download", sessionStorage.getItem("produto")+".png");
    link.click();
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
function lista_compras()
{
    var altura = 55;
    var doc = new PDFDocument();
    var data = new Date();
    // create a document and pipe to a blob
    var diretorio = fs.createWriteStream(dir+"/lista-de-compras-"+encodeURIComponent(get_date(data.toISOString()))+".pdf");
    doc.pipe(diretorio);
    doc.fontSize(15).text('Emissão: '+get_date(data.toISOString()), 55, altura);
    altura += 40;
    doc.fontSize(15).text('Lista de compras', 260, altura);
    var query = "select * from produto where status = 1 and quantidade < qtd_minima;";
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
                altura += 40;
                doc.fontSize(15).text(produto.nome+" ("+produto.marca+")"+" - Quantidade em estoque: "+produto.quantidade+" "+produto.unidade+" - Quantidade mínima: "+produto.qtd_minima+" "+produto.unidade,
                55, altura);
                var query = "select * from fornecedor f inner join fornecedor_produto fp on fp. id_fornecedor = f.idfornecedor where fp.id_produto = "
                +produto.idproduto;
                altura += 20;
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
                            altura += 20;
                            doc.fontSize(13).text(" - "+fornecedor.nome_fantasia+" - "+transforma_to_preco(fornecedor.preco_custo), 65, altura);
                        });
                    }
                });
            });
        }
    });
    setTimeout(function()
    {
        shell.openExternal(path.join(dir+"/lista-de-compras-"+encodeURIComponent(get_date(data.toISOString()))+".pdf"));
        doc.end();
    }, 3000);
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
    return (dt+'/'+month+'/'+year);
}