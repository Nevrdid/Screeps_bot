var createBody = {
    run: function(W, C, M, A){
        let B = []
        
        let I = 0;
        while(I < W){
            B.push(WORK);
            I++;
        }
        I=0;
         while(I <C){
            B.push(CARRY);
            I++;
        }
        I=0;
        while(I <M){
            B.push(MOVE);
            I++;
        }
        I=0;
        while(I < A){
            B.push(ATTACK);
            I++;
        }
        return B;
    }
};

module.exports = createBody;