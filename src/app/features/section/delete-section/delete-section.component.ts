import {
    ChangeDetectionStrategy,
    Component,
    Input,
    inject,
} from '@angular/core';
import { Section } from '@entities/section/model/section.model';
import { MatButtonModule } from '@angular/material/button';
import { SectionFacade } from '@entities/section/model/section.facade';

@Component({
    selector: 'app-delete-section',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './delete-section.component.html',
    styleUrl: './delete-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSectionComponent {
    @Input() sectionId!: Section['id'];
    private readonly sectionFacade = inject(SectionFacade);

    onDeleteSection() {
        this.sectionFacade.deleteSection(this.sectionId);
    }
}
