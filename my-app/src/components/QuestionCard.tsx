import React from 'react';

type Props = {
    question: string;
    answers: string[];
    calback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    calback,
    userAnswer,
    questionNr,
    totalQuestions }) => (
        <div>
            <p className='number'>
                Question:{questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <div>
                        <button disabled={userAnswer} onClick={calback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
export default QuestionCard;
