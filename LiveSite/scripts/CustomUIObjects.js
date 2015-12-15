// JS FILE FOR JQUERY UI OBJECTS
// Team Spotifier


// current duration for scenario 1
var currentDuration1 = "15";

// current duration for scenario 2
var currentDuration2 = "15";

// current duration for scenario 3
var currentDuration3 = "15";

// current min energy for scenario 3
var currentMinEnergy = "0";

// current max energy for scenario 3
var currentMaxEnergy = "1";

// current min danceability for scenario 3
var currentMinDanceability = "0";

// current max danceability for scenario 3
var currentMaxDanceability = "1";

// current min liveness for scenario 3
var currentMinLiveness = "0";

// current max liveness for scenario 3
var currentMaxLiveness = "1";




// globalPL
globalPL = {}

/*
/       JQUERY Scenario 1
*/
function durationSlider1Changed(event, ui){
    
    //alert("Value changed to:"+ui.value);
    
    // Replace minute display
    $('#u221-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u221-4\">'+ui.value+' mins</div>'); 
    
    // Assign new slider duration to global variable
    currentDuration1 = ui.value;
};



/*
/       JQUERY Scenario 2
*/
function durationSlider2Changed(event,ui){
    
    //alert("S2 value changed to:"+ui.value);
    
    // Replace minute display
    $('#u656-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u656-4\">'+ui.value+' mins</div>');
    
    
    // Assign the new duration to the global variable
    currentDuration2 = ui.value;
    
};



/*
/       JQUERY Scenario 3
*/
// Sliders for different user provided params
function energySliderChanged(event,ui){
    currentMinEnergy = ui.values[0];
    currentMaxEnergy = ui.values[1];
    // Replace energy level display
    $('#u664-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u664-4\">'+ui.values[0]+' min, '+ui.values[1]+' max</div>');
    
    // alert("Energy value changed, low value: "+ui.values[0] +" high value: " +ui.values[1]);   
};


function danceabilitySliderChanged(event,ui){
    currentMinDanceability = ui.values[0];
    currentMaxDanceability = ui.values[1];
    // Replace dancability level display
    $('#u666-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u666-4\">'+ui.values[0]+' min, '+ui.values[1]+' max</div>');
    // alert("Loudness value changed, low value: "+ui.values[0] +" high value: " +ui.values[1]);   
};


function livenessSliderChanged(event,ui){
    currentMinLiveness = ui.values[0];
    currentMaxLiveness = ui.values[1];
    
    $('#u667-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u667-4\">'+ui.values[0]+' min, '+ui.values[1]+' max</div>');
    
    // alert("Tempo value changed, low value: "+ui.values[0] +" high value: " +ui.values[1]);   
};

// Duration slider without range
function durationSlider3Changed(event,ui){
    
    // Replace minute display
    $('#u663-4').replaceWith('<div class=\"clearfix grpelem\" id=\"u663-4\">'+ui.value+' mins</div>');
    
    // Assign the new duration to the global variable
    currentDuration3 = ui.value;
}



/*
/       Setup up event listeners for 
/       the buttons of each scenario
*/
$(document).ready(function(){

    // Hide all buttons and widgets
    hideAll();

    // Resume state
    resumeState();
    
    // Activate listeners for scenario 1
    scenario1Listeners();
    
    // Activate listeners for scenario 2
    scenario2Listeners();
    
    // Activate listeners for scenario 3
    scenario3Listeners();
    
    // Activate listeners for "Manage Playlists"
    manageListeners();

});



/*
/       Setup up state saving when closing window
*/
$( window ).unload(function() {
    saveState()
});



/*
/       Start and resume state
*/
function saveState() {
    localStorage['globalPL'] = JSON.stringify(globalPL)
    return true
}

function resumeState() {
    if (typeof localStorage['globalPL'] !== "undefined") {
        console.log('ok' + localStorage['globalPL'])
        globalPL = JSON.parse(localStorage['globalPL'])
    }
    return true
}

