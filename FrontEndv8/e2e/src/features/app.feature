Feature: IM Viewer

  Scenario: Initialization smoke test
    Given I am on the home page
    When I do nothing
    Then I should see the title
    And I should get the following tree nodes
      | Health record |

  Scenario: Search for concept
    Given I am on the home page
    When I search for "hospital"
    Then I should get the following search results
      | Hospital admission entry |
      | Hospital discharge entry |
      | Hospital outpatient entry |
      | Hospital inpatient stay entry |

  Scenario: Select search result to show in tree
    Given I am on the home page
    When I search for "hospital"
    And I select search result "Hospital discharge entry"
    Then I should get the following tree nodes
      | Health record |
      | Record entry |
      | Health event entry |
      | Encounter entry |
      | Hospital discharge entry |


  Scenario: Select tree node to display details
    Given I am on the home page
    When I search for "hospital"
    And I select search result "Hospital discharge entry"
    And I select tree node "Encounter entry"
    Then I should get concept ID "rm:EncounterEntry"
    And I should get concept name "Encounter entry"
    And I should get concept description "A record entry about an encounter, which is an interaction between a patient (or"
