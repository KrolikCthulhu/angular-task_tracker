import { Component, Input } from '@angular/core';
import { Section } from '../../entities/section/model/section.model';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() section!: Section;
}
