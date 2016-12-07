var roleDefense = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var route=[]
        /**
        if(creep.ticksToLive<100){
            
            if(Game.spawns.First.renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns.First);
            }
        }
        
        else{ **/
            if(creep.memory.defensing){
                
                
                if(creep.room.name == creep.memory.destRoom  && !creep.memory.pause){
                    var Ennemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    var Structur = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if(!Ennemy && !Structur ){
                        creep.moveTo(Math.floor(50*Math.random()),Math.floor(50*Math.random()));
                    }
                    else if(Ennemy){
                        
                        if(creep.attack(Ennemy) == ERR_NOT_IN_RANGE && !creep.memory.pause){
                            creep.moveTo(Ennemy.pos);
                        };
                    }
                    else if(Structur){
                        if(creep.attack(Structur) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Structur.pos);
                        };
                        
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
        /**}**/
        
        
    }
    
};

module.exports = roleDefense;