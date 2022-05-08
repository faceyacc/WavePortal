// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 playlistNumber;
    Wave[] waves;

    constructor() {
        console.log("I am a contract and I am smart!");
    }

    event NewWave(address indexed from, uint256 timestamp, string message);


    struct Wave {
        address waver; // The address of the user who waved
        string message; // The message the user sent
        uint256 timestamp; // The timestamp when the user waved
    }


    function wave(string memory _message) public {
        totalWaves += 1;

        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Emit logs on sender
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