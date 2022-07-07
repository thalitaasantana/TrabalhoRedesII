import {Blockchain} from './blockchain' 

const dificuldade = Number(process.argv[2]) || 4 // dificuldade de minerar bloco
const blockchain = new Blockchain(dificuldade)

const numblocos = Number(process.argv[3]) || 10 // numero de blocos
let chain = blockchain.chain 

for (let i=1; i <= numblocos ; i++){  // a ideia eh minerar o bloco
    const bloco = blockchain.criarBloco(`Bloco ${i}`)
    const mineinfo = blockchain.minerarBloco(bloco) // vai inicar com 0
    chain = blockchain.enviarBloco(mineinfo.blocominerado) // envia bloco pra chain
}

// Printar blockchain
console.log('---BLOCKCHAIN---')
console.log(chain)