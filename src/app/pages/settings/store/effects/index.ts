import { ClubsEffects } from './clubs.effects';
import { DatastoreEffects } from './datastore.effects';
import { ProgramsEffects } from './programs.effects';

export const settingsEffects: any[] = [
  ProgramsEffects,
  DatastoreEffects,
  ClubsEffects,
];
