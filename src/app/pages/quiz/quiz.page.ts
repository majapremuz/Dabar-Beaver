import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  questions = [
    {
      question: "1. Koje godine se dabar vratio u Hrvatsku?",
      options: ["A 2016.", "B 2006.", "C 1996.", "D 1986."], 
      answer: "C 1996."
    },
    {
      question: "2. Nakon završetka projekta „Dabar u Hrvatskoj“, koliko je dabrova dovezeno sveukupno?",
      options: ["A 85", "B 95", "C 105", "D 115"],
      answer: "A 85"
    },
    {
      question: "3. Odrasli dabar težak je između: ",
      options: ["A 5 - 10 kg", "B 10 - 20  kg", "C 20 - 30  kg", "D 30 - 40 kg"],
      answer: "C 20 - 30 kg"
    },
    {
      question: "4. Što od navedenog dabar NE jede?",
      options: ["A kukuruz", "B ribu", "C djetelinu", "D koru drveta"],
      answer: "B ribu"
    },
    {
      question: "5. Koliko generacija dabrova živi s roditeljima?",
      options: ["A četiri", "B tri", "C dvije", "D jedna"],
      answer: "C dvije"
    },
    {
      question: "6. Koji građevinski materijal je dobio ime po dabru?",
      options: ["A cigla", "B grede", "C žbuka", "D crijep"],
      answer: "D crijep"
    },
    {
      question: "7. Koje boje su prednji dabrovi zubi (glodnjaci)?",
      options: ["A bijeli", "B sivi", "C narančasti", "D smeđi"],
      answer: "C narančasti"
    },
    {
      question: "8. Koliko dabar ima zubi?",
      options: ["A 20", "B 16", "C 18", "D 24"],
      answer: "A 20"
    },
    {
      question: "9. Ako dvije generacije dabrova žive s roditeljima, a svake godine se rađa nova generacija dabrova kojih može biti između 1-5, koliki je najmanji i najveći broj dabrova koji odjednom mogu živjeti skupa?",
      options: ["A 4 i 10", "B 4 i 11", "C 4 i 12", "D 4 i 14"],
      answer: "C 4 i 12"
    },
    {
      question: "10. Gdje su dabrovi naseljeni u blizini Ivanić-Grada 1996.?",
      options: ["A u šumi Marči", "B na Petici", "C u Sobočanima", "D u šumi Žutici"],
      answer: "D u šumi Žutici"
    }
  ];

  currentQuestionIndex = 0;
  score = 0;
  quizOver = false;

  constructor() {}

  ngOnInit() {}

  answerQuestion(selectedOption: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
      this.score++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizOver = true;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizOver = false;
  }
}
