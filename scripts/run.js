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

    // contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    // console.log(
    //   "Contract balance:", 
    //   hre.ethers.utils.formatEther(contractBalance)
    // );

    const donateTxn = await waveContract.donate(hre.ethers.utils.parseEther("0.34"));
    await donateTxn.wait();

    const balance = await waveContract.getBalance();

    console.log(balance);


    
    console.log(
      "Contract balance:", 
      hre.ethers.utils.formatEther(balance)
    );


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