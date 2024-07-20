import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import type { Context } from 'koa'
import passport from 'koa-passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Symbols } from '../../container'
import type Database from '../db'

@injectable()
export class Auth {
  private readonly SECRET_KEY = '約束の軌跡 櫻ノ刻ト詩'

  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.SECRET_KEY
  }

  public constructor(@inject(Symbols.Database) private readonly db: Database) {
    this.strategy()
  }

  private strategy() {
    const str = new Strategy(this.jwtOptions, async (payload: Context['state']['user'], done) => {
      if (!payload) return done(null, false)
      if ((await this.db.settings.findFirst({ where: { key: 'admin_email' } }))?.value !== payload.email) {
        return done(null, false)
      }
      done(null, payload)
    })
    passport.use(str)
  }

  public createToken(data: { email: string }) {
    return jwt.sign(data, this.SECRET_KEY, { expiresIn: '7d' })
  }

  public static middleware() {
    return passport.authenticate('jwt', { session: false })
  }

  public init() {
    return passport.initialize()
  }

  public check(token: string) {
    return jwt.verify(token, this.SECRET_KEY)
  }
}

export default Auth
