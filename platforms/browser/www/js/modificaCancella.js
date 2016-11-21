// Selezionare il cliente giusto in base all' id modificare o concellare
var idCliente;


function caricoCliente ()
{
    idCliente = sessionStorage.getItem('id')
    db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
    db.transaction(carico,successoCaricoDati);     
}

function carico(tx)
{
       tx.executeSql("SELECT * FROM clienti WHERE identificativo= ? ORDER BY id ASC",[idCliente], successoCaricoDati,erroreCarico);        
}

function successoCaricoDati(tx,dati)
{
    var len = dati.rows.length;
    var image = document.getElementById('imgModificaCancella');
   
        if(len!=0)
        {
             
             for(var i=0; i<len; i++)
            {
               
                 image.src = dati.rows.item(i).foto;
                 $("#nomeM").val(dati.rows.item(i).nome);  
                 $("#cognomeM").val(dati.rows.item(i).cognome);  
                 $("#emailM").val(dati.rows.item(i).email);  
               
            }
            
        }
     
}

function erroreCarico ()
{
    alert("Select non avvenuta");
}


 function apriCameraModifica ()
 {
    navigator.camera.getPicture(successoCameraModifica, erroreCameraModifica, { 
    quality: 40,
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true,
    saveToPhotoAlbum: true });

 }

function successoCameraModifica(imgUri)
{
   var image = document.getElementById('imgModificaCancella');
   image.src = imgUri;
}

function erroreCameraModifica (){
    alert("Errore");
}


function selezionaFotoModifica ()
 {
     alert("Seleziona foto");

 }

 function cancellaCliente (){
     // Prima cancello server e  poi cancello db slite app
        db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function(tx) {
                tx.executeSql("DELETE FROM clienti WHERE id=?",[idCliente]);
            },
            onDbError,
            function(){
                alert("Cancellazione effettua");
               
            }
        )
 }