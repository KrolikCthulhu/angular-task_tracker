import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SectionActions from './section.actions';
import { SectionService } from '../../entities/section/api/section.service';

@Injectable()
export class SectionEffects {
  private sectionService = inject(SectionService);
  private actions$ = inject(Actions);

  constructor() {}

  addSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.addSection),
      mergeMap((action) =>
        this.sectionService.addSection(action.section).pipe(
          map((section) => SectionActions.addSectionSuccess({ section })),
          catchError((error) => of(SectionActions.addSectionFailure({ error })))
        )
      )
    )
  );
}
