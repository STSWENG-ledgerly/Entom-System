*** Settings ***
Documentation     Test cases for User Login 
Resource          userLoginResource.robot
Resource          calculatePayrollResource.robot
Library           SeleniumLibrary

*** Test Cases ***
AT-06: Generate Payroll With Valid Inputs
    Open Login Page
    Login With Valid Credentials
    
    Close Browser

AT-07: Set Default Rate With Floating Point Value
    Open Login Page
    Login With Valid Credentials
    
    Close Browser
