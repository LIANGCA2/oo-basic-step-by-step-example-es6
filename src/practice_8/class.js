

class Class{

    constructor(number){
        this.number = number;

    }
    assignLeader(leader){
        if(leader.klass === this){
            this.leader = leader;
        }else{
            return `It is not one of us.`;
        }
    }
    getDisplayName(){
        return `Class ${this.number}`;
    }
}
module.exports= {Class}






