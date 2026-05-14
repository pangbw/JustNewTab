## ADDED Requirements

### Requirement: Quick config icon display
The system SHALL display a quick config icon on each bookmark block.

#### Scenario: Icon location
- **WHEN** a bookmark block is displayed
- **THEN** the system shows a quick config icon (gear or pencil) at the top right corner of the block

#### Scenario: Icon visibility
- **WHEN** the user hovers over a bookmark block
- **THEN** the system shows the quick config icon with a fade-in animation

### Requirement: Quick config card display
The system SHALL display a configuration card when the user clicks the quick config icon.

#### Scenario: Show config card
- **WHEN** the user clicks the quick config icon
- **THEN** the system displays a floating configuration card below the icon

#### Scenario: Card positioning
- **WHEN** the configuration card is displayed
- **THEN** the system positions the card so it stays within the viewport

#### Scenario: Card animation
- **WHEN** the configuration card appears
- **THEN** the system shows a smooth fade-in and scale animation

### Requirement: Block name editing
The system SHALL allow users to edit the block name in the configuration card.

#### Scenario: Edit block name
- **WHEN** the user clicks the quick config icon and the card appears
- **THEN** the system shows an input field with the current block name

#### Scenario: Save block name
- **WHEN** the user modifies the block name and presses Enter or clicks Save
- **THEN** the system saves the new name and updates the block title

#### Scenario: Cancel name edit
- **WHEN** the user presses Escape or clicks Cancel
- **THEN** the system discards the changes and closes the card

### Requirement: Block color editing
The system SHALL allow users to edit the block color in the configuration card.

#### Scenario: Show color options
- **WHEN** the configuration card is displayed
- **THEN** the system shows a color palette with predefined colors

#### Scenario: Select color
- **WHEN** the user clicks on a color in the palette
- **THEN** the system applies the color to the block header and saves it

#### Scenario: Custom color
- **WHEN** the user clicks "Custom Color"
- **THEN** the system shows a color picker for custom color selection

### Requirement: Block icon editing
The system SHALL allow users to edit the block icon in the configuration card.

#### Scenario: Show icon options
- **WHEN** the configuration card is displayed
- **THEN** the system shows a selection of predefined icons

#### Scenario: Select icon
- **WHEN** the user clicks on an icon
- **THEN** the system applies the icon to the block and saves it

#### Scenario: Remove icon
- **WHEN** the user clicks "Remove Icon"
- **THEN** the system removes the icon from the block

### Requirement: Block layout options
The system SHALL allow users to configure block layout in the configuration card.

#### Scenario: Grid layout option
- **WHEN** the user selects "Grid Layout"
- **THEN** the system displays bookmarks in a grid format

#### Scenario: List layout option
- **WHEN** the user selects "List Layout"
- **THEN** the system displays bookmarks in a list format

#### Scenario: Save layout preference
- **WHEN** the user changes the layout option
- **THEN** the system saves the preference and applies it immediately

### Requirement: Quick config card dismissal
The system SHALL dismiss the configuration card when the user clicks outside of it.

#### Scenario: Click outside card
- **WHEN** the user clicks outside the configuration card
- **THEN** the system closes the card and saves any pending changes

#### Scenario: Press Escape key
- **WHEN** the user presses Escape while the card is open
- **THEN** the system closes the card and discards unsaved changes

### Requirement: Configuration persistence
The system SHALL persist block configurations across sessions.

#### Scenario: Save configuration
- **WHEN** the user modifies block configuration
- **THEN** the system saves the changes to local storage immediately

#### Scenario: Restore configuration
- **WHEN** the user closes and reopens the browser
- **THEN** the system restores all block configurations (name, color, icon, layout)

### Requirement: Quick config validation
The system SHALL validate user input in the configuration card.

#### Scenario: Validate block name
- **WHEN** the user enters an empty block name
- **THEN** the system shows an error message: "Block name cannot be empty"

#### Scenario: Validate block name length
- **WHEN** the user enters a block name longer than 50 characters
- **THEN** the system shows an error message: "Block name must be 50 characters or less"

#### Scenario: Validate block name uniqueness
- **WHEN** the user enters a block name that already exists in the workspace
- **THEN** the system shows an error message: "Block name already exists"

### Requirement: Quick config undo
The system SHALL allow users to undo configuration changes.

#### Scenario: Undo last change
- **WHEN** the user presses Ctrl+Z while the card is open
- **THEN** the system undoes the last configuration change

#### Scenario: Reset to defaults
- **WHEN** the user clicks "Reset to Defaults"
- **THEN** the system resets all block configurations to default values
