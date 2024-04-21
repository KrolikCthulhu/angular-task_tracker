import { Component, Input } from '@angular/core';
import { Section } from '../../entities/section/model/section.model';
import { DeleteSectionComponent } from '../../features/section/delete-section/delete-section.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-section-card',
    standalone: true,
    templateUrl: './section-card.component.html',
    styleUrl: './section-card.component.scss',
    imports: [DeleteSectionComponent, MatMenuModule, MatButtonModule],
})
export class SectionCardComponent {
    @Input() section!: Section;
}
