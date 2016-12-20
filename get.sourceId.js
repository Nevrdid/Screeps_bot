

var getSourceId = {
    run:function(creep){
        
        var WL= Memory.whiteList;
        
        for(var R in WL){
            
            if(WL[R]=="Ready" & Game.rooms[R] != undefined){
                
                var Srcs = Memory.Rooms[R].S
                
                
                for(var source in Srcs){
                    let Places = Srcs[source]['Places'];
                    
                    let harvestersOn = _.filter(Game.creeps, (creep) => creep.memory.role === "harvester"
                        && creep.memory.targetId === Srcs[source].id).length;
                    
                    if(harvestersOn < Places){
                        
                        if(creep){
                            creep.memory.targetId = Srcs[source].id;
                            creep.memory.destRoom = R;
                            creep.say("Dest : " + R);
                            return  "";
                        }
                        else{
                            return Srcs[source].id;
                        }
                        
                        
                        
                    }
                    
                }
                    
                
               
            }
        }
        
    }
};

module.exports = getSourceId;