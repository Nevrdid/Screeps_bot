var roleMeca = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var route=[]
        
        if(creep.memory.repairing){
            
            
            if(creep.room.name == creep.memory.destRoom){
                var Allies = creep.room.find(FIND_MY_CREEPS)
                for(var All in Allies){
                    if(Allies[All].hits<0.75*Allies[All].hitsMax){
                        if(creep.heal(Allies[All]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Allies[All].pos);
                        }
                        break
                    }
                    else{
                
                        creep.moveTo(Math.floor(50*Math.random()),Math.floor(50*Math.random()));
                    }
                }
            }
            else{
                
                route = Game.map.findRoute(creep.room,creep.memory.destRoom,{
                    routeCallback(roomName){
                        if(roomName == 'E79S43') {	// avoid this room			
    			            return Infinity;
    		            }
    	            	return 1;
                    }
                });
            
            }
        }
        else{
            route = Game.map.findRoute(creep.room,Game.spawns["First"].room.name,{
                routeCallback(roomName){
                    if(roomName == 'E79S43') {	// avoid this room			
			            return Infinity;
		            }
	            	return 1;
                }
            });
            
        };
    
        if(route.length>0){
            var exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit);
        }
        
        
    }
};

module.exports = roleMeca;