document.getElementById("upload").onchange = function(e) {
  var file = document.getElementById("upload").files[0];
  var reader = new FileReader();
  reader.onload = function() {
    console.log(reader.result);
    document.getElementById("display").src = reader.result;
    // image editing
    // ...
    var blob = window.dataURLtoBlob(reader.result);
    console.log(blob, new File([blob], "image.png", {
      type: "image/png"
    }));
  };
  reader.readAsDataURL(file);
};