/*
/       Hide all buttons and widgets on start
*/
function hideAll() {
    
    // Hide the 3 widgets
    $('#u185').hide()
    $('#u256').hide()
    $('#u258').hide()
    
    // Hide the 6 buttons
    // scenario 1
    $('#buttonu212').hide()
    $('#buttonu228').hide()
    // scenario 2
    $('#buttonu651').hide()
    $('#buttonu646').hide()
    // scenario 3
    $('#buttonu673').hide()
    $('#buttonu678').hide()

    // Hide the 3 search results
    $('#u166').hide()
    $('#u250').hide()
    $('#useCaseThreeDiv').hide()
    
    // Hide the "search results" text boxes
    // Scenario 1 text
    $('#u184-4').hide()
    // Scenario 2 text
    $('#u355-4').hide()
    // Scenario 3 text
    $('#u621-4').hide()

    // Clean all inputs
    $('input').val('')

}



/*
/       Scenario 1 Event Listeners
*/
function scenario1Listeners(){

    // If div is empty, hide
    $('#u166').on("isnotempty", function() {
        // Show the results and results text
        $('#u166').show()
        $('#u184-4').show()
        // Show the 2 buttons
        $('#buttonu212').show()
        $('#buttonu228').show()
        // Show the widget
        $('#u185').show()

    });
    $('#u166').on("isempty", function() {
        // Show the results and results text
        $('#u166').show()
        $('#u184-4').show()
        // Hide the 2 buttons
        $('#buttonu212').hide()
        $('#buttonu228').hide()
        // Hide the widget
        $('#u185').hide()
    });

     // Firing off a search from input
    $( "#buttonu199" ).click(function() {
        artist = $('#bobInput').val()
        duration = currentDuration1
        createPlaylistArtist(artist, duration)
    });
    
    // Changing the Play widget when clicking on song
    $('#u166').on("click", "li", function() {
        console.log($(this).data("ref"))
        $('#u185').html('<iframe src="https://embed.spotify.com/?uri=' + $(this).data("ref") + '" width="250" height="380" frameborder="0" allowtransparency="true"></iframe>')
    });

    // Removing song from playlist when clicking on remove
    $('#u166').on("click", "span", function() {
        spot = $(this).parent().data("ref")
        delete playlist1[spot]
        $(this).parent().parent().hide()
        if (Object.keys(playlist1).length == 0) {
            $('#u166').trigger( "isempty" );
        }
    });

    // Filling in first dropdown based on globalPL
    $('#u294').on("click", function() {
        $('#u322').find("#scenario1PlaylistSelector").html("")
        for (pl in globalPL) {
            $('#u322').find("#scenario1PlaylistSelector").append("<option value=" + pl + ">" + pl + "</option>")
        }
    });

    // Blank the content of the input field
    $('#u335').on("click", function() {
        $('#newPlayListInput1').val('');
    });
    
    // For saving song selection to an existing playlist
    $( "#s1ExistingSaveButton" ).click(function() {
        name = $('#u322').find("#scenario1PlaylistSelector").val()
        globalPL[name] = $.extend(globalPL[name], playlist1);
        alert( "Playlist added successfully!" );
    });
    
    // For saving a new playlist to the local storage location of playlists
    $( "#s1NewPlaylistButton" ).click(function() {
        name = $('#newPlayListInput1').val()
        if (name in globalPL || name == '') {
            alert('You must enter a (non-existing) name for your playlist')
        } else {
            globalPL[name] = playlist1
            alert('Playlist added successfully!')
        }
    });
    
};// END SCENARIO 1 LISTENERS



