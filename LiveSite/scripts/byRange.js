function getSearchResults(minEnergy, maxEnergy, minDanceability, maxDanceability, minLiveness, maxLiveness, selectedDuration) {	
	selectedDuration = selectedDuration * 60
	api_key = 'BM2P96SJVHMHJHKHP'
	var url_string = 'http://developer.echonest.com/api/v4/song/search?api_key=BM2P96SJVHMHJHKHP&min_energy='+minEnergy+'&max_energy='+maxEnergy+'&min_danceability='+minDanceability+'&max_danceability='+maxDanceability+'&min_liveness='+minLiveness+'&max_liveness='+maxLiveness+'&results=100&bucket=tracks&bucket=id:spotify&bucket=audio_summary'
	playlist3 = {}
	$.ajax({
      	url:url_string,    
      	success: function(json){
            // Hide loading indicator
            hideLoadingIndicator();
	        len=json.response.songs.length; 
	        d=0;
	        for(var i = 0; i<len; i++) {
	        	try{
	        		duration = json.response.songs[i].audio_summary.duration       	        		
					if(json.response.songs[i].tracks.length > 0 && d < selectedDuration){						
						d += duration
						playlist3[json.response.songs[i].tracks[0].foreign_id] = {
							artist: json.response.songs[i].artist_name,
							title: json.response.songs[i].title
						}
					}  							
	        	}
	        	catch(err){
	        		console.log("Error message = " + err.message)
                    
	        	}
	        }
	        if (Object.keys(playlist3).length == 0) {
				$('#useCaseThreeDiv').html("Sorry, there is no result for this search.");
				$('#useCaseThreeDiv').trigger( "isempty" );
			} else {
				widget3 = false
		        $('#useCaseThreeDiv').html("");
				$('#useCaseThreeDiv').append("<ul>");
				for (spot in playlist3) {
					if (!widget3) {
						$('#u258').html('<iframe src="https://embed.spotify.com/?uri=' + spot + '" width="250" height="380" frameborder="0" allowtransparency="true"></iframe>')
						widget3 = true
					}
					$('#useCaseThreeDiv').append("<div class='myresult'><li data-ref=" + spot + ">" + playlist3[spot]['title'] + ", " + playlist3[spot]['artist'] + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></li></div>")
				}
				$('#useCaseThreeDiv').append("</ul>");
				$('#useCaseThreeDiv').trigger( "isnotempty" );
			}
     	}
    });     
}