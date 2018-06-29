function RetornarDespesa(){
    
    var lista = db.database().ref("minhasdespesas").on("value",function(res){
        var conteudoTabela = '';    
        var soma = 0;
        var i = 0;
        res.forEach(function(item){
           
            conteudoTabela +=`<tr>            
            <td class="tb">`+item.val().description+`</td>
            <td class="tb">`+item.val().amount+`</td>
            <td class="tb">`+item.val().dateAdd+`</td>
            <td class="tb action"><a href="confirm.html?id=`+item.key+`"><button type="submit"  class="btn btn-danger excluir" >Excluir</button></a>
            <a href="confirmedite.html?id=`+item.key+`"><button type="submit" id="editar" class="btn btn-warning">Editar</button></a></td>
            </tr>`;
                    
            //Verifica se pode ser tranformando em float
            if(!isNaN(parseFloat(item.val().amount))){
                soma = soma + parseFloat(item.val().amount);
            }
        });
        conteudoTabela += " <td class='tbtotal'><b>Valor Total</b></td><td class='tbtotal'></td><td class='tbtotal'></td><td class='tbtotal'><b>R$ "+ soma+"</b></td>"; 
        
        //local que vai ser colocado o conteudo do tbody    
        
        $("tbody").append(conteudoTabela);
    }); 
}
function excluir(){
    var url = window.location.href;
    url = url.split("=");
    db.database().ref('minhasdespesas/'+url[1]).remove();
 }

function editar(){
    var url = window.location.href;
    url = url.split("=");
    
    
    db.database().ref("minhasdespesas").on("value",function(res){
        res.forEach(function(item){
            if(url[1] == item.key){
                console.log(item.val());
                $('<input type="text" class="form-control" id="description" value="'+item.val().description+'" >').insertAfter("label#descri");
                $('<input type="number" class="form-control" id="amount" value="'+item.val().amount+'">').insertAfter("label#valor");
                $('<input type="date" class="form-control" id="dateAdd" value="'+item.val().dateAdd+'">').insertAfter("label#data");
            }
        });
    });
}
        
function SalvarEdicao(){
    var url = window.location.href;
    url = url.split("=");
            
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateAdd = document.getElementById("dateAdd").value;
    var updates = {amount:amount,description:description,dateAdd:dateAdd};
    console.log(updates); 
    db.database().ref('minhasdespesas/'+url[1]).update(updates);
    $("input#dateAdd").remove();
    $("input#amount").remove();
    $("input#description").remove();
    
    window.location.href = "list.html";
}

