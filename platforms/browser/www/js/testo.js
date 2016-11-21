/*var options = {
    message: 'share this', // not supported on some apps (Facebook, Instagram)
    subject: 'the subject', // fi. for email
    file: ["https://www.google.nl/images/srpr/logo4w.png",''], // an array of filenames either locally or remotely
    url: 'https://www.google.nl/images/srpr/logo4w.png',
   // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}*/

/*var onSuccess = function (result) {
    alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}*/

/*var onError = function (msg) {
  alert("Sharing failed with message: " + msg);
}*/

function apriTesto()
{
   // window.plugins.socialsharing.share(options, onSuccess, onError);
      window.plugins.socialsharing.share(/* Messaggio*/null, /* Soggetto */null, /*Immagine*/ 'https://www.google.nl/images/srpr/logo4w.png', /* link */null);
 
  
}

function contatto()
{
   window.requestFileSystem(LocalFileSystem.PERSISTENT,0, function (fs) {

  //  alert('file system open: ' + fs.name);
  //  alert(fs.root);
  /* Create file quando c'è la connessione mentre search file quando non c'é */
    // createFile(fs.root, "newFile.txt", false);
   searchFile(fs.root, "newFile.txt", false);

}, onErrorLoadFs);
  /* Creare nuovo contatto
  var myContact = navigator.contacts.create(
 {
 "displayName":null,
 "name":{
 "givenName":"Sundaravel",
 "formatted":"Sundaravel MSM",
 "middleName":null,
 "familyName":"MSM",
 "honorificPrefix":null,
 "honorificSuffix":null
 },
 "nickname":null,
 "phoneNumbers":[
 {"type":"mobile","value":"+919500707757","id":0,"pref":false},
 {"type":"other","value":"+919500707757","id":1,"pref":false}
 ],
 "emails":[
 {"type":"home","value":"sundaravelit@gmail.com","id":0,"pref":false}
 ],
 "addresses":[
 {
 "postalCode":"600094",
 "type":"work",
 "id":0,
 "locality":"Indian",
 "pref":"false",
 "streetAddress":" ",
 "region":"Chennai, Tamilnadu",
 "country":"India"
 }],
 "ims":null,
 "organizations":[
 {
 "name":"Lucin Inc",
 "title":"CEO",
 "type":null,
 "pref":"false",
 "department":"Software Development"
 }],
 "birthday":null,
 "note":"My Notes",
 "categories":null,
 "urls":[
 {
 "type":"other",
 "value":"www.phonegap.co.in",
 "id":0,
 "pref":false
 }]
 }
 );
 myContact.save(onSuccess,onError);
  */

}

/*function onSuccess(contacts) {
    alert('Found ' + contacts.displayName + ' contacts.');
};

function onError(contactError) {
    alert('onError!');
};*/



/*function onSuccess(contact) {
    alert("Save Success");
};

function onError(contactError) {
    alert("Error = " + contactError.code);
};*/

// Viene chiamamta quando c'è la connessione

function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        //alert("ok");
        writeFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

// Viene chiamata qunado non c'è la connnessione'
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

/*function writeFile(fileEntry, dataObj) {
     alert("Dai");
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        var dati = "";
        $.getJSON("http://www.trovoperte.com/admin/CS.aspx", function (info) { 
           // alert("Preghiamo");
           dati = JSON.stringify(info);
		   fileWriter.write(dati);
           //  alert("Preghiamo dai");
           fileWriter.onwriteend = function (e) {
          //  alert("ciao");
		  readFile(fileEntry);
		  };
          fileWriter.onerror = function (e) {
		   alert('Write failed: ' + e.toString());
          };
    });
});
}*/

function readFile(fileEntry) {

  //  alert("Leggo");
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
           // alert("Successful file read: " + this.result);
           //  alert("Si");
             var datiDecompressi = JSON.parse(this.result);
          //  alert("Dati compressi"+datiDecompressi);
            var li_dati="";
            $.each(datiDecompressi, function (i, name) {
                        li_dati += "<li> <img src='"+name.icona+"' class='ui-li-thumb'/>" + name.ID + " - " + name.user + "</li>";
                         db = window.openDatabase("PROVADBDue", "1.0", "Darabse prova", 200000);
                        db.transaction(
                        // Metodo di chiamata asincrona
                        function(tx) {
                                    tx.executeSql("CREATE TABLE IF NOT EXISTS contatti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome, cognome, email,foto)");
                                    tx.executeSql("INSERT INTO contatti (nome,cognome,email,foto) VALUES (?,?,?,?)",[name.user,name.user,name.user,name.icona]);
                                    },
                            onDbError,
                        )
                    });

                    $("#lista_datiJson").append(li_dati).promise().done(function () {
                        $(this).listview("refresh");
                    });
            displayFileData(fileEntry.fullPath + ": " + this.result);
        };
      //  alert("Tre");
        reader.readAsText(file);

    }, onErrorReadFile);
}

function onErrorCreateFile()
{
    alert("No file, collegarsi a internet");
}



