const UPLOAD_BUTTON = document.getElementById("upload-button");
const FILE_INPUT = document.querySelector("input[type=file]");
const AVATAR = document.getElementById("avatar");

FILE_INPUT.addEventListener("change", event => {
    const file = event.target.files[0];
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onloadend = () => {
      AVATAR.setAttribute("aria-label", file.name);
      AVATAR.style.background = `url(${reader.result}) center center/cover`;
    };
  });

  function previewProfileImage( uploader ) {   
    //ensure a file was selected 
    if (uploader.files && uploader.files[0]) {
        var imageFile = uploader.files[0];
        var reader = new FileReader();    
        reader.onload = function (e) {
            //set the image data as source
            $('#profileImage').attr('src', e.target.result);
        }    
        reader.readAsDataURL( imageFile );
    }
}

$("#imageUpload").change(function(){
    previewProfileImage( this );
})

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}
$(document).jQuery(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader()

            reader.onload = function (e) {
                $(".profile-pic").attr("src", e.target.result)
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    $("".file-upload").on("change", function () {
        readURL(this)
    })

    $(".upload-button").on("click", function () {
        $(".file-upload").trigger()
    })
})
