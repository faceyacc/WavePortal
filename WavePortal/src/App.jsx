import React, { useEffect, useState } from 'react';
import abi from './utils/WavePortal.json';
import { ethers } from "ethers";
import './App.css';

import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';







const App = () => {
	const [currentAccount, setCurrentAccount] = useState("");
  const [waveCount, setWaveCount] = useState(0);
  const [allWaves, setAllWaves] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
	// Create a variable here that holds the contract address after you deploy
	const contractAddress = "0xA9b94E3E8A5FC4B5c27Eaad2a5D0246960840AC7";
  
	const contractABI = abi.abi;

	// Prompts user to connect to Metamask
	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			});

			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
      getAllWaves();
		} catch (error) {
			console.log(error);
		}
	};

	// Calls the wave function from the Smart Contract
	const wave = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();

				// Need abi and WavePortal contract address...
				const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);        

				let count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());

				// Execute the actual wave from the WavePortal smart contract
        const waveTxn = await wavePortalContract.wave(inputValue,{ gasLimit: 300000 });


        setWaveCount(waveCount + 1);
				console.log('Mining...', waveTxn.hash);

				await waveTxn.wait();
				console.log('Mined --', waveTxn.hash);
				count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};

  // Gets all waves from contract
  const getAllWaves = async () => {
    const { ethereum } = window;
  
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();
  
        const wavesCleaned = waves.map(wave => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });
  
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
};

  const clearWaves = async () => {
    setAllWaves([]);
  };

  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    let wavePortalContract;
  
    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on("NewWave", onNewWave);
    }
  
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
}, []);

 
	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<div className="header">👋 Hey there!</div>

				<div className="header">🎷 Play some Music!</div>
        
        <div className="bio">Your total Wave Count: { waveCount }?</div>

				<div className="bio">Ya like Jazz?</div>

				<button className="waveButton" onClick={ wave }>
					Wave at Me
				</button>

				<button className="jazzButton" onClick={clearWaves}>
					Clear Messages :(
				</button>
          
        <TextField value={inputValue} onInput={e => setInputValue(e.target.value)} id="standard-basic" label="Send a message :)" variant="standard" />         

				{!currentAccount && (
					<button className="waveButton" onClick={connectWallet}>
						Connect Wallet
					</button>      
				)}
        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>            
            </div>)
        })}   
        
			</div>
		</div>
	);
};

export default App;