/*
/       Scenario 2 Event Listeners
*/
function scenario2Listeners(){

    // If div is empty, hide
    $('#u250').on("isnotempty", function() {
        // Show the results
        $('#u250').show()
        $('#u355-4').show()
        // Show the 2 buttons
        $('#buttonu651').show()
        $('#buttonu646').show()
        // Show the widget
        $('#u256').show()

    });
    $('#u250').on("isempty", function() {
        // Show the results
        $('#u250').show()
        $('#u355-4').show()
        // Hide the 2 buttons
        $('#buttonu651').hide()
        $('#buttonu646').hide()
        // Hide the widget
        $('#u256').hide()
    });
    
     // Firing off a search from input
    $( "#buttonu359" ).click(function() {
        artist = $('#artistInput').val()
        song = $('#songInput').val()
        duration = currentDuration2
        createPlaylistSongs(song, artist, duration)
    });

    // Changing the Play widget when clicking on song
    $('#u250').on("click", "li", function() {
        console.log($(this).data("ref"))
        $('#u256').html('<iframe src="https://embed.spotify.com/?uri=' + $(this).data("ref") + '" width="250" height="380" frameborder="0" allowtransparency="true"></iframe>')
    });

    // Removing song from playlist when clicking on remove
    $('#u250').on("click", "span", function() {
        spot = $(this).parent().data("ref")
        delete playlist2[spot]
        $(this).parent().parent().hide()
        if (Object.keys(playlist2).length == 0) {
            $('#u250').trigger( "isempty" );
        }
    });

    // Filling in first dropdown based on globalPL
    $('#u500').on("click", function() {
        $('#u514').find("#scenario2PlaylistSelector").html("")
        for (pl in globalPL) {
            $('#u514').find("#scenario2PlaylistSelector").append("<option value=" + pl + ">" + pl + "</option>")
        }
    });

    // Blank the content of the input field
    $('#u542').on("click", function() {
        $('#newPlayListInput2').val('');
    });
   
    // For saving song selection to an existing playlist
    $( "#s2ExistingSaveButton" ).click(function() {
        name = $('#u514').find("#scenario2PlaylistSelector").val()
        globalPL[name] = $.extend(globalPL[name], playlist2);
        alert( "Playlist added successfully!" );
    });
    
    // For saving a new playlist to the local storage location of playlists
    $( "#s2NewPlaylistButton" ).click(function() {
        name = $('#newPlayListInput2').val()
        if (name in globalPL || name == '') {
            alert('You must enter a (non-existing) name for your playlist')
        } else {
            globalPL[name] = playlist2
            alert('Playlist added successfully!')
        }        
    });
    
};// END SCENARIO 2 LISTENERS



/*
/       Scenario 3 Event Listeners
*/
function scenario3Listeners(){

    // If div is empty, hide
    $('#useCaseThreeDiv').on("isnotempty", function() {
        // Show the results
        $('#useCaseThreeDiv').show()
        $('#u621-4').show()
        // Show the 2 buttons
        $('#buttonu673').show()
        $('#buttonu678').show()
        // Show the widget
        $('#u258').show()

    });
    $('#useCaseThreeDiv').on("isempty", function() {
        // Show the results
        $('#useCaseThreeDiv').show()
        $('#u621-4').show()
        // Hide the 2 buttons
        $('#buttonu673').hide()
        $('#buttonu678').hide()
        // Hide the widget
        $('#u258').hide()
    });

    // Firing off a search from input
    $( "#buttonu615" ).click(function() {        
        selectedDuration = currentDuration3
        minEnergy = currentMinEnergy / 100
        maxEnergy = currentMaxEnergy / 100
        minDanceability = currentMinDanceability / 100
        maxDanceability = currentMaxDanceability / 100
        minLiveness = currentMinLiveness / 100
        maxLiveness = currentMaxLiveness / 100
        getSearchResults(minEnergy, maxEnergy, minDanceability, maxDanceability, minLiveness, maxLiveness, selectedDuration)
        //getSearchResults(0, 1, 0, 1, 0, 1, selectedDuration)
    });

    // Changing the Play widget when clicking on song
    $('#useCaseThreeDiv').on("click", "li", function() {
        console.log($(this).data("ref"))
        $('#u258').html('<iframe src="https://embed.spotify.com/?uri=' + $(this).data("ref") + '" width="250" height="380" frameborder="0" allowtransparency="true"></iframe>')
    });

    // Removing song from playlist when clicking on remove
    $('#useCaseThreeDiv').on("click", "span", function() {
        spot = $(this).parent().data("ref")
        delete playlist3[spot]
        $(this).parent().parent().hide()
        if (Object.keys(playlist3).length == 0) {
            $('#useCaseThreeDiv').trigger( "isempty" );
        }
    });

    // Filling in first dropdown based on globalPL
    $('#u555').on("click", function() {
        $('#u564').find("#scenario3PlaylistSelector").html("")
        for (pl in globalPL) {
            $('#u564').find("#scenario3PlaylistSelector").append("<option value=" + pl + ">" + pl + "</option>")
        }
    });

    // Blank the content of the input field
    $('#u542').on("click", function() {
        $('#newPlayListInput2').val('');
    });
   
    // For saving song selection to an existing playlist
    $( "#s3ExistingSaveButton" ).click(function() {
        name = $('#u564').find("#scenario3PlaylistSelector").val()
        globalPL[name] = $.extend(globalPL[name], playlist3);
        alert( "Playlist added successfully!" );
    });
    
    // For saving a new playlist to the local storage location of playlists
    $( "#s3NewPlaylistButton" ).click(function() {
        name = $('#newPlayListInput3').val()
        if (name in globalPL || name == '') {
            alert('You must enter a (non-existing) name for your playlist')
        } else {
            globalPL[name] = playlist3
            alert('Playlist added successfully!')
        }        
    });

};// END SCENARIO 3 LISTENERS



