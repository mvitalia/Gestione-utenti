var imageDue="";
var nome = "", cognome = "", email="", foto = "", path="";

function apriCam (){
    navigator.camera.getPicture(uploadPhoto, onFail, { 
    quality: 40,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true,
    saveToPhotoAlbum: true });
}



function onSuccess(imgUri) {
  //alert("Prova");
   var image = document.getElementById('noteimg');
   image.src = imgUri;
   // Scrittura file binary
   imageDue = imgUri;
   alert(imgUri);
  
  
}

function onFail(message) {
    alert('Failed because: ' + message);
}


function apriFile(rnome,rcognome,remail)
{
    nome=rnome;
    cognome=rcognome;
    email = remail;
    movePic(imageDue);

}
function movePic(file){ 
    alert("Eseguito Uno");
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "tmp";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
        alert(fileSys.root.toNativeURL());
    path = fileSys.root.toNativeURL();
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                    alert("Eseguito Due");
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
   
    alert(entry.fullPath);
    localStorage.setItem('imagepath', entry.fullPath);
    //var image = document.getElementById('noteimgDue');
    var s = entry.fullPath;
    alert(s);
    var cart = s.replace("/tmp","tmp")
    alert(cart);
    var tot = path+""+cart
     alert(tot);
   //image.src =tot;
   foto = tot;
   inseriscoDatabase(nome,cognome,email,foto);
}

function resOnError(error) {
    alert(error.code);
}

function onErrorCreateFile ()
{
    alert("errore create file");
}

function onErrorLoadFs ()
{
    alert("errore load");
}

function onErrorReadFile ()
{
    alert("Errore lettura file");
}

function errorHandler()
{
    alert("errore");
}

function condividiFoto()
{
    alert("Prova");
      window.plugins.socialsharing.share(/* Messaggio*/null, /* Soggetto */null, /*Immagine*/ imageDue, /* link */null);
}

function uploadPhoto(imageUri) {
           alert("Prova"+imageUri);
            var options = new FileUploadOptions();
           
            options.fileKey="recFile";
            var imagefilename = Number(new Date())+".jpg";
            options.fileName=imagefilename;
            options.mimeType="image/jpeg";
             options.chunkedMode = false;
             options.headers = {
             Connection: "close"
            };
           alert("Funzioni");
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            params.prova = "Ale";
            options.params = params;

            var ft = new FileTransfer();
            alert("ok prova");
            ft.upload(imageUri, "http://www.trovoperte.com/admin/CSdue.aspx", win, fail,options);
            ft.onprogress = function (progressEvent)
            {
                if(progressEvent.lengthComputable)
                {
                    var perc = Math.round(100 * (progressEvent.loaded / progressEvent.total));
                    $("#status").html("Loading");
                }else{
                    $("#status").html("Loading");
                }
            }
        }

function win(r) {
            //console.log("Code = " + r.responseCode);
            //console.log("Response = " + r.response);
            alert("It's OK!");
            alert("Sent = " + r.bytesSent);
             alert("Sent = " + r.responseCode);
             alert("Sent = " + r.response);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }