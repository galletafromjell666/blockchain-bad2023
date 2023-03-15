const SHA256 = require("crypto-js/sha256");

let sistema = {
  blockChain: [],
  dificultad: "00000",
  crearGenesis: function () {
    let genesis = this.crearBloque("bloque genesis", "");
    genesis.hash = this.crearHash(genesis);
    this.blockChain.push(genesis);
  },
  crearHash(bloque) {
    return SHA256(
      bloque.index +
        bloque.fecha +
        JSON.stringify(bloque.datos) +
        bloque.previousHash +
        bloque.nonce
    ).toString();
  },
  crearBloque: function (data, previousHash) {
    let bloque = {
      index: this.blockChain.length + 1,
      fecha: new Date(),
      previousHash,
      datos: data,
      hash: "",
      nonce: 0,
    };
    return bloque;
  },
  agregarBloque: function (datos) {
    console.log(`agregando bloque`);
    let prev = this.blockChain[this.blockChain.length - 1];
    let block = this.crearBloque(datos, prev.hash);
    //minando
    block = this.minarBloque(block);
    this.blockChain.push(block);
  },
  minarBloque: function (bloque) {
    while (!bloque.hash.startsWith(this.dificultad)) {
      bloque.nonce++;
      bloque.hash = this.crearHash(bloque);
    }
    return bloque;
  },
};

sistema.crearGenesis();
sistema.agregarBloque({ voto: "A" });
sistema.agregarBloque({ voto: "B" });
sistema.agregarBloque({ voto: "C" });

console.log(JSON.stringify(sistema.blockChain, null, 2));
