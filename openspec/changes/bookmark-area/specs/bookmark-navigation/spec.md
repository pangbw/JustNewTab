## ADDED Requirements

### Requirement: Default bookmark navigation behavior
The system SHALL open bookmarks in the current tab by default when clicked.

#### Scenario: Left-click on bookmark
- **WHEN** the user left-clicks on a bookmark
- **THEN** the system navigates the current tab to the bookmark URL

#### Scenario: Navigation feedback
- **WHEN** the user clicks a bookmark
- **THEN** the system shows a brief loading indicator before navigation

#### Scenario: Invalid URL handling
- **WHEN** the bookmark URL is invalid or unreachable
- **THEN** the system shows an error message: "Failed to open bookmark"

### Requirement: Keyboard modifier support
The system SHALL support keyboard modifiers for alternative navigation behavior.

#### Scenario: Ctrl+click (Windows/Linux)
- **WHEN** the user holds Ctrl and clicks a bookmark
- **THEN** the system opens the bookmark in a new tab

#### Scenario: Cmd+click (Mac)
- **WHEN** the user holds Cmd and clicks a bookmark
- **THEN** the system opens the bookmark in a new tab

#### Scenario: Shift+click
- **WHEN** the user holds Shift and clicks a bookmark
- **THEN** the system opens the bookmark in a new window

#### Scenario: Middle-click
- **WHEN** the user middle-clicks on a bookmark
- **THEN** the system opens the bookmark in a new tab

### Requirement: Configurable navigation mode
The system SHALL provide a setting to configure the default bookmark navigation behavior.

#### Scenario: Navigation setting location
- **WHEN** the user opens the settings panel
- **THEN** the system displays a "Bookmark Open Mode" setting with options

#### Scenario: Setting options
- **WHEN** the user views the navigation setting
- **THEN** the system shows three options: "Current Tab", "New Tab", "New Window"

#### Scenario: Default setting
- **WHEN** the user first installs the extension
- **THEN** the system sets the default navigation mode to "Current Tab"

### Requirement: Save navigation preference
The system SHALL persist the user's navigation preference.

#### Scenario: Save setting
- **WHEN** the user changes the navigation mode setting
- **THEN** the system saves the preference to localStorage

#### Scenario: Restore setting
- **WHEN** the user opens a new browser session
- **THEN** the system restores the saved navigation preference

#### Scenario: Setting sync across workspaces
- **WHEN** the user changes the navigation setting
- **THEN** the system applies the setting to all workspaces

### Requirement: Navigation mode application
The system SHALL apply the configured navigation mode when bookmarks are clicked.

#### Scenario: Current tab mode
- **WHEN** the navigation mode is set to "Current Tab" and user clicks a bookmark
- **THEN** the system navigates the current tab to the bookmark URL

#### Scenario: New tab mode
- **WHEN** the navigation mode is set to "New Tab" and user clicks a bookmark
- **THEN** the system opens a new tab with the bookmark URL

#### Scenario: New window mode
- **WHEN** the navigation mode is set to "New Window" and user clicks a bookmark
- **THEN** the system opens a new window with the bookmark URL

### Requirement: Bookmark hover preview
The system SHALL display the bookmark URL when the user hovers over a bookmark.

#### Scenario: Hover tooltip
- **WHEN** the user hovers over a bookmark
- **THEN** the system displays the full URL as a tooltip (title attribute)

#### Scenario: URL display format
- **WHEN** the tooltip is shown
- **THEN** the system displays the URL without protocol (e.g., "example.com/path" instead of "https://example.com/path")

### Requirement: Navigation history awareness
The system SHALL handle navigation within the new tab page.

#### Scenario: Browser back button
- **WHEN** the user navigates to a bookmark and clicks browser back
- **THEN** the system returns to the new tab page

#### Scenario: Navigation state preservation
- **WHEN** the user returns to the new tab page
- **THEN** the system restores the previous workspace and scroll position

### Requirement: Cross-browser navigation compatibility
The system SHALL handle navigation consistently across browsers.

#### Scenario: Chrome navigation
- **WHEN** running in Chrome
- **THEN** the system uses chrome.tabs.update() or window.location.href

#### Scenario: Firefox navigation
- **WHEN** running in Firefox
- **THEN** the system uses browser.tabs.update() or window.location.href

#### Scenario: Edge navigation
- **WHEN** running in Edge
- **THEN** the system uses chrome.tabs.update() or window.location.href
