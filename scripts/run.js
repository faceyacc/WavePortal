// Compile
// Deploy
// Execute

const main = async () => {

    const [_, randomPerson] = await hre.ethers.getSigners();

    // Compile 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    // Deploy
    const waveContract = await waveContractFactory.deploy(); // creates local Ethereum network
    await waveContract.deployed();

    // Execute
    console.log("Contract deployed to:", waveContract.address);
    

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
  

    let waveTxn = await waveContract.wave("A message");
    await waveTxn.wait();
    
    // waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Make this world a better place!!");
    await waveTxn.wait()

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