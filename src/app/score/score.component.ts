import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { score: number },
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._onSetForm();
  }

  public onRegisterScore(form: FormGroup): void {
    if (form.invalid) {
      this._onOpenSnackBar('Invalid username');
      form.reset();
      return;
    }
    this.dialogRef.close({
      score: this.data.score,
      username: form.value.username,
    });
  }

  private _onSetForm(): void {
    this.userForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  public onBack(): void {
    this.dialogRef.close();
  }

  private _onOpenSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
