"use strict";
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const {Person} = require("../../src/practice_11/person.js");
const {Student} = require("../../src/practice_11/student.js");
const {Teacher} = require("../../src/practice_11/teacher.js");
const {Class} = require("../../src/practice_11/class.js");

describe("Person", () => {
    it("should have field name and age", () => {
        const person = new Person(1, "Tom", 21);
        expect(person.name).to.equal("Tom");
        expect(person.age).to.equal(21);
    });

    it("should have a method introduce, introduce person with name and age", () => {
        const person = new Person(1, "Tom", 21);
        const introduce = person.introduce();
        expect(introduce).to.equal("My name is Tom. I am 21 years old.");
    });

    describe("Student", () => {
        let klass;

        before(() => {
            klass = new Class(2);
        });

        it("should have field name, age and class number", () => {
            const student = new Student(1, "Tom", 21, klass);
            expect(student.name).to.equal("Tom");
            expect(student.age).to.equal(21);
            expect(student.klass).to.equal(klass);
        });

        describe("#introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number", () => {
                const student = new Student(1, "Tom", 21, klass);
                const introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am at Class 2.");
            });

            it("should print Leader role, given student is leader", () => {
                const klass = new Class(2);
                const student = new Student(1, "Tom", 21, klass);

                klass.assignLeader(student);
                const introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am Leader of Class 2.");
            });
        });
    });

    describe("Teacher", () => {
        let klasses;
        let klass;

        before(() => {
            klass = new Class(2);
            klasses = [klass, new Class(3)];
        });

        it("should have field name, age and class number", () => {
            const teacher = new Teacher(1, "Tom", 21, klasses);
            expect(teacher.name).to.equal("Tom");
            expect(teacher.age).to.equal(21);
            expect(teacher.klasses.length).to.equal(klasses.length);
            expect(teacher.klasses[0]).to.equal(klasses[0]);
            expect(teacher.klasses[1]).to.equal(klasses[1]);
        });

        describe("#introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have class", () => {
                const teacher = new Teacher(1, "Tom", 21, klasses);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Class 2, 3.");
            });

            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have no class", () => {
                const teacher = new Teacher(1, "Tom", 21);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach No Class.");
            });
        });

        describe("#introduceWith", () => {
            let studentJerry;
            before(() => {
                studentJerry = new Student(1, "Jerry", 8, klass);
            });

            it("should return I am teaching some guy, given my class is same with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, klasses);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Jerry.");
            });

            it("should return I am teaching some guy, given my class is different with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, [new Class(10)]);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I don't teach Jerry.");
            });
        });
    });
});

describe("Class", () => {
    before(() => {
        sinon.spy(console, 'log');
    });

    after(() => {
        console.log.restore();
    });

    it("should have class number", () => {
        const klass = new Class(2);
        expect(klass.number).to.equal(2);
    });

    it("should get display name with number", () => {
        const klass = new Class(2);
        expect(klass.getDisplayName()).to.equal("Class 2");
    });

    describe("#assignLeader", () => {
        it("should assign student as Leader, given student is class member", () => {
            const klass = new Class(2);
            const student = new Student(1, "Jerry", 21, klass);

            klass.assignLeader(student);

            expect(klass.leader).to.equal(student);
        });

        it("should not assign student as Leader, given student is not class member", () => {
            const klass = new Class(2);
            const otherKlass = new Class(3);
            const student = new Student(1, "Jerry", 21, otherKlass);

            klass.assignLeader(student);

            expect(klass.leader).not.equal(student);
        });

        it("should not assign student as Leader, given student is not class member", () => {
            const klass = new Class(2);
            const otherKlass = new Class(3);
            const student = new Student(1, "Jerry", 21, otherKlass);

            klass.assignLeader(student);

            expect(klass.leader).not.equal(student);
            //expect(console.log.getCall(0).args[0]).to.equal("It is not one of us."); //assert style 2.
            expect(console.log).to.be.calledWith("It is not one of us.");
        });

        it("should notify assign leader listeners", () => {
            const klass = new Class(2);
            const otherKlass = new Class(3);
            const student = new Student(1, "Jerry", 21, klass);
            const teacher = new Teacher(1, "Tom", 21, [klass, otherKlass]);
            klass.registerAssignLeaderListener(teacher);

            klass.assignLeader(student);
            expect(console.log).to.be.calledWith("I am Tom. I know Jerry become Leader of Class 2.");

        });
    });

    describe("#appendMemeber", () => {
        it("should change student's klass attribute", () => {
            const klass = new Class(2);
            const otherKlass = new Class(3);

            const student = new Student(1, "Jerry", 21, otherKlass);

            expect(student.klass).to.equal(otherKlass);

            klass.appendMember(student);

            expect(student.klass).to.equal(klass);
        });

        it("should notify join listeners", () => {
            const klass = new Class(2);
            const otherKlass = new Class(3);
            const teacher = new Teacher(1, "Tom", 21, [klass, otherKlass]);

            const student = new Student(1, "Jerry", 21, otherKlass);
            klass.registerJoinListener(teacher);

            klass.appendMember(student);

            expect(console.log).to.be.calledWith("I am Tom. I know Jerry has joined Class 2.");

        });
    });
});