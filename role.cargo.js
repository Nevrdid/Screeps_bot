var pathFind = require('path.find');

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
                if(Targ){
                    if(creep.transfer(Targ, RESOURCE_ENERGY) != OK){
                    
                /**
                    if(creep.memory.actualPath){
                        let lastPoint = creep.memory.actualPath[Path.length-1];
                        if((creep.pos.x,creep.pos.y) === (lastPoint.x,lastPoint.y)){
                            creep.memory.actualPath = "";
                            var Path = Room.deserializePath(pathFind.run(creep));   //tester sans
                        }else{
                            var Path = Room.deserializePath(creep.memory.actualPath);
                        }
                    }else{
                        var Path = Room.deserializePath(pathFind.run(creep));
                    }
                    
                **/
                        var Path = pathFind.run(creep);
                                
                                
                        if(Path !== undefined){
                            if(creep.moveByPath(Path)!= OK){
                                creep.moveTo(0,0)
                            };
                            
                        }
                    }
                
                    
                    
                
                    
                    
                }
                else{
                    creep.moveTo(0,0)
                }
                
                if(creep.carry.energy == 0){
                    creep.memory.actualPath="";
                    creep.memory.emptying = false;
                    creep.memory.destRoom = "";
                    creep.say('filling');
                }
                
            }
            else{
                
                if(creep.memory.harvesterId){
                    let harvester = Game.getObjectById(creep.memory.harvesterId);
                    
                    if(creep.memory.dropId){
                        
                        
                        let droped = Game.getObjectById(creep.memory.dropId);
                        if(!droped){
                            creep.memory.dropId = "";
                        }
                        
                    
                        
                        if(creep.pickup(Game.getObjectById(creep.memory.targetId)) != OK){
                            var Path = pathFind.run(creep);
                            
                            
                            if(Path !== undefined){
                                if(creep.moveByPath(Path)!= OK){
                                    creep.moveTo(0,0)
                                };
                                
                            }
                    
                            
                        }
                    }
                    else if(!harvester || harvester.memory.cargo != creep.id){
                        creep.memory.harvesterId = "";
                        let harvester ={};
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
                                var Path = pathFind.run(creep);
                                
                                
                                if(Path !== undefined){
                                    if(creep.moveByPath(Path)!= OK){
                                        creep.moveTo(0,0)
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
                        let Harv = Game.getObjectById(creep.memory.harvesterId);
                        if(Harv){
                            
                            Game.getObjectById(creep.memory.harvesterId).memory.cargo = "";
                        }
                        creep.memory.harvesterId="";
                        creep.memory.dropId ="";
                        
                        creep.memory.actualPath="";
                        
                        creep.memory.emptying = true;
                        
                        creep.memory.targetId = "";
                        creep.memory.destRoom ="";
                        creep.say('emptying');
                    }
                    
                    
                }
                else{
                    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.cargo === "" && creep.memory.Cost
                        /**&&    (creep.carry.energy +  creep.room.lookForAt(LOOK_ENERGY,creep).amount) > 0.8*creep.carryCapacity  **/
                        )
                    let min = [500,""]
                    let minCost = [500,""]
                    
                    let harvester1 = _.min(harvesters, function(harv){
                       return harv.memory.Cost; 
                    });
                    
                    for(var H in harvesters){
                        let carging = _.filter(Game.creeps, (creep) => creep.memory.role ==="cargo" && creep.memory.targetId === harvesters[H].id).length
                        //let costing = 
                        if(carging === 0){
                            min[1] = harvesters[H].id;
                            break;
                        }
                        if(carging < min[0]){
                            min[1] = harvesters[H].id;
                        }
                        
                    }
                    let harvester2 = Game.getObjectById(min[1])
                    
                    var harvester = creep.pos.findClosestByRange([harvester1 , harvester2])
                
                    
                    let drops = creep.room.find(FIND_DROPPED_ENERGY,{filter: (energ) => { energ.amount > creep.carryCapacity}});
                    //let harvester = _.min(harvesters, (harv) => Memory.Rooms[harv.room.name]['S'].id === harv.memory.targetId)
                    if(drops[0]){
                        creep.memory.dropId = drops[0].id;
                        creep.memory.harvesterId = drops[0].id
                        return 1;
                    }
                    else if(harvester != undefined){
                        creep.memory.harvesterId = harvester.id;
                        let Harv = Game.getObjectById(creep.memory.harvesterId);
                        if(Harv){
                            harvester.memory.cargo = creep.id;
                        }
                    }
                
                }
                
            } 
        }
    }
    
    
};

module.exports = roleCargo;