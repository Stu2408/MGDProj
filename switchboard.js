/**
 * Created by Tyrion on 18/03/2016.
 */

var NUM_COLS,               // number of tiles across
    NUM_ROWS,               // number of tiles down
    TILE_SIZE = 16,         // tiles are square 16x16 - change if needed
    tileSet,                // main object to manage tiles
    context,                // ...and its 2D drawing context
    //SERVICE_URL = "http://mcm-game-server.appspot.com",
    players,                // Reference to the list of players
    SERVICE_URL = "http://localhost:11080";

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
        showLocations();
    });
    fbLocation.on('child_changed', function(sn){
        var data = sn.val();
        locations[sn.key()] = data;
        console.dir({'moved': data})
        showLocations();
    });
    fbLocation.on('child_removed', function(sn){
        var data = sn.val();
        delete locations[sn.key()];
        console.dir(({'removed': data}));
        showLocations();
    });
}

function getKey(name1, name2){
    var loc;
    for(loc in locations){
        if(locations[loc].player1 === name1){
            return loc;
        }
    } for(loc in locations){
        if(locations[loc].player2 === name2){
            return loc;
        }
    }
    return null;
}

/*function getCellCoords(e) {
    var x = e.pageX - canvas.offsetLeft,
        y = e.pageY - canvas.offsetTop;

    x = Math.floor(x / TILE_SIZE);
    y = Math.floor(y / TILE_SIZE);
    return {
        col: x,
        row: y
    }
}*/

function addLocation(name1, name2){
    //to prevent a duplicate name occurring
    if(getKey(name1)) return;
    //name is valid, continue to add it
    fb.child("/location").push({
        player1: name1,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err){
        if(err) console.dir(err);
    });
    if(getKey(name2)) return;
    fb.child("/location").push({
        player2: name2,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err){
        if(err) console.dir(err);
    });
}

function updateLocation(ref, name1, name2){
    fb.child("/location/" + ref).set({
        player1: name1,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err) {
        if(err) {
            console.dir(err);
        }
    });
}

function updateLocation(ref, name1, name2){
    fb.child("/location/" + ref).set({
        player1: name1,
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


document.getElementById("enter1").addEventListener("click", function(){
//document.getElementById("canvas").onmouseup = function(evt) {
    var name1;
    name1 = document.getElementById('name1').value;
    if(!getKey(name1))
        addLocation(name1); //cell_loc.col, cell_loc.row)//
    else
        updateLocation(getKey(name1), name1); //cell_loc.col, cell_loc.row);//
});

document.getElementById("enter2").addEventListener("click", function(){
//document.getElementById("canvas").onmouseup = function(evt) {
    var name2;
    name2 = document.getElementById('name2').value;
    if(!getKey(name2))
        addLocation(name2); //cell_loc.col, cell_loc.row)//
    else
        updateLocation(getKey(name2), name2); //cell_loc.col, cell_loc.row);//
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
    var name1, name2;
    name1 = document.getElementById('name1').value;
    removeLocation(getKey(name1));

    name2 = document.getElementById('name2').value;
    removeLocation(getKey(name2));
});