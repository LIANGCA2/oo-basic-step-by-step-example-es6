



import {Person} from "./person.js";
import {Class} from "./class.js";
class Student extends Person {
    constructor(name,age,klass) {
        super(name, age); // 记得用super调用父类的构造方法!
        this.klass = klass;
    }

    introduce(){
        return super.introduce()+` I am a Student. I am at Class ${this.klass.number}.`
    }
}
module.exports= {Student}

