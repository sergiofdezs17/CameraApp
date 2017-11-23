function opencamera(){
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });

function onSuccess(imageURI) {
    var image =document.getElementById('myImage');
    image.style.display='block';
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
}

function init(){
 document.getElementById("mybutton").addEventListener("click",opencamera);
    
     document.getElementById("mybutton2").addEventListener("click",opencamera2);
}


function opencamera2(){

    //alert(navigator.camera);

    navigator.camera.getPicture(onSuccess2, onFail2, { quality: 50,

    destinationType: Camera.DestinationType.FILE_URI });   

}



var fileData;

var fileName;



function onSuccess2(imageURI) {

    var image = document.getElementById('myImage');

    image.src = imageURI;



    //dirEntry = [cordova.file.dataDirectory];

    //alert("dirEntry: "+dirEntry)

    //alert("imageURI: "+imageURI)

    var url = [imageURI];

    fileData = new Blob(url, {type: 'file'});//create blob of file

    var currentdate = new Date(); 

    fileName = currentdate.getDate() + ""

                + (currentdate.getMonth()+1)  + "" 

                + currentdate.getFullYear() + ""  

                + currentdate.getHours() + ""  

                + currentdate.getMinutes() + "" 

                + currentdate.getSeconds() + ".jpg";

    //alert("fileName: "+fileName)

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    //saveFile(dirEntry, fileData, fileName);

}



function onFail2(message) {

    alert('Failed because: ' + message);

}



function gotFS(fileSystem) {

    fileSystem.root.getDirectory("photos", 

        {create: true, exclusive: false}, 

        saveFile, 

        fail);

}



function fail(error) {

    console.log("fail");

}



var url;

function saveFile(dirEntry) {

    //alert("dirEntry "+dirEntry.toURL());

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        //alert("v1 fileEntry "+fileEntry.toURL());

        url=fileEntry.toURL();

        writeFile(fileEntry, fileData);



    }, onErrorCreateFile);

}



function onErrorCreateFile() {

    alert("error creating file");

}



function writeFile(fileEntry, dataObj, isAppend) {

    //alert("writeFile function");

    //alert("data: "+dataObj);

    // Create a FileWriter object for our FileEntry (log.txt).

    fileEntry.createWriter(function (fileWriter, fileEntry) {



        fileWriter.onwriteend = function() {

            //alert("hello");

            alert("Photo saved succesfully!");

            //alert("fileEntry "+fileEntry.toURL());

                var photo2 = document.getElementById('myImage');
            
             };



        fileWriter.onerror = function(e) {

            console.log("Failed file write: " + e.toString());

        };



        fileWriter.write(dataObj);

    });

}
