



import {Person} from "./person.js";
class Teacher extends Person {
    constructor(id,name, age,klasses) {
        super(id,name, age); // 记得用super调用父类的构造方法!
        this.klasses = klasses;
    }


    introduce(){
        const kclassString = (this.klasses === undefined || this.klasses.length === 0)?"No Class":`Class ${this.klasses.map(x=>x.number).join(", ")}`;
        return super.introduce() + ` I am a Teacher. I teach ${kclassString}.`;
    }
    introduceWith(student){
        if(this.klasses.includes(student.klass)){
            return super.introduce()+` I am a Teacher. I teach Jerry.`;
        }

        else{
            return super.introduce() + ` I am a Teacher. I don't teach Jerry.`;
        }
    }
    saySomeoneJoinClass(student,number){
        console.log(`I am ${this.name}. I know ${student.name} has joined Class ${number}.`);
    }
    sayAssignLeader(student,number){
        console.log(`I am ${this.name}. I know ${student.name} become Leader of Class ${number}.`);
    }
}
module.exports= {Teacher}




