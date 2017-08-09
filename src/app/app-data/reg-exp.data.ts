// Email regular expression got from http://emailregex.com
import { RegExpModel } from '../models/reg-exp.model';

export const RegExpList:Array<RegExpModel> = [
    {name: 'email', regExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i}
]