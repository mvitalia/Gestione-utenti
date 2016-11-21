// CREAZIONE DB OPERAZIONI DI CRUD

    // Apro databse sql
    function aproDatabase() {
      db = window.openDatabase("PROVADBDue", "1.0", "Darabse prova", 200000);
      db.transaction(creoDb,onDbError, onDbSuccess);
    }
    
    // Permette di leggere nel db
    function leggoDatabase (){
        db = window.openDatabase("PROVADBDue", "1.0", "Darabse prova", 200000);
        db.transaction(leggoDb,onSelectSucces,onDbError);
    }


    // Creao il db e inserisco dati nel db
    function creoDb(tx){
       tx.executeSql("CREATE TABLE IF NOT EXISTS contatti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome, cognome, email,foto)");
      // tx.executeSql("INSERT INTO persone (nome,cognome,email) VALUES (?,?,?)",['Alessandro','Carlucci','a.carlucci@mvitalia.com']);
    }

    // Select dei vari dati
    function leggoDb(tx){
       tx.executeSql("SELECT * FROM contatti ORDER BY id ASC",[], onSelectSucces, onDbError);
        
    }

    


     // Select dei vari dati
    function insertDb(tx){
       tx.executeSql("INSERT INTO contatti (nome,cognome,email,foto) VALUES (?,?,?,?)",[]);
    }

   // Se vi sono errori, mi dice il tipo di errore
    function onDbError(error){
        alert("Errore database"+error.message);
    }

    // Se ho successo nella creazione e nell' inserimento dei dati nel db'
    function onDbSuccess(){
        alert("Ok db creato");
    }

    // Selezione dei vari record nella tabella
    function onSelectSucces(tx,dati){
        var len = dati.rows.length;
        var li_dati="";
        if(len!=0)
        {
             
             for(var i=0; i<len; i++)
            {
                 alert(dati.rows.item(i).foto);
                li_dati+=buildRiga(dati.rows.item(i).id, dati.rows.item(i).nome, dati.rows.item(i).cognome, dati.rows.item(i).email,dati.rows.item(i).foto);
            }
            
        }
       // Permette di "appendere" il codice html creato in dinamico con i dati
       $("#lista_dati").append(li_dati).promise().done(function () {
         $(this).listview("refresh");
        });
       
        
    }
    
    // Crea il codice html da inserire
    function buildRiga (rid, rnome, rcognome, remail,rfoto)
    {
        return "<li id="+rid+" data-itemid="+rid+">"
               +"<a href='#'><img src='"+rfoto+"'><h3>" + rnome + " - "+rcognome + " </h3> " 
               +"<p>"+ remail + " </p></a> "
               +"<a class='deleteItem' href='#' data-rel='popup'></a>"
    }

    // Permette di leggere nel db
    function inseriscoDatabase (rnome,rcognome,remail,rfoto)
    {
        alert("Eseguito");
        db = window.openDatabase("PROVADBDue", "1.0", "Darabse prova", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function(tx) {
                tx.executeSql("DROP TABLE IF EXISTS contatti");
                tx.executeSql("CREATE TABLE IF NOT EXISTS contatti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome, cognome, email,foto)");
                tx.executeSql("INSERT INTO contatti (nome,cognome,email,foto) VALUES (?,?,?,?)",[rnome,rcognome,remail,rfoto]);
            },
            onDbError,
            function(){
                alert("Inserimento effettuato");
            }
        )
    }

    // Permette di cancellare un record

    function cancelloRecord (iditem)
    {
    
       db = window.openDatabase("PROVADBDue", "1.0", "Darabse prova", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function(tx) {
                tx.executeSql("DELETE FROM contatti WHERE id=?",[iditem]);
            },
            onDbError,
            function(){
                alert("Cancellazione effettua");
                //Eliminare <li> 
            }
        )
    }