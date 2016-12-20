

    F = function(R:pos){
        (R) = 2  *( NbOfNotWorkBP * TerrainCoeff(R) - NbOfWorkBP )
    }

    Time = function(P:path){
        let cumuledFatigue = 0;
        foreach(R){ 
            switch : F(R,Cf).terrain
            case : road)  -> CummuledFatigue+= F(R,0.5);
            case : plain)  -> CummuledFatigue+= F(R,1);
            case : swamp)  -> CummuledFatigue+= F(R,5);
                
        }
         if CumuledFatigue < 0  -> CumuledFatigue =0 ; Time += 1
         else -> Time += ceil(CumuledFatigue/NbOfW); CumuledFatigue = 0
    }          
        
        


