import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
import { Score } from './score.model';
import { ScoreComponent } from './score/score.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  scores: Array<Score> = [];

  constructor(public dialog: MatDialog, private appService: AppService) {}

  ngOnInit() {
    this.appService.getScores().subscribe((scores: Array<DocumentData>) => {
      this.scores = scores as Array<Score>;
    });
  }

  public onHighscore(score: number): void {
    const dialogRef = this.dialog.open(ScoreComponent, {
      data: { score },
    });

    dialogRef.afterClosed().subscribe((result: Score | undefined) => {
      if (result) {
        this.appService.addNewScore(result);
      }
    });
  }
}
