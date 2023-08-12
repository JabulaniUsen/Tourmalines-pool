
var materialCode = getUrl();
    function getUrl(){
        var url_string = window.location.href
        var url = new URL(url_string);
        var materialCode = url.searchParams.get("code");
        return materialCode;
    }
   

    //alert(materialCode);

    //Check if the usercomment button is clicked and prevent page refresh
    document.getElementById('userCommentBtn').addEventListener("click", function(event) {
        event.preventDefault();
        var materialCode = getUrl();
        var commentData = document.getElementById('userCommentInput').value;
        var commentFeedback = document.getElementById("commentFeedback");

        commentFeedback.classList.remove("danger-msg"); //add a class

        if (commentData.length != 0) {
            //add comment to db
            $.ajax({
                url: url + "material/ajaxPerformComment",
                method: "POST",
                data: { materialCode: materialCode, commentData: commentData },
                success: function(data) {
                    $('#commentFeedback').html(data);
                    displayComment();
                    document.getElementById('userCommentInput').value = ''; //delete comment from input
                    
                    updateCommentStatusForWriter(materialCode);
                    
                    displayCommentNumberToWriter(materialCode);
                }
            });

        } else {

            commentFeedback.classList.add("danger-msg"); //add a class
            $('#commentFeedback').html('Your comment is required.'); //display a message

        }

    });



    //display comment
    function displayComment() {
        var materialCode = getUrl();
        $.ajax({
            url: url + "material/ajaxDisplayComment",
            method: "POST",
            data: { materialCode: materialCode },
            success: function(data) {
                $('.displayCommentHere').html(data);
            }
        });
    }
    displayComment();



    function deleteWriterComment(thelink) {
        var commentId = (thelink.getAttribute('data-info'));
        $.ajax({
            url: url + "/material/ajaxDeleteWriterComment",
            method: "POST",
            data: { commentId: commentId },
            success: function(data) {
                $('#commentDeleteFeedback').html(data);
                displayComment();
            }
        });
    }

    function deleteUserComment(thelink) {
        var commentId = (thelink.getAttribute('data-info'));
        $.ajax({
            url: url + "/material/ajaxDeleteUserComment",
            method: "POST",
            data: { commentId: commentId },
            success: function(data) {
                $('#commentDeleteFeedback').html(data);
                displayComment();
            }
        });
    }




    //check if the user/writer clicks the comment tab 
    document.getElementById("materialComment").addEventListener("click", function() {
        var materialCode = getUrl();
        updateCommentStatusForWriter(materialCode);
        displayCommentNumberToWriter(materialCode);
    }, false);

    function updateCommentStatusForWriter(materialCode) {
        $.ajax({
            url: url + "/material/ajaxUpdateWriterCommentStatus",
            method: "POST",
            data: { materialCode: materialCode },
            success: function(data) {
                // $('#commentDeleteFeedback').html(data);
                // alert(data);
            } 
        });
    }


    //display comment number to writer
    displayCommentNumberToWriter();
    function displayCommentNumberToWriter(materialCode) {
        var materialCode = getUrl();
        $.ajax({
            url: url + "material/ajaxDisplayCommentNumber",
            method: "POST",
            data: { materialCode: materialCode },
            success: function(data) {
                $('#commentNumber').html(data);
            }
        });
    }



     //Check if the user reframe button is clicked and prevent page refresh
     document.getElementById('reframeRequestBtn').addEventListener("click", function(event) {
        event.preventDefault();
        
        var materialCode = getUrl();
        var reframeData = document.getElementById('userRequestInput').value;
        var requestFeedback = document.getElementById("requestFeedback");
        
        // reframeFeedback.classList.remove("danger-msg"); //add a class

        // if (reframeData.length != 0) {
            //add reframe to db
            
            $.ajax({
                url: url + "material/ajaxPerformReframe",
                method: "POST",
                data: { materialCode: materialCode, reframeData: reframeData },
                success: function(data) {
                    $('#requestFeedback').html(data);
                    displayComment();
                    document.getElementById('userRequestInput').value = ''; //delete comment from input
                    
                    updateCommentStatusForWriter(materialCode);
                    
                    displayCommentNumberToWriter(materialCode);
                }
            });

        // } else {
            // alert(reframeData);
            // requestFeedback.classList.add("danger-msg"); //add a class
            // $('#requestFeedback').html('Your message is required.'); //display a message

        // }

    });


