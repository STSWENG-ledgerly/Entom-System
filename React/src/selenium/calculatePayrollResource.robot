*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${}


*** Keywords ***
Navigate To Calculate Payroll Page
    Click Button            id:calculate-payroll-button

Query with valid input
    Input Text
    Click Button        id:search-by-id-button

Query with invalid input
    Input Text
    Click Button        id:search-by-id-button
