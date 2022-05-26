// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract WavePortal {
    mapping (address => uint256) public paymentsOf;
    mapping (address => uint256) public donationsBy;

    address payable public owner;
    uint256 public balance;
    uint256 public withdrawn;
    uint256 public totalDonations = 0;
    uint256 public totalWithdrawal = 0;

    event Donation(
        uint256 id,
        address indexed to,
        address indexed from,
        uint256 amount,
        uint256 timestamp
    );

    event Withdrawal(
        uint256 id,
        address indexed to,
        address indexed from,
        uint256 amount,
        uint256 timestamp
    );

    constructor() payable {
        owner = payable(msg.sender);
    }

    function donate(uint256 amount) payable public {
        // amount = amount / 1 ether;
        require(amount > 0, "Donation cannot be zero!");
        
        paymentsOf[msg.sender] += amount;
        donationsBy[msg.sender] += 1;
        balance += amount;
        totalDonations++;

        emit Donation(
            totalDonations, 
            address(this), 
            msg.sender, 
            amount, 
            block.timestamp
        );
    }

    function withdraw(uint256 amount) external returns (bool) {
        require(msg.sender == owner, "Unauthorized!");
        require(balance >= amount, "Insufficient balance");

        balance -= amount;
        withdrawn += amount;
        owner.transfer(amount);
        totalWithdrawal++;

        emit Withdrawal(
            totalWithdrawal,
            msg.sender, 
            address(this),
            amount, 
            block.timestamp
        );
        return true;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }
}