/*
/       "Manage Playlists" Event Listeners
*/
function manageListeners(){

    // Filling in second dropdown based on globalPL
    $('#u393').on("click", function() {
        $('#u408').find('#scenario1PlaylistSelector').html("")
        for (pl in globalPL) {
            $('#u408').find("#scenario1PlaylistSelector").append("<option value=" + pl + ">" + pl + "</option>")
        }
        // Display playlist songs on the right
        playlist = globalPL[$('#u408').find("#scenario1PlaylistSelector").val()]
        $('#managePlaylistDiv').html("")
        $('#managePlaylistDiv').append("<ul>");
        for (spot in playlist) {
            $('#managePlaylistDiv').append("<div class='myresult'><li data-ref=" + spot + ">" + playlist[spot]['title'] + ", " + playlist[spot]['artist'] + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></li></div>")
        }
        $('#managePlaylistDiv').append("</ul>");
    })

    // Display playlist songs on change
    $('#u408').on("change", "#scenario1PlaylistSelector", function() {
        playlist = globalPL[$('#u408').find("#scenario1PlaylistSelector").val()]
        $('#managePlaylistDiv').html("")
        $('#managePlaylistDiv').append("<ul>");
        for (spot in playlist) {
            $('#managePlaylistDiv').append("<div class='myresult'><li data-ref=" + spot + ">" + playlist[spot]['title'] + ", " + playlist[spot]['artist'] + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></li></div>")
        }
        $('#managePlaylistDiv').append("</ul>");
    })

    // Removing song from playlist when clicking on remove
    $('#managePlaylistDiv').on("click", "span", function() {
        spot = $(this).parent().data("ref")
        delete playlist[spot]
        $(this).parent().parent().hide()
    });

    // Action area for deleting playlist
    $('#u639').on("click", function() {
        var retVal = confirm("Do you really want to delete this playlist?");
        if( retVal == true ){
            delete globalPL[$('#u408').find("#scenario1PlaylistSelector").val()]
            $('#u408').find('#scenario1PlaylistSelector').html("")
            for (pl in globalPL) {
                $('#u408').find("#scenario1PlaylistSelector").append("<option value=" + pl + ">" + pl + "</option>")
            }
            // Display playlist songs on the right
            playlist = globalPL[$('#u408').find("#scenario1PlaylistSelector").val()]
            $('#managePlaylistDiv').html("")
            $('#managePlaylistDiv').append("<ul>");
            for (spot in playlist) {
                $('#managePlaylistDiv').append("<div class='myresult'><li data-ref=" + spot + ">" + playlist[spot]['title'] + ", " + playlist[spot]['artist'] + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></li></div>")
            }
            $('#managePlaylistDiv').append("</ul>");
            return true;
        }
        else{
            return false;
        }
    })
    
    // Action area for playing the entire playlist
    $('#u657').on("click", function() {
        alert("play whole playlist button clicked");
        // TODO: Insert actions here for playing playlist
    });

};// END MANAGE PLAYLIST LISTENERS

                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                                 
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                                 
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                                 
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  