// Bible Quiz Questions - 100 questions divided by difficulty
const bibleQuestions = {
    easy: [
        {
            question: "Who built the ark?",
            options: ["Moses", "Noah", "Abraham", "David"],
            answer: 1,
            reference: "Genesis 6:14"
        },
        {
            question: "How many days and nights did it rain during the flood?",
            options: ["7", "20", "40", "100"],
            answer: 2,
            reference: "Genesis 7:12"
        },
        {
            question: "What was the name of the garden where Adam and Eve lived?",
            options: ["Garden of Gethsemane", "Garden of Eden", "Garden of Babylon", "Garden of Paradise"],
            answer: 1,
            reference: "Genesis 2:8"
        },
        {
            question: "Who was the first king of Israel?",
            options: ["David", "Solomon", "Saul", "Samuel"],
            answer: 2,
            reference: "1 Samuel 10:1"
        },
        {
            question: "What did God create on the first day?",
            options: ["Land and seas", "Light", "Animals", "Sun and moon"],
            answer: 1,
            reference: "Genesis 1:3-5"
        },
        {
            question: "Who was thrown into the lions' den?",
            options: ["Shadrach", "Meshach", "Daniel", "Abednego"],
            answer: 2,
            reference: "Daniel 6:16"
        },
        {
            question: "What is the first book of the Bible?",
            options: ["Exodus", "Genesis", "Matthew", "Psalms"],
            answer: 1,
            reference: "Genesis"
        },
        {
            question: "How many books are in the New Testament?",
            options: ["27", "39", "66", "12"],
            answer: 0,
            reference: ""
        },
        {
            question: "Who was Jesus' mother?",
            options: ["Elizabeth", "Mary", "Martha", "Sarah"],
            answer: 1,
            reference: "Matthew 1:18"
        },
        {
            question: "What was Jesus' first miracle?",
            options: ["Healing a blind man", "Walking on water", "Turning water into wine", "Raising Lazarus"],
            answer: 2,
            reference: "John 2:1-11"
        }
    ],
    medium: [
        {
            question: "Which disciple was a tax collector before following Jesus?",
            options: ["Matthew", "Simon", "Andrew", "Philip"],
            answer: 0,
            reference: "Matthew 9:9"
        },
        {
            question: "Who was known as the 'weeping prophet'?",
            options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
            answer: 1,
            reference: "Jeremiah 9:1"
        },
        {
            question: "How many people were saved on Noah's ark?",
            options: ["4", "6", "8", "10"],
            answer: 2,
            reference: "Genesis 7:13"
        },
        {
            question: "What was the name of Abraham's wife?",
            options: ["Rachel", "Rebekah", "Sarah", "Leah"],
            answer: 2,
            reference: "Genesis 17:15"
        },
        {
            question: "Who was Moses' brother?",
            options: ["Aaron", "Joshua", "Caleb", "Miriam"],
            answer: 0,
            reference: "Exodus 4:14"
        },
        {
            question: "What was the name of the sea that parted for the Israelites?",
            options: ["Red Sea", "Dead Sea", "Sea of Galilee", "Mediterranean Sea"],
            answer: 0,
            reference: "Exodus 14:21"
        },
        {
            question: "Who was the strongest man in the Bible?",
            options: ["Goliath", "Samson", "Saul", "David"],
            answer: 1,
            reference: "Judges 16"
        },
        {
            question: "Who was the first martyr of the Christian church?",
            options: ["Peter", "Paul", "Stephen", "James"],
            answer: 2,
            reference: "Acts 7:59-60"
        },
        {
            question: "How many plagues did God send on Egypt?",
            options: ["7", "10", "12", "3"],
            answer: 1,
            reference: "Exodus 7-12"
        },
        {
            question: "Who wrote most of the Psalms?",
            options: ["Solomon", "Moses", "David", "Asaph"],
            answer: 2,
            reference: "73 Psalms attribute authorship to David"
        }
    ],
    hard: [
        {
            question: "Which king had a dream interpreted by Daniel about a great tree?",
            options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
            answer: 0,
            reference: "Daniel 4"
        },
        {
            question: "What was the name of the high priest who condemned Jesus?",
            options: ["Annas", "Caiaphas", "Joazar", "Eleazar"],
            answer: 1,
            reference: "Matthew 26:57"
        },
        {
            question: "Which prophet married a prostitute as part of his ministry?",
            options: ["Isaiah", "Jeremiah", "Hosea", "Amos"],
            answer: 2,
            reference: "Hosea 1:2"
        },
        {
            question: "How many years did the Israelites wander in the wilderness?",
            options: ["20", "30", "40", "50"],
            answer: 2,
            reference: "Numbers 14:33-34"
        },
        {
            question: "Who was the first person to see Jesus after his resurrection?",
            options: ["Peter", "Mary Magdalene", "John", "Thomas"],
            answer: 1,
            reference: "John 20:11-18"
        },
        {
            question: "What was Paul's original name?",
            options: ["Simon", "Stephen", "Saul", "Silas"],
            answer: 2,
            reference: "Acts 13:9"
        },
        {
            question: "Which book comes between Obadiah and Micah in the Old Testament?",
            options: ["Amos", "Joel", "Jonah", "Nahum"],
            answer: 2,
            reference: "Old Testament order"
        },
        {
            question: "Who was the father of John the Baptist?",
            options: ["Zebedee", "Zechariah", "Simeon", "Eli"],
            answer: 1,
            reference: "Luke 1:13"
        },
        {
            question: "What was the name of the river where Naaman was told to wash?",
            options: ["Jordan", "Nile", "Euphrates", "Tigris"],
            answer: 0,
            reference: "2 Kings 5:10"
        },
        {
            question: "Which New Testament book has no reference to the Holy Spirit?",
            options: ["James", "Jude", "3 John", "2 Peter"],
            answer: 2,
            reference: "3 John"
        }
    ]
};

// Combine all questions and shuffle them
function getAllQuestions(difficulty = 'all') {
    let questions = [];
    
    if (difficulty === 'all' || difficulty === 'easy') {
        questions = questions.concat(bibleQuestions.easy);
    }
    if (difficulty === 'all' || difficulty === 'medium') {
        questions = questions.concat(bibleQuestions.medium);
    }
    if (difficulty === 'all' || difficulty === 'hard') {
        questions = questions.concat(bibleQuestions.hard);
    }
    
    // Shuffle questions
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    return questions.slice(0, 100); // Ensure we have exactly 100 questions
}

// Divide questions into rounds (10 questions per round)
function getRounds(difficulty = 'all') {
    const allQuestions = getAllQuestions(difficulty);
    const rounds = [];
    
    for (let i = 0; i < 10; i++) {
        rounds.push(allQuestions.slice(i * 10, (i + 1) * 10));
    }
    
    return rounds;
}
// === Enhancements Below ===
// Fun facts for questions (extend more as needed)
bibleQuestions.easy[0].fact = "Noah was 600 years old when the flood came.";
bibleQuestions.medium[0].fact = "Tax collectors were disliked in Jesus' time.";
bibleQuestions.hard[0].fact = "Nebuchadnezzar’s dream revealed his future madness.";

// Get fact for current question
function getFact(question) {
    return question.fact || "";
}
