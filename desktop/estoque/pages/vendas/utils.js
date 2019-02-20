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
    var query = "SELECT * FROM historico;";
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
            rows.forEach(compra => 
            {
                var row = document.createElement("tr");
                row.className = "linha";
                var data = document.createElement("td");
                var date = new Date(compra.data);
                data.innerHTML = formatDate(date);
                var total_itens = document.createElement("td");
                total_itens.innerHTML = compra.qtd_itens;
                var valor_final = document.createElement("td");
                valor_final.innerHTML = transforma_to_preco(compra.valor_total);
                var desconto = document.createElement("td");
                desconto.innerHTML = transforma_to_preco(compra.desconto_total);
                var cliente = document.createElement("td");
                cliente.innerHTML = compra.nome_cliente != null ? compra.nome_cliente+" ("+compra.cpfcnpj_cliente+")" : "Não especificado";
                row.appendChild(data);
                row.appendChild(total_itens);
                row.appendChild(valor_final);
                row.appendChild(desconto);
                row.appendChild(cliente);
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
    return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear() + "  (" + strTime + ")";
}
function transforma_to_preco(preco)
{
    /* convertendo o preço para float, deixa com duas casas decimais fixas, 
    convertendo para string, substituindo o ponto por vírgula e adiconando o prefixo R$*/
    var strPreco = "R$ " + parseFloat(preco).toFixed(2).toString().replace(".", ",");
    // retornando o resultado
    return strPreco;
}