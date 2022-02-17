const { assert } = require("chai");

describe("Game1", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game1");
    const game = await Game.deploy();
    await game.deployed();

    // you must call unlock before you can win    
    const tx = await game.unlock();
    await tx.wait(1);

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
