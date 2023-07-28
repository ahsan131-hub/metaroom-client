const QuizSubmission({currentQuiz}:{currentQuiz:any})=>{
  <div>
  <h2 className="text-2xl font-bold">Quiz: {currentQuiz?.title}</h2>
  <p>Description: {currentQuiz?.description}</p>
  <h3 className="text-xl font-bold mt-4">Questions:</h3>
  {currentQuiz?.questions?.map((question: any, index: any) => (
    <div key={index} className="mt-4">
      <h4 className="text-lg font-bold">{question.question}</h4>
      <ul>
        {question?.options?.map((option: any, optionIndex: any) => (
          <li key={optionIndex}>{option}</li>
        ))}
      </ul>
    </div>
  ))}
</div>
}

export default QuizSubmission;