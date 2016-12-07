var createBody = require('create.body');

var fctInit = {
    
    run: function(){
        
        Memory.body = {
            harvester : createBody.run(1,2,2,0),
            upgrader : createBody.run(2,1,1,0),
            builder : createBody.run(2,1,1,0),
            defenser : createBody.run(0,0,2,2),
            meca : [HEAL,MOVE,MOVE],
            harvestnbuild : createBody.run(3,3,3,0)
            
        }
        
        var harvestBody = Memory.bodies["harvester"]
        var Work = _.filter(harvestBody,WORK).length
        var Carry = _.filter(harvestBody,CARRY).length
        var harvestTime = Carry*50 /(2*Work)
        
        
        
        
        Memory.whiteList = {
            E77S39 : "WtMaper",
            E76S39 : "WtMaper",
            E76S38 : "WtMaper"
        }
        Memory.creepsLimits = {
            E77S39 : [8,1,8,0,0,0],
            E76S39 : [8,0,0,5,0,0],
            E76S38 : [0,0,0,0,0,0]
        }
        
        
        
        let harvestersLimit = 0;
        for(var L in Memory.creepsLimits){ harvestersLimit+=Memory.creepsLimits[L][0];  }
        
        let upgradersLimit = 0;
        for(var L in Memory.creepsLimits){ upgradersLimit+=Memory.creepsLimits[L][1];  }
        
        let buildersLimit = 0;
        for(var L in Memory.creepsLimits){ buildersLimit+=Memory.creepsLimits[L][2];  }
        
        let defensersLimit = 0;
        for(var L in Memory.creepsLimits){ defensersLimit+=Memory.creepsLimits[L][3];  }
        
        let mecaLimit = 0;
        for(var L in Memory.creepsLimits){ mecaLimit+=Memory.creepsLimits[L][4];  }
        
        let HnBLimit = 0;
        for(var L in Memory.creepsLimits){ HnBLimit+=Memory.creepsLimits[L][5];  }
        
        Memory.creepsLimitsTotals = [harvestersLimit,upgradersLimit,buildersLimit,defensersLimit,mecaLimit,HnBLimit]
        
        
        var addCreep = function(){
            
        }
        
        Memory.waitingColon = ""

    }
};

module.exports = fctInit;