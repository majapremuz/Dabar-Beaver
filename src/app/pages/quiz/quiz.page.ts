import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackButtonComponent, NagradaBtnComponent],
})
export class QuizPage implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  questionnaireName: string = '';
  score = 0;
  quizOver = false;

  constructor(
    private questionCtrl: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadQuizData();
  }

  async loadQuizData() {
    try {
      const questionnaire = await this.questionCtrl.getQuestionnaire();
      
      if (!questionnaire || questionnaire.length === 0) {
        console.error("No questionnaires found.");
        return;
      }

      // Select the first quiz
      const firstQuestionnaireId = questionnaire[0].questionnaire_id;
      this.questionnaireName = questionnaire[0].questionnaire_name;

      // Fetch questions for the selected quiz
      const questions = await this.questionCtrl.getQuestions(firstQuestionnaireId);

      // Map questions and fetch answers for each one
      this.questions = await Promise.all(
        questions.map(async (q: any) => {
          const answers = await this.questionCtrl.getAnswers(firstQuestionnaireId, q.questionnaire_question_id);
          
          return {
            question: q.questionnaire_question_text,
            options: answers.map((a: any) => String(a.questionnaire_answer_text)),
            answer: String(answers.find((a: any) => a.questionnaire_answer_correct === 'Y')?.questionnaire_answer_text || "")
          };
        })
      );

      console.log("Formatted Questions: ", this.questions);
    } catch (error) {
      console.error("Error loading quiz data:", error);
    }
  }

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

  openMap() {
  this.router.navigateByUrl('Potraži dabra na karti');
}
}
