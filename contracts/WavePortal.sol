// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 playlistNumber;

    constructor() {
        console.log("I am a contract and I am smart!");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
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
        console.log("%s is selected %d", msg.sender, playlistNumber);
    }


}