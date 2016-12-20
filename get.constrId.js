var getConstrId = {
    run:function(creep){
        
            
                
        var WL= Memory.whiteList;
        
        let min = [100,""]
        
        
        for(var R in WL){
           if(WL[R]=="Ready" & Game.rooms[R] != undefined){
                
                let constrsIn = Game.rooms[R].find(FIND_CONSTRUCTION_SITES);
                let structsIn = Game.rooms[R].find(FIND_STRUCTURES, { filter: 
                object => object.hits < 20000 && object.hits <= 0.75 * object.hitsMax });
                
                var Targets = constrsIn.concat(structsIn)
                
                if(creep.room.my && creep.room.controller){
                    Targets = Targets.push(creep.room.controller)
                }
                
                
                let builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
                let buildersIn = _.filter(builders, (creep) => creep.memory.destRoom == R).length;
                    
                for(var constr in Targets){
                    
                    
                    let buildersOn = _.filter(Game.creeps, (creep) => creep.memory.targetId == Targets[constr].id).length;
                    
                    if(buildersOn == 0){
                        creep.memory.targetId = Targets[constr].id;
                        creep.memory.destRoom = R;
                        creep.say("Dest : " + R);
                        return 1;
                    }else if(buildersOn < min[0]){
                        min[0]=buildersOn;
                        min[1]=Targets[constr].id;
                    }
                }
            }
        };
        
        
    }
};

module.exports = getConstrId;