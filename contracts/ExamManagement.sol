// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./common/Pausable.sol";
import "./common/Ownable.sol";
import "./Student.sol";
import "./ExamController.sol";
import "./Validation.sol";

contract ExamManagement is Pausable, Ownable, Student, ExamController, Validation{
    uint256 private balance;
    uint private num_qus;
    string private q_hash;
    uint256[] private ans_key;
    uint private fee;
    mapping(address => StudentData) private stdData;

    /**
     * @dev Sets the values for {num_qus}, {q_hash}, {ans_key} and {fee}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All four of these values are immutable: they can only be set once during
     * construction.
     */

    constructor(uint _num_qus, string memory _q_hash, uint256[] memory _ans_key, uint _fee){
        require(_num_qus == _ans_key.length, "Please check number of questions and answer key count");
        num_qus = _num_qus;
        q_hash = _q_hash;
        ans_key = _ans_key;
        fee = _fee;
    }

    function registerStudent(
        string memory _email)
        public virtual override whenNotPaused{
            StudentData memory std1;
            std1.wallet = msg.sender;
            std1.email = _email;
            stdData[msg.sender] = std1;
            emit registerStudentEvent(msg.sender, stdData[msg.sender]);
        }

    function getStudent(address _wallet) 
        public view onlyOwner
        returns(StudentData memory){
            return stdData[_wallet];
    }

    function getProfile() 
        public view virtual override
        returns(StudentData memory){
            return stdData[msg.sender];
        }

    function attendExam() 
        public view virtual override whenNotPaused examEligible(stdData[msg.sender].feePaid, stdData[msg.sender].attempt)
        returns(string memory){
            return q_hash;
    }

    function submitExam(uint _ans)
        public virtual override whenNotPaused examEligible(stdData[msg.sender].feePaid, stdData[msg.sender].attempt){
            stdData[msg.sender].ans.push(_ans);
            emit quesSubmitEvent(msg.sender, _ans);
            if (stdData[msg.sender].ans.length == num_qus){
                stdData[msg.sender].attempt = true;
                emit submitExamEvent(msg.sender, stdData[msg.sender].ans);
            }            
    }

    function generateResult()
        public virtual override whenNotPaused examCompleted(stdData[msg.sender].attempt){
            uint result  = resultCalculation();
            stdData[msg.sender].result = result;
            emit resultEvent(msg.sender, result);

        }

    function resultCalculation() private view returns(uint) {
        uint count;
        uint[] memory _ans = stdData[msg.sender].ans;
        for(uint i = 0; i < _ans.length; i++){
            if(_ans[i] == ans_key[i]){
                count+=1;
            }
        }
        uint result = (count * 100)/num_qus;
        return result;
    }


    function feePayment() public virtual override payable whenNotPaused {
        //require((fee + 20 * (1 ether)) == msg.value, "Please pay the correct fee amount");
        balance += msg.value;
        stdData[msg.sender].feePaid = true;
        emit feePaymentEvent(msg.sender, msg.value);
    }
    
    function getContractAddress() public view returns(address){
        return address(this);
    }

    function getBalance() 
        public view virtual override onlyOwner returns(uint256){
            return address(this).balance;
    }

    function PauseExam() public virtual override onlyOwner {
        emit pauseExamEvent("Exam Paused");
        _pause();
    }

    function checkExamPaused() public view virtual override returns(bool){
        return paused();
    }

    function unPauseExam() public virtual override onlyOwner {
        emit unPauseExamEvent("Exam unpaused");
        _unpause();
    }


}