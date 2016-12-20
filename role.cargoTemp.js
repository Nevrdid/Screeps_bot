var pathFind = require('path.findTest');

var roleCargo = {
    run:function(creep) {
        if(!creep.fatigue){
              if(creep.hits != creep.hitsMax ){
                return -50 ;
                
            }
        
            if(creep.memory.emptying){
                let Tar = Game.getObjectById(creep.memory.targetId) 
                if(Tar){
                    if(Tar.energy === Tar.energyCapacity ){
                        Tar = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy < structure.energyCapacity;
                            }
                        });
                        if(Tar){
                           creep.memory.targetId = Tar.id;
                       }
                       
                    }
               
                
                }
                else{
                    Tar = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy < structure.energyCapacity;
                            }
                        });
                        if(Tar){
                           creep.memory.targetId = Tar.id;
                       }
                }
                
                if(!Tar){
                   Tar = Game.spawns['First'].room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy < structure.energyCapacity;
                            }
                        });
                        if(Tar[0]){
                           creep.memory.targetId = Tar[0].id;
                       } 
                }
               
                let Targ = Game.getObjectById(creep.memory.targetId)
                if(creep.transfer(Targ, RESOURCE_ENERGY) != OK){
                    
                    let Path = pathFind.run(creep,1);
                    
                    if(Path){
                        if(creep.move(creep.pos.getDirectionTo(creep.memory.actualPath[creep.memory.PathSteep])) == OK){
                            creep.memory.PathSteep+=1;
                        }
                        else{
                            delete creep.memory.actualPath;
                        };
                    }
                    
                    
                }
                
                if(creep.carry.energy == 0){
                    creep.memory.emptying = false;
                    delete creep.memory.actualPath;
                    creep.memory.destRoom = "";
                    creep.say('filling');
                }
                
            }
            else{
                
                if(creep.memory.harvesterId){
                    let harvester = Game.getObjectById(creep.memory.harvesterId);
                    if(!harvester || harvester.memory.cargo != creep.id){
                        creep.memory.harvesterId = "";
                        let harvester ={};
                    }
                    else if(creep.memory.dropId){
                        
                        
                        let droped = Game.getObjectById(creep.memory.dropId);
                        if(!droped){
                            creep.memory.dropId = "";
                        }
                        
                    
                        
                        if(creep.pickup(Game.getObjectById(creep.memory.targetId)) != OK){
                            let Path = pathFind.run(creep,1);
                    
                            if(Path){
                                if(creep.move(creep.pos.getDirectionTo(creep.memory.actualPath[creep.memory.PathSteep])) != OK){
                                    creep.memory.PathSteep+=1;
                                }
                                else{
                                    delete creep.memory.actualPath;
                                };
                            }
                            
                        }
                    }
                    else if(harvester){
                        
                        let droped = harvester.room.lookForAt(LOOK_ENERGY,harvester)
                        if(droped.length){
                            creep.memory.dropId = droped[0].id;
                            creep.memory.targetId = creep.memory.dropId;
                        }
                        else{
                            creep.memory.targetId = creep.memory.harvesterId;
                            if(harvester.transfer(creep,RESOURCE_ENERGY) != OK){
                                let Path = pathFind.run(creep,1);
                    
                                if(Path){
                                    if(creep.move(creep.pos.getDirectionTo(creep.memory.actualPath[creep.memory.PathSteep])) != OK){
                                        creep.memory.PathSteep+=1;
                                    }
                                    else{
                                        delete creep.memory.actualPath;
                                    };
                                }
                                
                            }
                        }
                    }
                    else{
                        creep.memory.harvesterId="";
                        /**
                        creep.memory.dropId ="";
                        creep.memory.targetId = "";
                        **/
                    }
                        
                    if(creep.carry.energy === creep.carryCapacity){
                        
                        Game.getObjectById(creep.memory.harvesterId).memory.cargo = "";
                        creep.memory.harvesterId="";
                        creep.memory.dropId ="";
                        
                        creep.memory.emptying = true;
                        delete creep.memory.actualPath;
                        
                        creep.memory.targetId = "";
                        creep.memory.destRoom ="";
                        creep.say('emptying');
                    }
                    
                    
                }
                else{
                    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && (creep.memory.cargo === "")
                        /**&&    (creep.carry.energy +  creep.room.lookForAt(LOOK_ENERGY,creep).amount) > 0.8*creep.carryCapacity  **/
                        )
                    let min = [100,""]
                    for(var H in harvesters){
                        let carging = _.filter(Game.creeps, (creep) => creep.memory.role ==="cargo" && creep.memory.targetId === harvesters[H].id).length
                        if(carging === 0){
                            min[1] = harvesters[H].id;
                            break;
                        }
                        if(carging < min[0]){
                            min[1] = harvesters[H].id;
                        }
                        
                    }
                    let harvester = Game.getObjectById(min[1])
                    let drops = creep.room.find(FIND_DROPPED_ENERGY,{filter: (energ) => { energ.amount > 0.8*creep.carryCapacity}});
                    //let harvester = _.min(harvesters, (harv) => Memory.Rooms[harv.room.name]['S'].id === harv.memory.targetId)
                    if(drops[0]){
                        creep.memory.dropId = drops[0].id;
                        creep.memory.harvesterId = drops[0].id
                        return 1;
                    }
                    if(harvester){
                        creep.memory.harvesterId = min[1];
                  
                        harvester.memory.cargo = creep.id;
                    }
                }
                
                
            } 
        }
    }
    
    
};

module.exports = roleCargo;