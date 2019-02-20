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
var dir2 = dir+'/relatorios';
if (!fs.existsSync(dir2))
{
    fs.mkdirSync(dir2);
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
    var data = new Date();
    data = get_mes(data.toISOString());
    document.getElementById("date").value = data;
};
function cria_doc(tipo, valor)
{
    var altura = 55;
    var doc = new PDFDocument();
    // create a document and pipe to a blob
    var diretorio = fs.createWriteStream(dir2+'/relatorio'+valor+'.pdf');
    doc.pipe(diretorio);
    if(tipo == 1)
    {
        var data = new Date();
        doc.fontSize(15).text('Emissão: '+get_date(data.toISOString()), 55, altura);
        doc.fontSize(15).text('Período: '+get_date2(valor), 400, altura);
        altura += 40;
        var query = "select sum(lucro) as lucro_total from margem_lucro_produto where month('"+valor+"-01') = month(data)";
        connection.query(query, function(err, rows, fields)
        {
            if(err)
            {
                alert(err);
                return;
            }
            else
            {
                rows.forEach(lucro_total => 
                {
                    doc.fontSize(15).text('Lucro Total: '+transforma_to_preco(lucro_total.lucro_total), 55, altura);
                });
                altura += 40;
                doc.fontSize(15).text('Lucro por produto: ', 55, altura);
                var query = "select * from margem_lucro_produto where month('"+valor+"-01') = month(data)";
                connection.query(query, function(err, rows, fields)
                {
                    if(err)
                    {
                        alert(err);
                        return;
                    }
                    else
                    {
                        rows.forEach(lucro_produto => 
                        {
                            if(altura >= 696)
                            {
                                altura = 30;
                                doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                            }
                            else
                            {
                                if(altura <= 695 && altura >= 680)
                                {
                                    doc.addPage();
                                    altura = 30;
                                    doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                                }
                                else
                                {
                                    altura += 20;
                                    doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                                }
                            }
                        });
                        altura += 40;
                        doc.fontSize(15).text('Produtos em estoque: ', 55, altura);
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
                                rows.forEach(produto => 
                                {
                                    if(altura >= 696)
                                    {
                                        altura = 30;
                                        doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);
                                    }
                                    else
                                    {
                                        if(altura <= 695 && altura >= 680)
                                        {
                                            doc.addPage();
                                            altura = 30;
                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);
                                        }
                                        else
                                        {
                                            altura += 20;
                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);                                
                                        }
                                    }
                                });
                                altura += 40;
                                doc.fontSize(15).text('Produtos mais vendidos: ', 55, altura);
                                var query = "select * from mais_vendidos where month('"+valor+"-01') = month(data)";
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
                                            if(altura >= 696)
                                            {
                                                altura = 30;
                                                doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);
                                            }
                                            else
                                            {
                                                if(altura <= 695 && altura >= 680)
                                                {
                                                    doc.addPage();
                                                    altura = 30;
                                                    doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);
                                                }
                                                else
                                                {
                                                    altura += 20;
                                                    doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);                                        
                                                }
                                            }
                                        });
                                        altura += 40;
                                        doc.fontSize(15).text('Produtos menos vendidos: ', 55, altura);
                                        var query = "select * from menos_vendidos where month('"+valor+"-01') = month(data)";
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
                                                    if(altura >= 696)
                                                    {
                                                        altura = 30;
                                                        doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);            
                                                    }
                                                    else
                                                    {
                                                        if(altura <= 695 && altura >= 680)
                                                        {
                                                            doc.addPage();
                                                            altura = 30;
                                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);            
                                                        }
                                                        else
                                                        {
                                                            altura += 20;
                                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);                                                            
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        setTimeout(function()
        {
            shell.openExternal(path.join("file:///"+dir2+"/relatorio"+valor+".pdf"));
            doc.end();
        }, 3000);
    }
    else if(tipo == 2)
    {
        var data = new Date();
        doc.fontSize(15).text('Emissão: '+get_date(data.toISOString()), 55, altura);
        doc.fontSize(15).text('Período: '+get_date3(valor), 400, altura);
        altura += 40;
        var query = "select sum(lucro) as lucro_total from margem_lucro_produto where year('"+valor+"-01') = year(data)";
        connection.query(query, function(err, rows, fields)
        {
            if(err)
            {
                alert(err);
                return;
            }
            else
            {
                rows.forEach(lucro_total => 
                {
                    doc.fontSize(15).text('Lucro Total: '+transforma_to_preco(lucro_total.lucro_total), 55, altura);
                });
                altura += 40;
                doc.fontSize(15).text('Lucro por produto: ', 55, altura);
                var query = "select * from margem_lucro_produto where year('"+valor+"-01') = year(data)";
                connection.query(query, function(err, rows, fields)
                {
                    if(err)
                    {
                        alert(err);
                        return;
                    }
                    else
                    {
                        rows.forEach(lucro_produto => 
                        {
                            if(altura >= 696)
                            {
                                altura = 30;
                                doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                            }
                            else
                            {
                                if(altura <= 695 && altura >= 680)
                                {
                                    doc.addPage();
                                    altura = 30;
                                    doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                                }
                                else
                                {
                                    altura += 20;
                                    doc.fontSize(13).text(" - "+lucro_produto.nome+' ('+lucro_produto.marca+") - "+transforma_to_preco(lucro_produto.lucro)+"", 55, altura);
                                }
                            }
                        });
                        altura += 40;
                        doc.fontSize(15).text('Produtos em estoque: ', 55, altura);
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
                                rows.forEach(produto => 
                                {
                                    if(altura >= 696)
                                    {
                                        altura = 30;
                                        doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);
                                    }
                                    else
                                    {
                                        if(altura <= 695 && altura >= 680)
                                        {
                                            doc.addPage();
                                            altura = 30;
                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);
                                        }
                                        else
                                        {
                                            altura += 20;
                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.quantidade+" "+produto.unidade, 55, altura);                                
                                        }
                                    }
                                });
                                altura += 40;
                                doc.fontSize(15).text('Produtos mais vendidos: ', 55, altura);
                                var query = "select * from mais_vendidos where year('"+valor+"-01') = year(data)";
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
                                            if(altura >= 696)
                                            {
                                                altura = 30;
                                                doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);    
                                            }
                                            else
                                            {
                                                if(altura <= 695 && altura >= 680)
                                                {
                                                    doc.addPage();
                                                    altura = 30;
                                                    doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);    
                                                }
                                                else
                                                {
                                                    altura += 20;
                                                    doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);                                            
                                                }
                                            }
                                        });
                                        altura += 40;
                                        doc.fontSize(15).text('Produtos menos vendidos: ', 55, altura);
                                        var query = "select * from menos_vendidos where year('"+valor+"-01') = year(data)";
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
                                                    if(altura >= 696)
                                                    {
                                                        altura = 30;
                                                        doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);    
                                                    }
                                                    else
                                                    {
                                                        if(altura <= 695 && altura >= 680)
                                                        {
                                                            doc.addPage();
                                                            altura = 30;
                                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);    
                                                        }
                                                        else
                                                        {
                                                            altura += 20;
                                                            doc.fontSize(13).text(" - "+produto.nome+' ('+produto.marca+") - "+produto.vendas+" vendas", 60, altura);                                                    
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        setTimeout(function()
        {
            shell.openExternal(path.join("file:///"+dir2+"/relatorio"+valor+".pdf"));
            doc.end();
        }, 3000);
    }
    // end and display the document in the iframe to the right
}
function cria_doc2(tipo, valor)
{
    var altura = 55;
    var doc = new PDFDocument();
    // create a document and pipe to a blob
    var diretorio = fs.createWriteStream(dir2+'/auditoria'+valor+'.pdf');
    doc.pipe(diretorio);
    if(tipo == 1)
    {
        var data = new Date();
        doc.fontSize(15).text('Emissão: '+get_date(data.toISOString()), 55, altura);
        doc.fontSize(15).text('Período: '+get_date2(valor), 400, altura);
        altura += 40;
        doc.fontSize(15).text('Auditoria', 260, altura);
        altura += 40;
        var query = "select * from auditoria where month('"+valor+"-01') = month(data)";
        connection.query(query, function(err, rows, fields)
        {
            if(err)
            {
                alert(err);
                return;
            }
            else
            {
                rows.forEach(log => 
                {
                    switch(log.tipo)
                    {
                        case 0:
                            log.tipo = "Cadastro do produto";
                            break;
                        case 1:
                            log.tipo = "Venda";
                            break;
                        case 2:
                            log.tipo = "Entrada de produto";
                            break;
                        case 3:
                            log.tipo = "Conferência do estoque";
                            break;
                    }
                    altura += 40;
                    doc.fontSize(13).text(" * "+log.tipo+" - "+log.nome+" ("+log.marca+") - "+get_date4(log.data), 55, altura);
                    altura += 20;
                    doc.fontSize(13).text(" - Quantidade anterior: "+log.qtd_last+" - "+"Quantidade final: "+log.qtd_new, 55, altura);
                });
            }
        });
        setTimeout(function()
        {
            shell.openExternal(path.join("file:///"+dir2+"/auditoria"+valor+".pdf"));
            doc.end();
        }, 3000);
    }
    else if(tipo == 2)
    {
        var data = new Date();
        doc.fontSize(15).text('Emissão: '+get_date(data.toISOString()), 55, altura);
        doc.fontSize(15).text('Período: '+get_date3(valor), 400, altura);
        altura += 40;
        var query = "select * from auditoria where year('"+valor+"-01') = year(data)";
        connection.query(query, function(err, rows, fields)
        {
            if(err)
            {
                alert(err);
                return;
            }
            else
            {
                rows.forEach(log => 
                {
                    switch(log.tipo)
                    {
                        case 0:
                            log.tipo = "Cadastro do produto";
                            break;
                        case 1:
                            log.tipo = "Venda";
                            break;
                        case 2:
                            log.tipo = "Entrada de produto";
                            break;
                        case 3:
                            log.tipo = "Conferência do estoque";
                            break;
                    }
                    altura += 40;
                    doc.fontSize(13).text(" * "+log.tipo+" - "+log.nome+" ("+log.marca+") - "+get_date4(log.data), 55, altura);
                    altura += 20;
                    doc.fontSize(13).text(" - Quantidade anterior: "+log.qtd_last+" - "+"Quantidade final: "+log.qtd_new, 55, altura);
                });
            }
        });
        setTimeout(function()
        {
            shell.openExternal(path.join("file:///"+dir2+"/relatorio"+valor+".pdf"));
            doc.end();
        }, 3000);
    }
    // end and display the document in the iframe to the right
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
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  (" + strTime + ")";
}
function transforma_to_preco(preco)
{
    /* convertendo o preço para float, deixa com duas casas decimais fixas, 
    convertendo para string, substituindo o ponto por vírgula e adiconando o prefixo R$*/
    var strPreco = "R$ " + parseFloat(preco).toFixed(2).toString().replace(".", ",");
    // retornando o resultado
    return strPreco;
}
function relatorio()
{
    var filtro = document.getElementById("filtro").value;
    var data = document.getElementById("date").value;
    if(filtro == 0)
    {
        alert("Escolha um filtro!");
    }
    else
    {
        cria_doc(filtro, data);
    }
}
function auditoria()
{
    var filtro = document.getElementById("filtro").value;
    var data = document.getElementById("date").value;
    if(filtro == 0)
    {
        alert("Escolha um filtro!");
    }
    else
    {
        cria_doc2(filtro, data);
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
    return (dt+'/'+month+'/'+year);
}
function get_date2(data)
{
    date = new Date(data);
    year = date.getFullYear();
    month = date.getMonth()+2;
    if (month < 10) 
    {
        month = '0' + month; 
    }
    return (month+'/'+year);
}
function get_date3(data)
{
    date = new Date(data);
    year = date.getFullYear();
    return (year);
}
function get_mes(data)
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
    return (year+'-'+month);
}
function get_date4(data)
{
    date = new Date(data);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    hr = date.getHours()+1;
    min = date.getMinutes()+1;
    if (dt < 10) 
    {
        dt = '0' + dt;
    }
    if (month < 10) 
    {
        month = '0' + month; 
    }
    if (hr < 10) 
    {
        hr = '0' + hr; 
    }
    if (min < 10) 
    {
        min = '0' + min; 
    }
    return (dt+'/'+month+'/'+year)+" ("+hr+":"+min+")";
}