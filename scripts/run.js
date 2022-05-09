// Compile
// Deploy
// Execute

const { Contract } = require("ethers");

const main = async () => {

    // Compile 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    

    // Deploy

    // creates local Ethereum network and funds it 
    const waveContract = await waveContractFactory.deploy({ 
      value: hre.ethers.utils.parseEther("0.1"),
    }); 
    await waveContract.deployed();

    // Execute
    console.log("Contract deployed to:", waveContract.address);

    contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );

    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:", 
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);




    let songNumber;
    songNumber = await waveContract.getPlaylistNumber();


    let songTxn = await waveContract.playSong(3);
    await songTxn.wait();

    songNumber = await waveContract.getPlaylistNumber();
};



const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  

  runMain();