## ADDED Requirements

### Requirement: Search box display
The system SHALL display a search box at the top of the bookmark area.

#### Scenario: Search box location
- **WHEN** the bookmark area is loaded
- **THEN** the system displays a search box at the top right, next to the configuration button

#### Scenario: Search box placeholder
- **WHEN** the search box is empty
- **THEN** the system displays placeholder text: "Search bookmarks..."

### Requirement: Search input
The system SHALL allow users to enter search queries in the search box.

#### Scenario: Type search query
- **WHEN** the user types a search query in the search box
- **THEN** the system accepts the input and prepares to search

#### Scenario: Clear search query
- **WHEN** the user clicks the clear button in the search box
- **THEN** the system clears the search query and shows all bookmarks

### Requirement: Search execution
The system SHALL execute search when the user submits the query.

#### Scenario: Search on Enter key
- **WHEN** the user presses Enter while the search box is focused
- **THEN** the system executes the search and displays results

#### Scenario: Search on button click
- **WHEN** the user clicks the search button
- **THEN** the system executes the search and displays results

### Requirement: Search results display
The system SHALL display search results in the bookmark area.

#### Scenario: Show matching bookmarks
- **WHEN** the search finds matching bookmarks
- **THEN** the system displays only the matching bookmarks, grouped by their blocks

#### Scenario: No results found
- **WHEN** the search finds no matching bookmarks
- **THEN** the system displays a message: "No bookmarks found for '[query]'"

#### Scenario: Search result highlighting
- **WHEN** search results are displayed
- **THEN** the system highlights the matching text in bookmark titles and URLs

### Requirement: Search scope
The system SHALL search across all bookmark blocks in the current workspace.

#### Scenario: Search in current workspace
- **WHEN** the user searches for a query
- **THEN** the system searches only in the current workspace's bookmark blocks

#### Scenario: Search across all blocks
- **WHEN** the user searches for a query
- **THEN** the system searches in all bookmark blocks, including collapsed blocks

### Requirement: Search filtering
The system SHALL filter bookmarks based on the search query.

#### Scenario: Filter by title
- **WHEN** the user searches for a query
- **THEN** the system filters bookmarks where the title contains the query (case-insensitive)

#### Scenario: Filter by URL
- **WHEN** the user searches for a query
- **THEN** the system filters bookmarks where the URL contains the query (case-insensitive)

### Requirement: Real-time search
The system SHALL provide real-time search suggestions as the user types.

#### Scenario: Show suggestions while typing
- **WHEN** the user types at least 3 characters
- **THEN** the system shows a dropdown with matching bookmark suggestions

#### Scenario: Select suggestion
- **WHEN** the user clicks on a suggestion
- **THEN** the system fills the search box with the suggestion and executes the search

### Requirement: Search history
The system SHALL remember recent search queries.

#### Scenario: Show recent searches
- **WHEN** the user focuses on the empty search box
- **THEN** the system shows a dropdown with the 5 most recent search queries

#### Scenario: Clear search history
- **WHEN** the user clicks "Clear History" in the search dropdown
- **THEN** the system clears all search history

### Requirement: Search performance
The system SHALL perform searches efficiently without blocking the UI.

#### Scenario: Search response time
- **WHEN** the user executes a search
- **THEN** the system displays results within 50ms for up to 1000 bookmarks

#### Scenario: Debounced search
- **WHEN** the user types quickly in the search box
- **THEN** the system debounces the search to avoid excessive API calls

### Requirement: Search state persistence
The system SHALL persist the search state across sessions.

#### Scenario: Restore search query
- **WHEN** the user closes and reopens the browser
- **THEN** the system restores the last search query and results

#### Scenario: Clear search on workspace switch
- **WHEN** the user switches to a different workspace
- **THEN** the system clears the search query and shows all bookmarks
