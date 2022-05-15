// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Validation {

    modifier examEligible(bool _feePaid, bool _attend){
        require(_feePaid == true, "Please complete the exam fees payment");
        require(_attend == false, "You are already attended the exam");
        _;
    }

    modifier examCompleted(bool _attend){
        require(_attend == true, "Please finish exam first");
        _;
    }

}