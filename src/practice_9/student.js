



import {Person} from "./person.js";
import {Class} from "./class.js";
class Student extends Person {
    constructor(id,name,age,klass) {
        super(id,name, age); // 记得用super调用父类的构造方法!
        this.klass = klass;
    }

    introduce(){
        console.info(this.klass.leader);
        if(this.klass.leader !== null &&  this.klass.leader === this) {
            return super.introduce() + ` I am a Student. I am Leader of Class ${this.klass.number}.`;
        }else{
            return super.introduce() + ` I am a Student. I am at Class ${this.klass.number}.`;
        }
    }
}
module.exports= {Student}



