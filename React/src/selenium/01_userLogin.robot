*** Settings ***
Documentation     Test cases for User Login 
Resource          userLoginResource.robot
Library           SeleniumLibrary

*** Test Cases ***
AT-01: User Login With Valid Credentials
    [Documentation]    This test checks if login works with correct credentials
    Open Login Page
    Login With Valid Credentials
    Should Be Redirected To Main Menu
    Close Browser

AT-02: User Login With Invalid Credentials
    [Documentation]    This test checks if login works with incorrect credentials
    Open Login Page
    Login With Invalid Credentials
    Should Stay On Login Page With Error
    Close Browser

