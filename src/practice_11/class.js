
class Class {

    constructor(number){
        this.number = number;
        this.Member = [];
        this.joinClassListener = [];
        this.assignLeaderListener = [];
    }
    assignLeader(leader){
        if(leader.klass === this){
            this.leader = leader;
        }else{
            console.log( `It is not one of us.`);
        }
        this.notifyTeacherSomeoneAssignLeader(leader);
    }
    getDisplayName(){
        return `Class ${this.number}`;
    }
    notifyTeacherSomeoneAssignLeader(student){
        this.assignLeaderListener.forEach((teacher)=>{
            teacher.sayAssignLeader(student,this.number);
        })
    }
    appendMember(student){
        this.Member.push(student);
        student.klass = this;
        this.notifyTeacherSomeoneJoinClass(student);
    }
    notifyTeacherSomeoneJoinClass(student){
        this.joinClassListener.forEach((teacher)=>{
            teacher.saySomeoneJoinClass(student,this.number);
        })
    }
    registerJoinListener(teacher){
        this.joinClassListener.push(teacher);
    }
    registerAssignLeaderListener(teacher){
        this.assignLeaderListener.push(teacher);
    }
}
module.exports= {Class}








