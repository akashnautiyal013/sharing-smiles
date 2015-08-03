$(function(){

	//select the drop container
	var obj = $('.drop');

	// dragover event listener
	obj.on('dragover',function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).css('border',"2px solid #16a085");
	});

	//drop event listener
	obj.on('drop',function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).css('border',"2px dotted #bdc3c7");

		//get the files
		var files = e.originalEvent.dataTransfer.files;
		var file =files[0];
		//console.log(file);

		//upload data using the xhr object
		upload(file);

	});

	function upload(file){

		//create xhr object
		xhr = new XMLHttpRequest();

		//initiate request
		xhr.open('post','drop.php',true);

		//set headers
		xhr.setRequestHeader('Content-Type',"multipart/form-data");
		xhr.setRequestHeader('X-File-Name',file.fileName);
		xhr.setRequestHeader('X-File-Size',file.fileSize);
		xhr.setRequestHeader('X-File-Type',file.fileType);

		//send the file
		xhr.send(file);
	}

});