function CadastrarDespesa(){
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateAdd = document.getElementById("dateAdd").value;
    var despesas = {amount:amount,description:description,dateAdd:dateAdd};
    db.database().ref('minhasdespesas').push(despesas);
}
