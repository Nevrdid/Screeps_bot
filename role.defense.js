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
                    var Target = creep.pos.findClosestByRange([Ennemy,Structur]);
                    if(!creep.room.my){
                        var Wall = creep.room.find(FIND_STRUCTURES)
                        let Walls = _.filter(Wall, (structure) => structure.structureType === STRUCTURE_WALL);
                        let W =creep.pos.findClosestByRange(Walls );
                        let M = _.min(Walls, (wall) => wall.hits )
                        
                        Target = creep.pos.findClosestByRange([Target,M,W]);
                    }
                    
                    if(!Ennemy && !Structur && !Wall /**&& Controller.owner == undefined**/ ){
                        creep.moveTo(Game.flags[creep.room.name].pos);
                    }
                    else if (Target && Target.owner.username != 'Spedwards'){
                        
                        if(creep.attack(Target) == ERR_NOT_IN_RANGE && !creep.memory.pause){
                            creep.moveTo(Target.pos);
                        };
                    }
                        
                    /**
                    else if (Controller){
                        if(creep.attack(Controller)== ERR_NOT_IN_RANGE && !creep.memory.pause){
                            creep.moveTo(Controller.pos);
                        };
                    }**/
                    
                    
                }
                else{
                    
                    route = Game.map.findRoute(creep.room,creep.memory.destRoom,{
                        routeCallback(roomName){
                            if(Memory.whiteList[roomName] == 'Closed') {	// avoid this room			
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
                        if(Memory.whiteList[roomName] == 'Closed') {	// avoid this room			
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