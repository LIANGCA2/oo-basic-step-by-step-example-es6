


import {Person} from "./person.js";
class Worker extends Person {
    constructor(name, age) {
        super(name, age); // 记得用super调用父类的构造方法!
    }

    introduce(){
        return super.introduce()+` I am a Teacher. I have a job.`
    }
}
module.exports= {Worker}
