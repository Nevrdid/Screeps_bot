
var pathFind = {
     
    run : function (creep){
        var Goal = Game.getObjectById(creep.memory.targetId);
        if(Goal == undefined){
            return -1;
        }
        else{
            goal = Goal.pos;
        };
        if(creep.room.name != Goal.room.name){
            var route = Game.map.findRoute(creep.room,Goal.room.name,{
                routeCallback(roomName){}
            });
     
            goal = creep.pos.findClosestByRange(route[0].exit);
            
        }
        
 
        let ret = creep.room.findPath(creep.pos, goal, {ignoreCreeps: false});
        if(!ret.length ){
            ret = creep.room.findPath(creep.pos, goal, {ignoreCreeps: true});
            
        };
        creep.memory.pathLength = ret.length;
       
        return ret;
    }
 };
 
 module.exports = pathFind;