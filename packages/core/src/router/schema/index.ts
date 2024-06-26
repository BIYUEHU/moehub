import Tsu from 'tsukiko';

const intPositive = Tsu.Number().int().positive();

const genderSchema = Tsu.Enum(Tsu.Literal('MALE'), Tsu.Literal('FEMALE'), Tsu.Literal('OTHER'));

const bloodTypeSchema = Tsu.Enum(Tsu.Literal('A'), Tsu.Literal('B'), Tsu.Literal('AB'), Tsu.Literal('O'));

const seriesGenreSchema = Tsu.Enum(
  Tsu.Literal('ANIME'),
  Tsu.Literal('COMIC'),
  Tsu.Literal('GALGAME'),
  Tsu.Literal('GAME'),
  Tsu.Literal('NOVEL'),
  Tsu.Literal('OTHER')
);

export const seriesSchema = Tsu.Object({
  name: Tsu.String(),
  genre: seriesGenreSchema
}).strict();

export const collectionSchema = Tsu.Object({
  name: Tsu.String(),
  description: Tsu.String().optional(),
  characters: Tsu.Array(intPositive).optional()
}).strict();

export const characterSchema = Tsu.Object({
  name: Tsu.String(),
  romaji: Tsu.String(),
  gender: genderSchema,
  alias: Tsu.Array(Tsu.String()).optional(),
  age: intPositive.optional(),
  images: Tsu.Array(Tsu.String()).optional(),
  url: Tsu.Array(Tsu.String()).optional(),
  description: Tsu.String().optional(),
  comment: Tsu.String().optional(),
  hitokoto: Tsu.String().optional(),
  birthday: intPositive.optional(),
  voice: Tsu.String().optional(),
  series: Tsu.String(),
  seriesGenre: seriesGenreSchema,
  collections: Tsu.Array(intPositive).optional(),
  tags: Tsu.Array(Tsu.String()).optional(),
  hairColor: Tsu.String().optional(),
  eyeColor: Tsu.String().optional(),
  bloodType: bloodTypeSchema.optional(),
  height: intPositive.optional(),
  bust: intPositive.optional(),
  waist: intPositive.optional(),
  hip: intPositive.optional()
}).strict();
