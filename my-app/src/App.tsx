import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswars] = useState<AnswerObject[]>([])
  const [score, setscore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  // console.log(questions);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setscore(0);
    setUserAnswars([]);
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answers
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setscore(prev => prev + 1);
      // save answer in the array for user answars
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswars(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last wuesyion
    const nextQuestion = number + 1; 
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}      >
          Start
        </button>
      ) : null}
      {!gameOver ? <p className='score'>Score:</p> : null}
      {loading ? <p>Loading Questions ...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          calback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (

        <button className='next' onClick={nextQuestion} >
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
