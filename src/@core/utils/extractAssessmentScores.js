

export const extractAssessmentScoresData = (data) => {
    const combinedData = data.reduce((acc, item) => {
        const { studentId, subjectId, classId, score, category, id } = item;
        const categoryId = category.id;
        const categoryName = category.name;
        const parsedScore = parseInt(score);

        // Create an object for the student if it doesn't exist
        if (!acc[studentId]) {
            acc[studentId] = {
                studentId,
                subjectId,
                classId,
                totalScore: 0,
            };
        }

        // Add score and category ID to the student's object based on category name
        acc[studentId][`${categoryName.replace(/\s+/g, '')}Score`] = parsedScore;

        // acc[studentId][`${categoryName.replace(/\s+/g, '')}Id`] = categoryId;
        
        acc[studentId][`${categoryName.replace(/\s+/g, '')}ScoreId`] = id;

        // Add the score to the total score of the student
        acc[studentId].totalScore += parsedScore;

        return acc;
    }, {});

    // Convert the object back to an array
    const result = Object.values(combinedData);

    console.log(result, 'combined assessment data');

    return result;
};


