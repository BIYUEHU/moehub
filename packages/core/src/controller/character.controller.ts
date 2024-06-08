import { Context } from 'koa';
import model from '../model';

class CharacterController {
  static get(ctx: Context) {
    const { id } = ctx.params;
    if (!id) return model.character.findMany();
    return model.character.findUnique({ where: { id } });
  }

  static post(ctx: Context) {
    const data = ctx.request.body;
    return model.character.create(data as any);
  }

  static put(ctx: Context) {}

  static delete(ctx: Context) {}
}

export default CharacterController;
