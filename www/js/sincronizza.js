/*
 function aproDatabase() {
      db = window.openDatabase("PROVA SYN", "1.0", "Database prova", 200000);
      db.transaction(creoDb,onDbError, onDbSuccess);
    }

 function creoDb(tx){
       tx.executeSql("CREATE TABLE IF NOT EXISTS tic_clienti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome, cognome, email)");
       tx.executeSql("INSERT INTO tic_clienti (nome,cognome,email) VALUES (?,?,?)",['Alessandro','Carlucci','a.carlucci@mvitalia.com']);
        tx.executeSql("INSERT INTO tic_clienti (nome,cognome,email) VALUES (?,?,?)",['Patrizia','Guglielmo','p.guglielmo@mvitalia.com']);
    }

 function leggoDatabase (){
        db = window.openDatabase("PROVA SYN", "1.0", "Database prova", 200000);
        db.transaction(leggoDb,onSelectSucces,onDbError);
    }


     function leggoDb(tx){
       tx.executeSql("SELECT * FROM tic_clienti ORDER BY id ASC",[], onSelectSucces, onDbError);
        
    }

    function onSelectSucces(tx,dati){
        var len = dati.rows.length;
        var li_dati="";
        if(len!=0)
        {
             
             for(var i=0; i<len; i++)
            {
                
                li_dati+=buildRiga(dati.rows.item(i).id, dati.rows.item(i).nome, dati.rows.item(i).cognome, dati.rows.item(i).email);
            }
            
        }
       // Permette di "appendere" il codice html creato in dinamico con i dati
       $("#listaDb").append(li_dati).promise().done(function () {
         $(this).listview("refresh");
        });
       
        
    }
    
    // Crea il codice html da inserire
    function buildRiga (rid, rnome, rcognome, remail)
    {
        return "<li id="+rid+" data-itemid="+rid+">"
               +"<a href='#'><h3>" + rnome + " - "+rcognome + " </h3> " 
               +"<p>"+ remail + " </p></a> "
               +"<a class='deleteItem' href='#' data-rel='popup'></a></li>"
    }

     function onDbError(error){
        alert("Errore database"+error.message);
    }

      function onDbSuccess(){
        alert("Ok db creato");
    }
*/
    