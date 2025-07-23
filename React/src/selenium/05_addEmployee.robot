*** Settings ***
Library     SeleniumLibrary
Resource    userLoginResource.robot
Resource    addEmployeeResource.robot

*** Test Cases ***
AT-10: User input query is composed of valid values
    Open Login Page
    Login With Valid Credentials
    
    Submit Employee Form
    Close Browser

AT-11:  User input query is composed of invalid values 
    Open Login Page
    Login With Valid Credentials
    
    Submit Employee Form
    Close Browser
