*** Settings ***
Documentation     Test cases for Account Registration
Resource          userLoginResource.robot
Resource          accountRegistrationResource.robot
Library           SeleniumLibrary

*** Test Cases ***
AT-12: User input query is composed of valid values
    Open Login Page

    
    [Teardown]      Close Browser
