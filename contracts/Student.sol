// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface Student {

    struct StudentData{
        address wallet;
        string email;
        bool feePaid;
        uint256[] ans;
        bool attempt;
        uint result;
    }
    
    event registerStudentEvent(address _wallet,StudentData data);

    event feePaymentEvent(address from, uint amount);

    event quesSubmitEvent(address wallet, uint ans);

    event submitExamEvent(address wallet, uint256[] ans);

    event resultEvent(address wallet, uint result);

    function registerStudent(
        string memory _email)
        external;

    function getProfile() external view returns(StudentData memory);

    function feePayment() external payable;

    function attendExam() external view returns(string memory);

    function submitExam(uint256 _ans) external;

    function generateResult() external;
    
}