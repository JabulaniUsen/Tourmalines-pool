

function getUrlParamVal(param){
	var url_string = window.location.href
	var url = new URL(url_string);
	var materialCode = url.searchParams.get(param);
	return materialCode;
}




// document.getElementById('searchInput').onblur =  alert('los');

$(document).ready(function() {
	

	 $("#searchInput").keyup(function() {
	var searchInputData = $("#searchInput").val();
		if(searchInputData.length>0){
//user searching all materal in a dept
if(getUrlParamVal('code').length>0){
	var materialCode = getUrlParamVal('code');
	$.ajax({
		url: url + "/material/ajaxPerformDeptSearch",
		method: "POST",
		data: { searchInputData: searchInputData, materialCode:materialCode },
		success: function(data) {
			$('#searchData').html(data);
			
		   
		}
	});
}

//user searching writers material in the department alone
			if(getUrlParamVal('code').length>0 && getUrlParamVal('writer').length>0){

				var materialCode = getUrlParamVal('code');
				var writerUserName = getUrlParamVal('writer');
				$.ajax({
					url: url + "/material/ajaxPerformDeptWriterSearch",
					method: "POST",
					data: { searchInputData: searchInputData, materialCode:materialCode, writerUserName:writerUserName },
					success: function(data) {
						$('#searchData').html(data);
					   
					}
				});

			}
		
			

			
			
			
			
	 }else{
		 $('#searchData').html('');
		//$('#searchData').removeClass('loader');
	 }

	 
    
        
    });

});