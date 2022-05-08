// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Student.sol";

contract ExamManagement is Pausable, Ownable, Student{
    uint256 public balance;
    uint private num_qus;
    string private q_hash;
    uint[] private ans_key;
    uint private fee;

    /**
     * @dev Sets the values for {num_qus}, {q_hash}, {ans_key} and {fee}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All four of these values are immutable: they can only be set once during
     * construction.
     */

    constructor(uint _num_qus, string memory _q_hash, uint[] memory _ans_key, uint _fee){
        num_qus = _num_qus;
        q_hash = _q_hash;
        ans_key = _ans_key;
        fee = _fee;
    }


    function feePayment() public virtual override payable whenNotPaused {
        //require((fee + 20 * (1 ether)) == msg.value, "Please pay the correct fee amount");
        balance += msg.value;
        emit feePaymentEvent(msg.sender, msg.value);
    }
    
    function getContractAddress() public view returns(address){
        return address(this);
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    function PauseExam() public onlyOwner {
        _pause();
    }

    function checkExamPaused() public view returns(bool){
        return paused();
    }

    function unpauseExam() public onlyOwner {
        _unpause();
    }


}