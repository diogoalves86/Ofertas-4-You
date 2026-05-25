import * as migration_20260525_190729_inicial from './20260525_190729_inicial';

export const migrations = [
  {
    up: migration_20260525_190729_inicial.up,
    down: migration_20260525_190729_inicial.down,
    name: '20260525_190729_inicial'
  },
];
