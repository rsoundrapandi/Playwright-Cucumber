
Feature: Login

  @negative
  Scenario Outline: Login with invalid credentials

    Given I open the login page
    When I login with username "<username>" and password "<password>"
    Then I should see the login error message

    Examples:
      | username   | password      |
      | wrong_user | wrong_pass    |
      | test_user  | test_password |

  @negative
  Scenario Outline: Login with invalid1 credentials

    Given I open the login page
    When I login with username "<username>" and password "<password>"
    Then I should see the login error message

    Examples:
      | username   | password      |
      | wrong_user | wrong_pass    |
      | test_user  | test_password |

  @postive
  Scenario Outline: Login with invalid2 credentials

    Given I open the login page
    When I login with username "<username>" and password "<password>"
    Then I should see the login error message

    Examples:
      | username   | password      |
      | wrong_user | wrong_pass    |
      | test_user  | test_password |