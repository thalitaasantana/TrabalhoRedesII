import {BinaryLike, createHash} from 'crypto'

export function hash(BinaryLike){
    return createHash('sha256').update(dado).digest('hex')
    
}
