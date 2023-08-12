$(document).ready(function() {
	 $("#searchInput").keyup(function() {
	var searchInputData = $("#searchInput").val();
		if(searchInputData.length>0){
		
			//  $.post(url + 'material/ajaxPerformDeptSearch', {searchInputData:searchInputData}, function(data) {
			// 	 $('#searchData').html(data);
			// 	//$('#loader').removeClass('loader');
			// }); 

			$.ajax({
                url: url + "material/ajaxPerformDeptSearch",
                method: "POST",
                data: { searchInputData:searchInputData},
                success: function(data) {
                    $('#searchData').html(data);
                   
                }
            });
			
	 }else{
		 $('#searchData').html('');
		//$('#searchData').removeClass('loader');
	 }

	 
    
        
    });

});