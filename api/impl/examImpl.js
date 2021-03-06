let ExamDb = require('../../mock/mockedExam');

const Exam = require('../../model/exam');

//checks the body and returns false if any of the parameters are not defined, otherwise returns true
function check_body(body) {
    if (body.id === undefined 
        || body.ownerId === undefined
        || body.name === undefined
        || body.duration === undefined
        || body.deadline === undefined
        || body.startDate === undefined
        || body.groupId === undefined
        || body.countTask === undefined){
            return false;
        }
    else
        return true;
}

//creates the exam
function createExam(body) {
    return new Exam(
        body.id,
        body.ownerId,
        body.name, 
        body.duration,
        body.deadline,
        body.startDate,
        body.groupId,
        body.countTask 
    );
}

// gets the exam
async function getExam(examId) {
    try {
        let examDb = new ExamDb();
        return await examDb.read({id: examId});
    }
    catch (err) {
        throw err;
    }
}

// adds the exam, by first creating it and then inserting it in the mocked DB
async function addExam(value) {
    try {
        let exam = createExam(value);
        let examDb = new ExamDb();

        await examDb.create(exam);
    }
    catch (err) {
        throw err;
    }
}
//updates un exam, it requires the owner of the exam, the Id of the exam and the value of the exam (body)
async function updateExam(userId,examId,value) {
    try {
        let exam = createExam(value);   
        exam.id = examId;
        exam.ownerId = userId;
        let examDb = new ExamDb();
        
        await examDb.update(exam);
    }
    catch (err) {
        throw err;
    }
}
//deletes an exam, it needs the owner of the exam (userID) and the exam id
async function deleteExam(userId, examId) {
    try {
        let examDb = new ExamDb();
        await examDb.delete({id: examId, ownerId: userId});
    }
    catch (err) {
        throw err;
    }
}

async function validateOwner(userId,examId) {
    try {
        let examDb = new ExamDb();
        let exam = await examDb.read({id: examId});

        if(exam.ownerId == userId)
            return true;
        else
            return false;
    }
    catch (err) {
        throw err;
    }
}

async function getAllExams(userId) {
    try {
        let examDb = new ExamDb();
        return await examDb.getAllExams(userId);
    }
    catch (err) {
        throw err;
    }
}

async function getAllExamTasks(userId, examId) {
    try {
        let examDb = new ExamDb();
        return await examDb.getTasks(userId,examId);
    }
    catch (err) {
        throw err;
    }
}

//exports the modules
module.exports = {
    check_body: check_body,
    addExam: addExam,
    getExam: getExam,
    updateExam: updateExam,
    deleteExam: deleteExam,
    validateOwner : validateOwner,
    getAllExams : getAllExams,
    getAllExamTasks : getAllExamTasks
}