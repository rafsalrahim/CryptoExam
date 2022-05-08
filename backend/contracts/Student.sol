// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface Student {

    event feePaymentEvent(address from, uint amount);

    function feePayment() external payable;

    
}