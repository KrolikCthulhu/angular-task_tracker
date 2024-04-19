import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../../entities/section/model/section.model';
import { Store, select } from '@ngrx/store';
import { selectAllSections } from '../../store/section/section.selectors';
import { loadSections } from '../../store/section/section.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private store = inject(Store);
  //   sections$: Observable<Section[]> = this.store.pipe(select(selectAllSections));
  sections$!: Observable<Section[]>;

  constructor() {
    this.store.dispatch(loadSections());
  }

  ngOnInit() {
    this.store.dispatch(loadSections()); // Запустите загрузку секций при инициализации компонента
    this.sections$ = this.store.pipe(select(selectAllSections)); // Получите все секции из состояния хранилища
  }
}
