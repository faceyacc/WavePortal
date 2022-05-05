// Compile
// Deploy
// Execute

const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();

    // Compile 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    // Deploy
    const waveContract = await waveContractFactory.deploy(); // creates local Ethereum network
    await waveContract.deployed();

    // Execute
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves();


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