// Compile
// Deploy
// Execute

const main = async () => {

    // Compile 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    

    // Deploy

    // creates local Ethereum network and funds it 
    const waveContract = await waveContractFactory.deploy({ 
      value: hre.ethers.utils.parseEther("0.001"),
    }); 
    await waveContract.deployed();

    // Execute
    console.log("Contract deployed to:", waveContract.address);






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