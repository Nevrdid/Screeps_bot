var createBody = require('create.body');

var registerSources = require('register.sources');

var fctInit = {
    
    run: function(){
        
        Memory.bodies = {
            harvester : {actual : 0,bodies: [createBody.run(1,2,2,0),createBody.run(1,2,2,0),createBody.run(1,2,2,0)]},
            upgrader : createBody.run(2,1,1,0),
            builder : createBody.run(2,1,1,0),
            defenser : createBody.run(0,0,2,2),
            meca : [HEAL,MOVE,MOVE]
            
        }
        
        var harvestBodies = Memory.bodies["harvester"]
        var Bodies = harvestBodies['bodies']
        var Body = Bodies[harvestBodies['actual']]
        
        
        
        var Work = _.filter(Body,WORK).length
        var Carry = _.filter(Body,CARRY).length
        var harvestTime = Carry*50 /(2*Work)
        
        
        if( Memory.Rooms[Game.spawns.First.room.name] === undefined){
            registerSources.run(Game.spawns.First.room.name);
        }
        
        let Roo = Memory.Rooms[Game.spawns.First.room.name]
        
        
        if(Roo){
            let Places = Roo['Places']
            if(Places){
                Memory.Rooms[Game.spawns.First.room.name]['CL'] =  [Places ,1,3,1,0,2*Places];
            }
            else{
                Memory.Rooms[Game.spawns.First.room.name]['CL'] = [0,1,3,0,0,0];
            }
        }
        
        
        Memory.whiteList = {}
        Memory.whiteList[Game.spawns.First.room.name] = "Ready";
        
        let Flags =  Game.flags
        for(var R in Flags){
            if(Memory.Rooms[Flags[R].name]){
                
                let Places = Memory.Rooms[Flags[R].name]['Places']
                let Col = Flags[R].color
                let Creeps = [0,0,0,0,0,0];
                
                if(Places){
                    if(Col === COLOR_WHITE || Col === COLOR_ORANGE){
                        Creeps[0] = Places;
                        Creeps[5] = 2*Places;
                        
                    }
                }
                if(Col === COLOR_RED || Col === COLOR_ORANGE){
                    Creeps[3] = 5;
                }
                
                Memory.Rooms[Flags[R].name]['CL'] =  Creeps;
            }
            else{
                Memory.Rooms[Flags[R].name] = {}
            }
            
            
            
            Memory.whiteList[Flags[R].name]= "WtMaper";
            Memory.Flags = Game.flags;
            
        }
        
        
        
        
        let harvestersLimit = 0;
        let upgradersLimit = 0;
        let buildersLimit = 0;
        let defensersLimit = 0;
        let mecaLimit = 0;
        let cargosLimit = 0;
        
        let Rooms = Memory.Rooms
        for(var L in Rooms){
            harvestersLimit+=Rooms[L]['CL'][0];
            upgradersLimit+=Rooms[L]['CL'][1];
            buildersLimit+=Rooms[L]['CL'][2];
            defensersLimit+=Rooms[L]['CL'][3];
            mecaLimit+=Rooms[L]['CL'][4];
            cargosLimit+=Rooms[L]['CL'][5];
            
            
            
        }
        
        
        Memory.creepsLimitsTotals = [harvestersLimit,upgradersLimit,buildersLimit,defensersLimit,mecaLimit,cargosLimit]
        
        
        

    }
};

module.exports = fctInit;