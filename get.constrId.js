var getConstrId = {
    run:function(creep){
        let Roo = creep.memory.destRoom 
        if(Roo != "" && Memory.whiteList[Roo]=="Ready"){
            
                let constrsIn = Game.rooms[Roo].find(FIND_CONSTRUCTION_SITES);
                let structsIn = Game.rooms[Roo].find(FIND_STRUCTURES, { 
                    filter: object => object.hits < 0.5 * object.hitsMax });
                
                constrsIn = constrsIn.concat( structsIn.concat( [creep.room.controller] ) )
                /**
                console.log(constrsIn[0].room.name)**/
                
                
                let constr = creep.pos.findClosestByRange(constrsIn)
                if(constr != undefined){
                        
                    creep.memory.targetId = constr.id;
                    creep.say("Dest : " + constr.room.name);
                
                }
                    
            
            
        }
        else{
            
                
            var WL= Memory.whiteList;
            
            for(var R in WL){
               if(WL[R]=="Ready" & Game.rooms[R] != undefined){
                    
                    let constrsIn = Game.rooms[R].find(FIND_CONSTRUCTION_SITES);
                    let structsIn = Game.rooms[R].find(FIND_STRUCTURES, { filter: 
                    object => object.hits < 0.5 * object.hitsMax });

                   
                    constrsIn = constrsIn.concat(structsIn).push(creep.room.controller)
                    
                    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
                    let buildersIn = _.filter(builders, (creep) => creep.memory.destRoom == R).length;
                    let min = [100,""]
                    if(buildersIn <= Memory.creepsLimits[R][2]){
                        
                        for(var constr in constrsIn){
                            
                            let buildersOn = _.filter(Game.creeps, (creep) => creep.memory.targetId == constrsIn[constr].id).length;
                            if(buildersOn < min[0]){
                                min[0]=buildersOn;
                                min[1]=constrsIn[constr].id;
                            }
                        }
                    
                    
                        creep.memory.targetId = min[1];
                        creep.memory.destRoom = R;
                        creep.say("Dest : " + R);
                        
                        break;
                    }
                    
                   
                }
            };
        }
    }
};

module.exports = getConstrId;