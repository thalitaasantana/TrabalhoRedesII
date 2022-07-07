import {hash} from './helpers'

export interface Bloco {
    header: {  // informacao metadado que nao entra na parte do hash
        nounce: number
        hashBloco: string 
    }

    payload: { // objeto ou hash
        sequencia: number
        timestamp: number
        dados: any
        hashAnterior: string
    }
}

export class Blockchain{
    #chain: Bloco[] = []
    private prefixoPow = '0'   // prefixo de prova de trabalho. Todas as hashes comecarao com 0

    constructor(private readonly dificuldade: number = 4){
        this.#chain.push(this.criarBlocoGenesis()) // bloco inicial deve ser criado manualmente

    }

    private criarBlocoGenesis(): Bloco{
        const payload = {
            sequencia: 0,
            timestamp: +new Date(),
            dados: 'Bloco de Inicio',
            hashAnterior: ''
        }

        return{
            header: {
                nounce: 0,
                hashBloco: hash(JSON.stringify(payload))
            }, 
            payload
        }

    }

    get chain(){
        return this.#chain
    }

    private get ultimoBloco(): Bloco{
        return this.#chain.at(-1) as Bloco
    }

    hashUltimoBloco(): string {
        return this.ultimoBloco.header.hashBloco
    }

    criarbloco(): Bloco['payload'] {
        const novobloco: Bloco['payload'] = {
            sequencia: this.ultimoBloco.payload.sequencia + 1,
            timestamp: +new Date()
            dados,
            hashAnterior: this.hashUltimoBloco()
        }

        console.log(`bloco #${novobloco.sequencia} criado: ${JSON.stringify(novobloco)}`)
        return novobloco
    }

    minerarBloco(bloco[`payload`]){
        let nounce = 0
        const inicio = +new Date()

        while(true){
            const hashBloco = hash(JSON.stringify(Bloco))
            const hashPow = hash(hashBloco + nounce)

            if(hashPow.startsWith(this.prefixoPow.repeat(this.dificuldade))){
                const final = +new Date()
                const hashReduzido = hashBloco.slice(0,12)
                const tempoMineracao = (final-inicio) / 1000

                console.log(`Bloco #${Bloco.sequncia} minerado em ${tempoMineracao}s.
                Hash ${hashReduzido} (${nounce} tentativas)`)

                return{
                    blocoMinerado:{
                        payload:{...Bloco},
                        header:{
                            nounce,
                            hashBloco
                        }
                    }
                }
            }

        }
        nounce++
    }

    verificarBloco(Bloco); {
        if(Bloco.payload.hashAnterior != this.hashUltimoBloco()){
            console.error(`Bloco #${bloco.payload.sequencia} invalido: O hash anterior é ${this.hashUltimoBloco().slice(0, 12)} e não 
            ${bloco.payload.hashAnterior.slice(0,12)}`)
        
            return false
        }
        
        const hashTeste = hash(hash(JSON.stringfy(bloco.payload)) + bloco.header.nonce)
        if (!hashValidado({hash: hashTeste, dificuldade: this.dificuldade,
        prefixo: this.prefixoPow})){
        
        console.error(`bloco #${bloco.payload.sequencia} invalido:
        Nonce ${bloco.header.nonce} é invalido e não pode ser verificado`)
        return false
        }
        return true
    }
    
    enviarBloco (bloco: Bloco): Bloco[]{
        if (this.verificarBloco(bloco)){
            this.#chain.push(bloco)
            console.log(`Bloco #${bloco.payload.sequencia} foi adicionado a
        
            blockchain: ${JSON.stringfy(bloco, null, 2)}`)
        }
        return this.#chain
    }
}
        