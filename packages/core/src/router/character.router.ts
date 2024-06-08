import Router from 'koa-router';
import characterController from '../controller/character.controller';

const CharacterController = new Router();

CharacterController.get('/:id?', characterController.get);
CharacterController.post('/:id', characterController.post);
CharacterController.put('/:id', characterController.put);
CharacterController.delete('/:id', characterController.delete);

export default CharacterController;
