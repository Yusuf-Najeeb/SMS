
    export const extractTranscriptData = (data) => {
        const result = [];
        const session = Object.keys(data);
    
        session.forEach((sub) => {
            const subjects = data[sub];
    
            Object.keys(subjects).forEach((subjectName) => {
                const { session: subjectSession, term: subjectTerm, classname, total } = subjects[subjectName];
    
                const existingSessionIndex = result.findIndex((entry) => entry.session === subjectSession && entry.term === subjectTerm);
    
                if (existingSessionIndex === -1) {
                    result.push({
                        session: subjectSession,
                        term: subjectTerm,
                        class: classname,
                        subjects: [{ subject: subjectName, score: total }]
                    });
                } else {
                    result[existingSessionIndex].subjects.push({ subject: subjectName, score: total });
                }
            });
        });
    
        return result;
    };
    


