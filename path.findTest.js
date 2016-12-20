
var pathFind = {
     
    run : function (creep,Range){
        
        
        if(creep.memory.actualPath){
            if(creep.memory.actualPath.length){
            
                if(creep.memory.PathSteep === 0){
                    creep.memory.PathSteep +=1;
                }else{
                    if(creep.pos.isEqualTo(creep.memory.actualPath[creep.memory.PathSteep-1])){
                        creep.memory.PathSteep +=1;
                    }
                    else{
                        creep.memory.PathSteep -=1;
                    }
                }
                return true;
            }
            
        }
            
            
        var Goal = Game.getObjectById(creep.memory.targetId);
    
        if(Goal === null){
            return false;
        }
        else{
            goal = Goal.pos;
        };
        
        var ret = PathFinder.search(creep.pos, {pos : goal, range : Range},{
                plainCost: 2,
                swampCost: 10,
        	  
                roomCallback: function(roomName) {
        
                    let room = Game.rooms[roomName];
                    if (!room) return;
                    
                    let costs = new PathFinder.CostMatrix;
            
                    room.find(FIND_STRUCTURES).forEach(function(structure) {
                        if (structure.structureType === STRUCTURE_ROAD) {
                            
                            costs.set(structure.pos.x, structure.pos.y, 1);
                            
                        } else if(structure.structureType !== STRUCTURE_CONTAINER && 
                                 (structure.structureType !== STRUCTURE_RAMPART || !structure.my)) {
                            costs.set(structure.pos.x, structure.pos.y, 0xff);
                        }
                    });
            
                    room.find(FIND_CREEPS).forEach(function(creep) {
                      costs.set(creep.pos.x, creep.pos.y, 0xff);
                });
        
                return costs;
            },
        });
        
        if(ret.path.length ){
            
            creep.memory.actualPath = ret.path;
            
            creep.memory.PathSteep = 0;
        
            return true;
        }
        
       
        return false;
    }
 };
 
 module.exports = pathFind;