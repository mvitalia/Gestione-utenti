// File che permette di aggiungere un nuovo cliente al server e nel db della App
var nomeFoto;
var uriImmagine;
function  aggiungiCliente(rnome,rcognome,remail)
{
    alert("ok");
    // Salvare anche nel db sql lite
    var   d = new Date();
    var  n = d.getTime();
    if(uriImmagine!=null)
    {
        nomeFoto = n + ".jpg";
    }else{
         nomeFoto = "fotoDefaultUtente.png";
    }
   
    $.ajax({
        type: "POST",
		data: {nome:''+rnome+'',cognome:''+rcognome+'',email:''+remail+'',foto:''+nomeFoto+''},
		url: 'http://www.trovoperte.com/admin/CS_aggiungiCliente.aspx',
        dataType: 'html',
		success: function(data){
			//console.log(data);
		//	alert('Cliente Salvato'+data);
         //   alert(uriImmagine);
          if(uriImmagine!=null)
          {
             uploadPhoto(uriImmagine);
          }else{
               $("#pop").click();
         }
         
		},
		error: function(){
			//console.log(data);
			alert('Errrore');
		}
	});
	// Faccio l' upload della foto se c'è
   
}


function apriCamera (){
   // alert("ok");
    navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 40,
   // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true,
    saveToPhotoAlbum: true });
}

function apriAlbum (){
  //  alert("ok");
    navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 40,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true,
    saveToPhotoAlbum: true });
}

function onSuccess(imgUri)
{
   alert(imgUri);
   var image = document.getElementById('noteimg');
   image.src = imgUri;
   uriImmagine = imgUri;
}

function onFail ()
{
    alert("Fail");
}


// Upload foto

function uploadPhoto(imgUri) {
          // alert("Prova"+imgUri);
           // alert("Prova"+nomeFoto);
            var options = new FileUploadOptions();
           
            options.fileKey="recFile";
            var imagefilename = nomeFoto;
            options.fileName=imagefilename;
            options.mimeType="image/jpeg";
             options.chunkedMode = false;
             options.headers = {
             Connection: "close"
            };
          // alert("Funzioni");
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;

            var ft = new FileTransfer();
           // alert("VAi");
            ft.upload(imgUri, encodeURI("http://www.trovoperte.com/admin/CSdue.aspx"), win, fail,options);
            ft.onprogress = function (progressEvent)
            {
                if(progressEvent.lengthComputable)
                {
                    var perc = Math.round(100 * (progressEvent.loaded / progressEvent.total));
                    $("#status").html("Loading");
                }else{
                   
                }
            }
        }

function win(r) {
            //console.log("Code = " + r.responseCode);
            //console.log("Response = " + r.response);
            //  alert("It's OK!");
            //  alert("Sent = " + r.bytesSent);
            //  alert("Sent = " + r.responseCode);
            //  alert("Sent = " + r.response);
           // alert("Cliente Salvato con successo");
            $("#status").html("");
            $("#pop").click();
          
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }