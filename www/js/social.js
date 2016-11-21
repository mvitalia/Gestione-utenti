var uriSocial;

function apriCameraSocial (){
   // alert("ok");
    navigator.camera.getPicture(Successo, fallito, { 
    quality: 40,
   // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true,
    saveToPhotoAlbum: true });
}



function Successo(imgUri)
{
  alert(imgUri);
   var image = document.getElementById('imgSocial');
   image.src = imgUri;
   uriSocial = imgUri;
}

function fallito ()
{
    alert("Fail");
}

function apriSocial()
{
   // window.plugins.socialsharing.share(options, onSuccess, onError);
      window.plugins.socialsharing.share(/* Messaggio*/null, /* Soggetto */null, /*Immagine*/ uriSocial, /* link */null);
 
  
}