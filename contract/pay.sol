// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FormContract {
    function register(address payable recipient) external payable {
        require(recipient != address(0), "Recipient address cannot be zero");
        recipient.transfer(msg.value);
    }

    // Function to check the contract's balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
