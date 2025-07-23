*** Settings ***
Documentation     Test cases for User Login 
Resource          userLoginResource.robot
Resource          viewPayrollHistoryResource.robot
Library           SeleniumLibrary

*** Test Cases ***
AT-08: User input query is composed of valid values
    Open Login Page
    Login With Valid Credentials
    
    Close Browser

AT-09: User input query is composed of invalid values
    Open Login Page
    Login With Valid Credentials
    
    Close Browser
