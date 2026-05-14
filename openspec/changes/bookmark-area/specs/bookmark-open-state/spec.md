## ADDED Requirements

### Requirement: Detect open tabs
The system SHALL detect which bookmarks are currently open in browser tabs.

#### Scenario: Query open tabs
- **WHEN** the bookmark area is loaded or a tab is opened/closed
- **THEN** the system queries all open browser tabs and compares their URLs with bookmark URLs

#### Scenario: URL matching
- **WHEN** comparing tabs and bookmarks
- **THEN** the system matches URLs ignoring protocol (http/https), trailing slashes, and fragments

#### Scenario: Real-time updates
- **WHEN** a tab is opened or closed
- **THEN** the system updates the open state of affected bookmarks within 500ms

### Requirement: Highlight open bookmarks
The system SHALL visually highlight bookmarks that are currently open in browser tabs.

#### Scenario: Open bookmark styling
- **WHEN** a bookmark is detected as open
- **THEN** the system applies a distinct visual style (e.g., colored border, background highlight, bold title)

#### Scenario: Multiple tabs with same URL
- **WHEN** multiple tabs have the same URL as a bookmark
- **THEN** the system still shows the bookmark as open (once)

#### Scenario: Highlight animation
- **WHEN** a bookmark's open state changes
- **THEN** the system shows a smooth transition animation

### Requirement: Close tab button
The system SHALL display a close button on bookmarks that are currently open.

#### Scenario: Close button visibility
- **WHEN** a bookmark is detected as open
- **THEN** the system displays a close icon (X) on the right side of the bookmark

#### Scenario: Close button positioning
- **WHEN** the close button is displayed
- **THEN** the system positions it at the right edge of the bookmark item, vertically centered

#### Scenario: Close button hover effect
- **WHEN** the user hovers over the close button
- **THEN** the system highlights the button with a distinct hover effect

### Requirement: Close tab action
The system SHALL close the browser tab when the user clicks the close button.

#### Scenario: Close tab on click
- **WHEN** the user clicks the close button on an open bookmark
- **THEN** the system closes the corresponding browser tab and removes the open highlight

#### Scenario: Close confirmation
- **WHEN** the user clicks the close button
- **THEN** the system closes the tab immediately without confirmation (standard browser behavior)

#### Scenario: Close error handling
- **WHEN** the system fails to close the tab (e.g., permission denied)
- **THEN** the system shows an error message: "Failed to close tab"

### Requirement: Tab store management
The system SHALL maintain a store of currently open tab URLs.

#### Scenario: Initialize tab store
- **WHEN** the extension is loaded
- **THEN** the system queries all open tabs and populates the tab store

#### Scenario: Update on tab creation
- **WHEN** a new tab is created
- **THEN** the system adds the tab URL to the tab store

#### Scenario: Update on tab removal
- **WHEN** a tab is closed
- **THEN** the system removes the tab URL from the tab store

#### Scenario: Update on tab URL change
- **WHEN** a tab's URL changes (navigation)
- **THEN** the system updates the tab store accordingly

### Requirement: Performance optimization
The system SHALL optimize tab detection for performance.

#### Scenario: Debounced updates
- **WHEN** multiple tab events occur in quick succession
- **THEN** the system debounces tab store updates (500ms delay)

#### Scenario: Efficient URL lookup
- **WHEN** checking if a bookmark is open
- **THEN** the system uses a Set data structure for O(1) URL lookup

#### Scenario: Conditional polling
- **WHEN** the bookmark area is not visible
- **THEN** the system pauses tab detection to save resources

### Requirement: Cross-browser compatibility
The system SHALL work consistently across Chrome, Edge, and Firefox.

#### Scenario: Chrome tab API
- **WHEN** running in Chrome
- **THEN** the system uses chrome.tabs API via webextension-polyfill

#### Scenario: Firefox tab API
- **WHEN** running in Firefox
- **THEN** the system uses browser.tabs API via webextension-polyfill

#### Scenario: Permission handling
- **WHEN** the tabs permission is not granted
- **THEN** the system gracefully disables open state features and shows a permission prompt
