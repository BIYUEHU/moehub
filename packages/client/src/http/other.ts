import { MoehubApiSeries, MoehubApiTags } from '@moehub/common';
import http from './http';

export function getTags(): Promise<MoehubApiTags> {
  return http.get('/tag');
}

export function getSeries(): Promise<MoehubApiSeries> {
  return http.get('/series');
}
