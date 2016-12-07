var getSourceId = {
    run:function(creep){
        let Roo = creep.memory.destRoom 
        if(Roo != "" && Memory.whiteList[Roo] == "Ready"){
                    let sourcesIn = Game.rooms[Roo].find(FIND_SOURCES);
                    
                    
                    let source = creep.pos.findClosestByRange(sourcesIn)
                    if(source != undefined){
                            
                        creep.memory.targetId = source.id;
                        creep.say("Dest : " + source.room.name);
                    
                    }
                    else{
                        creep.memory.targetId = sourcesIn[0].id;
                        creep.say("Dest : " + sourcesIn[0].room.name);
                    }
                    
                   
                
            
        }
        else{
    
    
            var WL= Memory.whiteList;
            
            for(var R in WL){
               if(WL[R]=="Ready" & Game.rooms[R] != undefined){
                    
                    let sourcesIn = Game.rooms[R].find(FIND_SOURCES)
                    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
                    let harvestersIn = _.filter(harvesters, (creep) => creep.memory.destRoom == R).length;
                    
                    
                    if(harvestersIn <= Memory.creepsLimits[R][0]){
                        let min = [100,""]
                        for(var source in sourcesIn){
                            
                            let harvestersOn = _.filter(Game.creeps, (creep) => creep.memory.targetId == sourcesIn[source].id).length;
                            if(harvestersOn < min[0] && sourcesIn[source].energy>=creep.carryCapacity){
                                min[0]=harvestersOn;
                                min[1]=sourcesIn[source].id;
                            }
                        }
                        creep.memory.targetId = min[1];
                        creep.memory.destRoom = R;
                        creep.say("Dest : " + R);
                        
                        break;
                    }
                   
                }
            };
            
            /**
            if(creep.memory.destRoom == ""){
                let rand = Math.floor(Math.random()*5);
                let I = 0;
                for(var R in WL){
                    
                    if(I == rand){
                        
                        creep.memory.destRoom = R
                        break;
                    }
                    I++
                    
                }
                    
            }
            **/
        }
            
    
    }
};

module.exports = getSourceId;