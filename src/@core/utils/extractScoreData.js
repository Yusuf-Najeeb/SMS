
export const extractScoresData = (data) => {

    const combinedData = data.reduce((acc, item) => {
        // Check if the studentId already exists in the accumulator
        if (acc[item.studentId]) {
            // If it exists, add the score to the existing total
            acc[item.studentId].score += parseInt(item.score);
        } else {
            // If it doesn't exist, create a new entry with the studentId and score
            acc[item.studentId] = {
                studentId: item.studentId,
                subjectId: item.subjectId,
                classId: item.classId,
                score: parseInt(item.score)
            };
        }

        return acc;
    }, {});

    // Convert the object back to an array
const result = Object.values(combinedData);

return result

};



