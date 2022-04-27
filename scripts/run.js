// Compile
// Deploy
// Execute


const main = async () => {

    // Compile 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    // Deploy
    const waveContract = await waveContractFactory.deploy(); // creates local Ethereum network
    await waveContract.deployed();

    // Execute
    console.log("Contract deployed to:", waveContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(2); // exit Node process while indicating 'Uncaught Fatal Exception"
    }
};

runMain();