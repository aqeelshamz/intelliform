// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FormContract {
    address public formCreator; // The address of the form creator
    uint256 public minimumPayment;

    constructor(address _formCreator, uint256 _minimumPayment) {
        formCreator = _formCreator;
        minimumPayment = _minimumPayment;
    }

    // Function to allow users to register and pay
    function register() external payable {
        require(msg.value >= minimumPayment, "Payment must be at least the minimum required amount");
        payable(formCreator).transfer(msg.value);
    }

    // Function to check the contract's balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
`