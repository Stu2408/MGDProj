/**
 * Created by Tyrion on 18/03/2016.
 */


var fb = new Firebase("https://switchboardmgd.firebaseio.com/"),
    locations = { },
    result_box = document.getElementById("result");
if (fb) {
    // This gets a reference to the 'location" node.
    var fbLocation = fb.child("/location");
    // Now we can install event handlers for nodes added, changed and removed.
    fbLocation.on('child_added', function(sn){
        var data = sn.val();
        console.dir({'added': data});
        locations[sn.key()] = data;
       //showLocations();
    });
    fbLocation.on('child_changed', function(sn){
        var data = sn.val();
        locations[sn.key()] = data;
        console.dir({'moved': data})
       // showLocations();
    });
    fbLocation.on('child_removed', function(sn){
        var data = sn.val();
        delete locations[sn.key()];
        console.dir(({'removed': data}));
      //  showLocations();
    });
}

function randName(){
    var i = 0;
    while(getKey(i)){
        i++;
    }
    return i;
}

function getKey(name){
    var loc;
    for(loc in locations){
        if(locations[loc].player === name){
            return loc;
        }
    }
    return null;
}

function addLocation(name){
    //to prevent a duplicate name occurring
    if(getKey(name)) return;
    //name is valid, continue to add it
    fb.child("/location").push({
        player: name,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err){
        if(err) console.dir(err);
    });
}

function updateLocation(ref, name){
    fb.child("/location/" + ref).set({
        player: name,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err) {
        if(err) {
            console.dir(err);
        }
    });
}

function removeLocation(ref){
    fb.child("/location/" +ref).set(null, function(err){
        if(err) console.dir(err);
    });
}

/*document.getElementById("canvas").onmouseup = function(evt) {
    var cell_loc = getCellCoords(evt), x, y, name1;
    //var x, y, name;
    name = document.getElementById('name1').value;
    x = evt.clientX;
    y = evt.clientY;
    if(!getKey1(name))
        addLocation1(name, x, y); //cell_loc.col, cell_loc.row)//
    else
        updateLocation1(getKey1(name), name, x, y); //cell_loc.col, cell_loc.row);//
}*/
/*    document.getElementById("post").addEventListener("click", function() {
 var x, y, name;
 name = document.getElementById('name').value;
 x = document.getElementById('x').value;
 y = document.getElementById('y').value;
 if(!getKey(name))
 addLocation(cell_loc.col, cell_loc.row);
 else
 updateLocation(getKey(player.name), player.name, cell_loc.col, cell_loc.row);
 });*/

var board, s1,s2,s3,s4,s5, player;

function board(){

}

board.prototype.load = function(img){
    this.image = new Image();
    this.image.src = img;
}


document.getElementById("enter1").addEventListener("click", function(){
//document.getElementById("canvas").onmouseup = function(evt) {
    var name;
    name = randName();
    if(name < 6){
        if(!getKey(name)){
            addLocation(name);
        }
        else
            updateLocation(getKey(name), name); //cell_loc.col, cell_loc.row);//
    }
    else // if name > 6
    {
        console.log("Player failed to join the game as game is full");
        alert("Game is full!")
    }
});


/*function formatPlayerInfo(location){
    "use strict";
    var info = location + ":", loc = locations[location];
    info += loc.player + loc.timestamp + "\n";
   return info;
}*/
/*

function showLocations(){
    "use strict";
    var loc, info = "";
    for(loc in locations){
        info += formatPlayerInfo(loc);
    }
    result_box.innerText = info;
}
*/

document.getElementById("exit").addEventListener("click", function(){
    var name;
    name = document.getElementById('name').value;
    removeLocation(getKey(name));
});