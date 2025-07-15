'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Connection } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface QuizProps {
  allConnections: Connection[];
}

type Question = {
  correctAnswer: Connection;
  options: Connection[];
  questionText: string;
};

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QUIZ_LENGTH = 10;

export function Quiz({ allConnections }: QuizProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Connection | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  
  const generateQuestion = useCallback(() => {
    // Filter out connections that have already been used as a correct answer in this session
    const availableConnections = allConnections.filter(conn => !usedQuestionIds.has(conn.id));

    if (availableConnections.length === 0) {
      // If all questions have been used, end the quiz.
      // This is a fallback in case QUIZ_LENGTH > allConnections.length
      setQuestionsAnswered(QUIZ_LENGTH);
      return;
    }

    const shuffledAvailable = shuffleArray(availableConnections);
    const correctAnswer = shuffledAvailable[0];
    
    // Add the new question's ID to the used set
    setUsedQuestionIds(prev => new Set(prev).add(correctAnswer.id));
    
    // For options, we can use any connection, but ensure the correct answer is one of them.
    const otherOptions = shuffleArray(allConnections.filter(c => c.id !== correctAnswer.id)).slice(0, 3);
    const options = shuffleArray([correctAnswer, ...otherOptions]);
    
    setQuestion({
      correctAnswer,
      options,
      questionText: `Which English word means "${correctAnswer.spanish}"?`,
    });
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [allConnections, usedQuestionIds]);

  useEffect(() => {
    // Initial question generation
    generateQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConnections]); // Rerunning generateQuestion would create an infinite loop with useCallback dependencies

  const handleAnswer = (answer: Connection) => {
    if (selectedAnswer) return; 

    setSelectedAnswer(answer);
    const correct = answer.id === question?.correctAnswer.id;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
    setQuestionsAnswered(q => q + 1);
  };

  const handleNextQuestion = () => {
    if (questionsAnswered >= QUIZ_LENGTH) {
        // End of quiz, don't generate a new question
        return;
    }
    generateQuestion();
  };
  
  const handleRestart = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setUsedQuestionIds(new Set());
    // We need to re-trigger question generation. A simple way is to wrap it.
    // The state updates in restart will trigger a re-render which will call generateQuestion if needed
    // But to be explicit:
    generateQuestion(); 
  };
  
  useEffect(() => {
    // This effect will run once on mount to set the first question, and handleRestart will call generateQuestion directly
    if(questionsAnswered === 0 && !question) {
        generateQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!question) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Loading quiz...</p>
        </CardContent>
      </Card>
    );
  }

  const isFinished = questionsAnswered >= QUIZ_LENGTH || allConnections.length < 4;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className='font-headline'>Quiz Time!</span>
          <span className="text-sm font-medium text-muted-foreground">Score: {score} / {questionsAnswered}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isFinished ? (
            <div className="text-center p-6">
                <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-lg text-muted-foreground mb-4">Your final score is {score} out of {QUIZ_LENGTH}.</p>
                <Button onClick={handleRestart}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Play Again
                </Button>
            </div>
        ) : (
            <>
                <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                    <p className="text-xl font-semibold">{question.questionText}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                    <Button
                        key={option.id}
                        variant="outline"
                        className={cn(
                        "h-auto py-3 text-base justify-start",
                        selectedAnswer && option.id === question.correctAnswer.id && "border-primary bg-primary/20 text-primary hover:bg-primary/30",
                        selectedAnswer && selectedAnswer.id === option.id && option.id !== question.correctAnswer.id && "border-destructive bg-destructive/20 text-destructive-foreground hover:bg-destructive/30"
                        )}
                        onClick={() => handleAnswer(option)}
                        disabled={!!selectedAnswer}
                    >
                        {selectedAnswer && option.id === question.correctAnswer.id && <CheckCircle className="mr-2 h-5 w-5"/>}
                        {selectedAnswer && selectedAnswer.id === option.id && option.id !== question.correctAnswer.id && <XCircle className="mr-2 h-5 w-5"/>}
                        {option.english}
                    </Button>
                    ))}
                </div>

                {selectedAnswer && (
                    <div className="mt-6 text-center p-4 bg-muted/50 rounded-lg">
                        <p className={cn(
                            "text-lg font-bold",
                            isCorrect ? "text-primary" : "text-destructive"
                        )}>
                        {isCorrect ? "Correct!" : "Not quite."}
                        </p>
                        <p className="text-muted-foreground mt-1">
                            <strong>{question.correctAnswer.spanish}</strong> means <strong>{question.correctAnswer.english}</strong>.
                        </p>
                        <p className="text-sm text-muted-foreground italic mt-2">"{question.correctAnswer.mnemonic}"</p>
                        <Button className="mt-4" onClick={handleNextQuestion}>
                            Next Question <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </>
        )}
      </CardContent>
    </Card>
  );
}
