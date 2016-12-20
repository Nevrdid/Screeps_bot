
var pathFind = {
     
    run : function (creep){
        
        var Goal = Game.getObjectById(creep.memory.targetId);
        if(Goal === null){
            return "";
        }
        else{
            goal = Goal.pos;
        };
        
        
        
        if(creep.room.name !== Goal.room.name){
            
            /**if(creep.memory.route === undefined){
                creep.memory.
                **/
                var route = Game.map.findRoute(creep.room,goal,{
                    routeCallback(roomName){
                        if(Memory.whiteList[roomName] === "Closed" ){
                            return Infinity
                        }
                        return 1
                    }
                });
                /**
                creep.memory.routeSteep = 0;
            }
            else{
                goal = creep.pos.findClosestByPath(creep.memory.route[creep.memory.routeSteep].exit);
                if(creep.room !=creep.memory.oldRoom && creep.room != creep.memory.route[creep.memory.routeSteep-1]){
                    creep.memory.routeSteep +=1;
                }
            }
            **/
            if(route.length){
                goal =  creep.pos.findClosestByPath(route[0].exit);
            }
            
            
        }
        /**
        else{
            delete creep.memory.route;
        }
        **/
        creep.memory.oldRoom = creep.room;
            
        var ret = creep.room.findPath(creep.pos, goal, {ignoreCreeps: true});
        
        if(ret[0] != undefined){
            let R = 0;
            while(R < ret.length ){
                
                if(creep.room.lookForAt(LOOK_CREEPS,ret[R].x,ret[R].y).length){
                    
                    ret = creep.room.findPath(creep.pos, goal, {ignoreCreeps: false});
                     
                    break;
                }
                R++
            }
            return Room.serializePath(ret);
            
        }
        else{
            ret = creep.room.findPath(creep.pos, goal, {ignoreCreeps: true});
            if(ret[0] != undefined){
                return Room.serializePath(ret);
            }
        }
        
       
        return ;
    }
 };
 
 module.exports = pathFind;