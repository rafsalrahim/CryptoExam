// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


interface ExamController {

    event pauseExamEvent(string);

    event unPauseExamEvent(string);

    function getBalance() external returns(uint256);

    function PauseExam() external;

    function unPauseExam() external;
    
    function checkExamPaused() external returns(bool);



}