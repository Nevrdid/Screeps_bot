var roleDefensetemp = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var route=[]
        
        if(creep.memory.defensing){
            if(creep.ticksToLive<50 || creep.hits<25){
                Memory.whiteList[creep.room.name]="WtMaper";
                creep.memory.role="";
                creep.memory.maping=false;
            }
            else{
                
                route = Game.map.findRoute(creep.room.name,creep.memory.destRoom,{
                    routeCallback(roomName){
                        if(roomName == 'E43S78') {	// avoid this room			
    			            return Infinity;
    		            }
    	            	return 1;
                    }
                });
            
            }
        }
        else{
            route = Game.map.findRoute(creep.room.name,Game.spawns["First"].room.name,{
                routeCallback(roomName){
                    if(Memory.whiteList[roomName] == 'Closed') {	// avoid this room			
			            return Infinity;
		            }
	            	return 1;
                }
            });
            
        }
        
        creep.memory.route = route;
        
        if(route.length>0){
            
            let exit = creep.pos.findClosestByRange(route[0].exit);
            if(creep.moveTo(exit) !=  OK){
                PathFinder.use(true);
                    let Next = PathFinder.search(creep.pos,{pos: exit, range: 0}).path[0]
                PathFinder.use(false);
                            
                creep.move(creep.pos.getDirectionTo(Next))
                            
            };
        }
        else{
            creep.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random() * 50))
        }
        
        
    }
};

module.exports = reoleDefenseTemp;