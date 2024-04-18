import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddSectionComponent } from './features/section/add-section/add-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, AddSectionComponent],
})
export class AppComponent {
  title = 'angular-tasktracker';
}
