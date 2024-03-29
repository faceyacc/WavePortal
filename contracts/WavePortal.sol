// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 private seed;
    uint256 playlistNumber;
    Wave[] waves;
    
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved
        string message; // The message the user sent
        uint256 timestamp; // The timestamp when the user waved
    }

    mapping(address => uint256) public lastWavedAt;



    constructor() payable {
        console.log("I am a contract and I am smart!");

        // Set the inital seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        // Create cool-down mechanism
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");

        lastWavedAt[msg.sender] = block.timestamp;
        
        totalWaves += 1;


        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));


        // Generate a new seed for the next user that send a wave
        seed = (block.difficulty + block.timestamp + seed) % 100;


        // Give a 50% chance that the user winds the price
        if(seed <= 50) {
            console.log("%s won!", msg.sender);
            
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");            
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // Returns struct array of wave 
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    // Gets the current song number
    function getPlaylistNumber() public view returns (uint256) {
        console.log("You are grooving to %d", playlistNumber);
        return playlistNumber;
    }

    // Plays new song 
    function playSong(uint _songNumber) public {
        playlistNumber = _songNumber;
        console.log("%s has selected %d", msg.sender, playlistNumber);
    }


}