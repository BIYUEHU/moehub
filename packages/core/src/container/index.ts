import { Container } from 'inversify'
import { Symbols } from './symbols'
import modules from './modules'

export { Symbols }

export const container = new Container()
container.load(...modules)

export default container
