import { MoehubDataCharacter, MoehubDataSeries, MoehubDataTag } from './data';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type MoehubApiBase<Code extends number = number, Body = any> = Code extends 200
  ? { code: Code; data: Body }
  : Code extends 201 | 204
    ? { code: Code }
    : { code: Code; error: Body };

export type MoehubApiCharacter = MoehubApiBase<200, MoehubDataCharacter>;

export type MoehubApiCharacters = MoehubApiBase<200, MoehubDataCharacter[]>;

export type MoehubApiSeries = MoehubApiBase<200, MoehubDataSeries[]>;

export type MoehubApiTags = MoehubApiBase<200, MoehubDataTag[]>;
