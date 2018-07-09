



import {Person} from "./person.js";
class Teacher extends Person {
    constructor(name, age,klass) {
        super(name, age); // 记得用super调用父类的构造方法!
        this.klass = klass;
    }


    introduce(){
        if(this.klass == null){
            return super.introduce()+` I am a Teacher. I teach No Class.`
        }else {
            return super.introduce() + ` I am a Teacher. I teach Class ${this.klass}.`
        }
    }
}
module.exports= {Teacher}
