*** Settings ***
Documentation     Test cases for User Login 
Resource          userLoginResource.robot
Resource          settingDefaultRateResource.robot
Library           SeleniumLibrary

*** Test Cases ***
AT-03: Set Default Rate With Positive Integer
    Open Login Page
    Login With Valid Credentials
    Set Default Rate To Value    ${POSITIVE_INTEGER}
    Should See Success Message
    Close Browser

AT-04: Set Default Rate With Floating Point Value
    Open Login Page
    Login With Valid Credentials
    Set Default Rate To Value    ${FLOAT_VALUE}
    Should See Success Message
    Close Browser

AT-05: Set Default Rate With Negative Value
    Open Login Page
    Login With Valid Credentials
    Set Default Rate To Value    ${NEGATIVE_VALUE}
    Should See Error Message
    Close Browser
