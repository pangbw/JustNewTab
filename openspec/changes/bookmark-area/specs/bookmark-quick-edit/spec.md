## ADDED Requirements

### Requirement: Quick edit card display on right-click
The system SHALL display a quick edit card when the user right-clicks on a bookmark item.

#### Scenario: Right-click on bookmark
- **WHEN** the user right-clicks on a bookmark item
- **THEN** the system displays a floating edit card near the bookmark with fields for display title, URL, and description

#### Scenario: Card positioning
- **WHEN** the quick edit card is displayed
- **THEN** the system positions the card to the right of the bookmark, ensuring it stays within the viewport

#### Scenario: Card animation
- **WHEN** the quick edit card appears
- **THEN** the system shows a smooth fade-in and scale animation

### Requirement: Edit bookmark display title
The system SHALL allow users to edit the bookmark's display title in the quick edit card.

#### Scenario: Display title field
- **WHEN** the quick edit card is shown
- **THEN** the system displays an input field with the current bookmark title

#### Scenario: Modify display title
- **WHEN** the user modifies the display title
- **THEN** the system accepts the new title (max 100 characters)

#### Scenario: Empty title validation
- **WHEN** the user clears the display title field
- **THEN** the system shows an error: "Display title cannot be empty"

### Requirement: Edit bookmark URL
The system SHALL allow users to edit the bookmark URL in the quick edit card.

#### Scenario: URL field
- **WHEN** the quick edit card is shown
- **THEN** the system displays an input field with the current bookmark URL

#### Scenario: Modify URL
- **WHEN** the user modifies the URL
- **THEN** the system accepts the new URL

#### Scenario: URL validation
- **WHEN** the user enters an invalid URL
- **THEN** the system shows an error: "Please enter a valid URL"

#### Scenario: URL format normalization
- **WHEN** the user enters a URL without protocol
- **THEN** the system automatically adds "https://" prefix

### Requirement: Edit bookmark description
The system SHALL allow users to edit the bookmark description in the quick edit card.

#### Scenario: Description field
- **WHEN** the quick edit card is shown
- **THEN** the system displays a textarea field with the current bookmark description

#### Scenario: Modify description
- **WHEN** the user modifies the description
- **THEN** the system accepts the new description (max 500 characters)

#### Scenario: Description character count
- **WHEN** the user is typing in the description field
- **THEN** the system displays a character count indicator

### Requirement: Save bookmark changes
The system SHALL save bookmark changes when the user confirms or clicks outside the card.

#### Scenario: Save on Enter key
- **WHEN** the user presses Enter while editing a field
- **THEN** the system saves all changes and closes the card

#### Scenario: Save on click outside
- **WHEN** the user clicks outside the quick edit card
- **THEN** the system saves all changes and closes the card

#### Scenario: Save confirmation
- **WHEN** the system saves bookmark changes
- **THEN** the system updates the bookmark in the store and shows a brief success indicator

### Requirement: Cancel bookmark editing
The system SHALL allow users to cancel bookmark editing.

#### Scenario: Cancel on Escape key
- **WHEN** the user presses Escape while the card is open
- **THEN** the system discards all changes and closes the card

#### Scenario: Cancel confirmation
- **WHEN** the user has made changes and presses Escape
- **THEN** the system discards changes without confirmation (changes are not saved until Enter or click outside)

### Requirement: Edit card validation
The system SHALL validate all fields before saving.

#### Scenario: Validate all fields
- **WHEN** the user attempts to save changes
- **THEN** the system validates display title (non-empty, max 100 chars), URL (valid format), and description (max 500 chars)

#### Scenario: Show validation errors
- **WHEN** validation fails
- **THEN** the system highlights the invalid fields and shows error messages

#### Scenario: Prevent save on validation error
- **WHEN** validation fails
- **THEN** the system keeps the card open and prevents saving

### Requirement: Quick edit card dismissal
The system SHALL dismiss the quick edit card when the user clicks outside of it.

#### Scenario: Click outside card
- **WHEN** the user clicks outside the quick edit card
- **THEN** the system saves changes and closes the card

#### Scenario: Click on another bookmark
- **WHEN** the user clicks on another bookmark while editing
- **THEN** the system saves changes to the current bookmark and opens the edit card for the new bookmark
