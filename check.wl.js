var checkWl = {
    
    run: function(){
        
        for(var R in Memory.whiteList){
        
            if(Game.rooms[R] != undefined){
                
               let Controller = Game.rooms[R].controller;
               
               if(Controller != undefined){
                   
                   if(!Controller.my){
                       
                       if(Controller.owner != undefined){
                           
                           Memory.whiteList[R] = "Closed";
                            
                        }
                        else{
                            if(Memory.waitColon == ""){
                                Memory.waitColon = R;
                            }
                            if(Memory.whiteList[R] == "Closed"){
                                Memory.whiteList[R] = "WtMaper";
                            }
                        }
                   }
               }
            }
        }
        
    }
};

module.exports = checkWl;