



import {Person} from "./person.js";
class Teacher extends Person {
    constructor(id,name, age,klass) {
        super(id,name, age); // 记得用super调用父类的构造方法!
        this.klass = klass;
    }


    introduce(){
        if(this.klass == null){
            return super.introduce()+` I am a Teacher. I teach No Class.`
        }else {
            return super.introduce() + ` I am a Teacher. I teach Class ${this.klass.number}.`
        }
    }
    introduceWith(student){
        if(student.klass.number=== this.klass.number){
            return super.introduce()+` I am a Teacher. I teach Jerry.`;
        }

        else{
            return super.introduce() + ` I am a Teacher. I don't teach Jerry.`;
        }
    }
}
module.exports= {Teacher}


