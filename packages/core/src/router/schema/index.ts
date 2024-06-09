import tsu from 'tsukiko';

const genderSchema = tsu.Union([tsu.Union([tsu.Literal('MALE'), tsu.Literal('FEMALE')]), tsu.Literal('OTHER')]);

const bloodTypeSchema = tsu.Union([
  tsu.Union([tsu.Literal('A'), tsu.Literal('B')]),
  tsu.Union([tsu.Literal('AB'), tsu.Literal('O')])
]);

const seriesGenreSchema = tsu.Union([
  tsu.Union([
    tsu.Union([tsu.Literal('ANIME'), tsu.Literal('COMIC')]),
    tsu.Union([tsu.Literal('GALGAME'), tsu.Literal('GAME')])
  ]),
  tsu.Union([tsu.Literal('NOVEL'), tsu.Literal('OTHER')])
]);

export const seriesSchema = tsu.Object({
  name: tsu.String(),
  genre: seriesGenreSchema
});

export const collectionSchema = tsu.Object({
  name: tsu.String(),
  description: tsu.String().optional()
});

export const characterSchema = tsu.Object({
  name: tsu.String(),
  romaji: tsu.String(),
  gender: genderSchema,
  alias: tsu.Array(tsu.String()).optional(),
  age: tsu.Number().positive().optional(),
  images: tsu.Array(tsu.String()).optional(),
  url: tsu.Array(tsu.String()).optional(),
  description: tsu.String().optional(),
  comment: tsu.String().optional(),
  hitokoto: tsu.String().optional(),
  birthday: tsu.Number().positive().optional(),
  actor: tsu.String().optional(),
  series: tsu.Number().positive().optional(),
  collections: tsu.Array(tsu.Number().positive()).default([]),
  tags: tsu.Array(tsu.String()).default([]),
  hairColor: tsu.String().optional(),
  eyeColor: tsu.String().optional(),
  bloodType: bloodTypeSchema.optional(),
  height: tsu.Number().positive().optional(),
  bust: tsu.Number().positive().optional(),
  waist: tsu.Number().positive().optional(),
  hip: tsu.Number().positive().optional()
});
