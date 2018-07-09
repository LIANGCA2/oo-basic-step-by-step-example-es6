

class Class{

    constructor(number){
        this.number = number;
        this.Member = [];

    }
    assignLeader(leader){
        if(leader.klass === this){
            this.leader = leader;
        }else{
            console.log (`It is not one of us.`);
        }
    }
    getDisplayName(){
        return `Class ${this.number}`;
    }
    appendMember(student){
        this.Member.push(student);
        student.klass = this;
    }
}
module.exports= {Class}







