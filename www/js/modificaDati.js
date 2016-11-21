 // Funzione per vedere se c'è o non c'è la connessione

 function checkInternet() 
 {
    var online = window.navigator.onLine;
    if (!online) 
    {
        return false;
    } else 
    {
        return true;
    }
 }

function modificaDati ()
{
alert("prova"+sessionStorage.getItem('id'));
   if(checkInternet)
   {
        alert("OK connessione");
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0, function (fs) {
        alert('file system open: ' + fs.name);
        alert(fs.root);        
        creaFile(fs.root, "fileDatiModifica.txt", false);},onErrorLoadFs);
        
       
    }else
    
    {
         alert("NO connessione");        
    }
    
}


function creaFile(dirEntry, fileName, isAppend) {
    alert("Create File");
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        //alert("ok");
        scriviFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

function scriviFile(fileEntry, dataObj) {
     alert("WriteFile"+fileEntry);
    // Create a FileWriter object for our FileEntry (log.txt).
      alert("Ok");
    fileEntry.createWriter(function (fileWriter) {
            alert("Ok");
        var dati = "";
        $.getJSON("http://www.trovoperte.com/admin/CS_Sync.aspx", function (info) { 
           dati = JSON.stringify(info);
           alert(dati);
		   fileWriter.write(dati);
             alert("Preghiamo dai");
           fileWriter.onwriteend = function (e) {
            alert("ciao");
		  leggiFile(fileEntry);
		  };
          fileWriter.onerror = function (e) {
		   alert('Write failed: ' + e.toString());
          };
    });
});
}

function searchFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {}, function(fileEntry) {
        alert(fileName);
        if(fileName!=null)
        {
            alert("Esiste file");
        }else{
            alert("Connettersi a internet");
        }
        readFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

function leggiFile(fileEntry) {

     alert("Leggo");
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
             alert("Successful file read: " + this.result);
             alert("Si");
             var datiDecompressi = JSON.parse(this.result);
             alert("Dati compressi"+datiDecompressi);
            var li_dati="";
            $.each(datiDecompressi, function (i, name) {
                        if(sessionStorage.getItem('id')==name.ID)
                        {
                            alert("Entra");
                            li_dati +="<img width='150px' heigth='150px' src='"+name.foto+"'/>";
                        }
                              
                    });
                    $("#dettaglio").append(li_dati).promise().done(function () {
                       // $(this).listview("refresh");
                    });
            displayFileData(fileEntry.fullPath + ": " + this.result);
        };
         alert("Tre");
        reader.readAsText(file);

    }, onErrorReadFile);
}

function onErrorCreateFile()
{
    alert("No file, collegarsi a internet");
}
