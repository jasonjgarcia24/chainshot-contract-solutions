const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {

    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck 
    let signer;
    let address = '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf';
    let i = 0;

    while (parseInt(address.slice(0, 5), 16) >= parseInt('0x00F', 16)) {
      signer = ethers.provider.getSigner(i);
      address = await signer.getAddress();
      i++
    }
    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
