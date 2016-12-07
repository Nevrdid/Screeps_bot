
var getConstrId = require('get.constrId'); 
var pathFind = require('path.find');


var roleBuilder = {
    run: function(creep) {
        
        if(creep.memory.building ) {
            let tar = creep.memory.targetId
            let O = Game.getObjectById(tar)
            if(O != undefined){
                
                if( O.hits == O.hitsMax && O.progress == 0){
                    getConstrId.run(creep);
                }
                
                if(creep.build(O) != OK){
                    if(creep.upgradeController(O) != OK){
                        if(creep.repair(O) != OK ){
                        
                            var Path = pathFind.run(creep);
                                
                            if(Path[0] == undefined){
                                
                                getConstrId.run(creep);
                                
                            }
                            else{
                                creep.move(Path[0].direction);
                            }
                        
                        }
                    }
                }
            }
            else{
               getConstrId.run(creep); 
            }
            
            
        }
        else {
            var route = Game.map.findRoute(creep.room,Game.spawns["First"].room.name,{
                routeCallback(roomName){
                    if( roomName == 'E79S43') {	// avoid this room			
			            return Infinity;
		            }
	            	return 1;
                }
            });
            if(route.length>0){
                var exit = creep.pos.findClosestByRange(route[0].exit);
                if(creep.moveTo(exit) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: exit, range: 0}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
            }
            else if(Memory.waitNewCreep <= 1 ){
                var targets = Game.spawns["First"].room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy >= 0.8*structure.energyCapacity ;
                        }
                });
                for(var target in targets){
                    if(creep.withdraw(targets[target],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[target]) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: targets[target].pos, range: 1}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
                        break;
                    };
                };
            }
            else{
                creep.move(creep.pos.getDirectionTo(Math.floor(Math.random()*50),Math.floor(Math.random()*50)));
            }
        };
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.moving = true;
            creep.memory.targetId = "";
            creep.memory.destRoom = "";
            creep.say('emptyCargo');
        }
        else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.moving = true;
            creep.memory.building = true;
            
            creep.memory.destRoom = "";
            creep.say('building');
            getConstrId.run(creep);
        }
        
    }
};

module.exports = roleBuilder;