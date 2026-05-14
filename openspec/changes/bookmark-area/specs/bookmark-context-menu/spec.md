## ADDED Requirements

### Requirement: Context menu display on bookmark area
The system SHALL display a context menu when the user right-clicks on the bookmark area.

#### Scenario: Right-click on empty area
- **WHEN** the user right-clicks on an empty area of the bookmark area
- **THEN** the system displays a context menu with options: "Create Block" and "Create Bookmark"

#### Scenario: Right-click on bookmark block
- **WHEN** the user right-clicks on a bookmark block
- **THEN** the system displays a context menu with options: "Edit Block", "Delete Block", "Add Bookmark", "Collapse/Expand"

#### Scenario: Right-click on bookmark item
- **WHEN** the user right-clicks on a bookmark item
- **THEN** the system displays a context menu with options: "Edit Bookmark", "Delete Bookmark", "Open in New Tab", "Copy URL"

### Requirement: Context menu positioning
The system SHALL position the context menu near the click location.

#### Scenario: Menu appears at click position
- **WHEN** the user right-clicks at a specific location
- **THEN** the system displays the context menu at the click position

#### Scenario: Menu stays within viewport
- **WHEN** the context menu would extend beyond the viewport
- **THEN** the system adjusts the menu position to stay within the viewport

### Requirement: Context menu item actions
The system SHALL execute the corresponding action when a context menu item is clicked.

#### Scenario: Create Block action
- **WHEN** the user clicks "Create Block" in the context menu
- **THEN** the system creates a new bookmark block at the click position

#### Scenario: Create Bookmark action
- **WHEN** the user clicks "Create Bookmark" in the context menu
- **THEN** the system shows a dialog to enter bookmark title and URL

#### Scenario: Edit Block action
- **WHEN** the user clicks "Edit Block" in the context menu
- **THEN** the system enables editing of the block name

#### Scenario: Delete Block action
- **WHEN** the user clicks "Delete Block" in the context menu
- **THEN** the system deletes the bookmark block after confirmation

#### Scenario: Add Bookmark action
- **WHEN** the user clicks "Add Bookmark" in the context menu
- **THEN** the system shows a dialog to add a bookmark to the block

#### Scenario: Edit Bookmark action
- **WHEN** the user clicks "Edit Bookmark" in the context menu
- **THEN** the system shows a dialog to edit the bookmark title and URL

#### Scenario: Delete Bookmark action
- **WHEN** the user clicks "Delete Bookmark" in the context menu
- **THEN** the system deletes the bookmark after confirmation

#### Scenario: Open in New Tab action
- **WHEN** the user clicks "Open in New Tab" in the context menu
- **THEN** the system opens the bookmark URL in a new browser tab

#### Scenario: Copy URL action
- **WHEN** the user clicks "Copy URL" in the context menu
- **THEN** the system copies the bookmark URL to the clipboard

### Requirement: Context menu dismissal
The system SHALL dismiss the context menu when the user clicks outside of it.

#### Scenario: Click outside menu
- **WHEN** the user clicks outside the context menu
- **THEN** the system closes the context menu

#### Scenario: Press Escape key
- **WHEN** the user presses the Escape key while the context menu is open
- **THEN** the system closes the context menu

### Requirement: Default prompt when no blocks exist
The system SHALL display a default prompt when the bookmark area has no bookmark blocks.

#### Scenario: Empty bookmark area
- **WHEN** the bookmark area has no bookmark blocks
- **THEN** the system displays a prompt message: "Right-click to open menu and create bookmarks"

#### Scenario: Prompt disappears when blocks are created
- **WHEN** the user creates a bookmark block
- **THEN** the system hides the prompt message

### Requirement: Context menu styling
The system SHALL style the context menu consistently with the application theme.

#### Scenario: Menu appearance
- **WHEN** the context menu is displayed
- **THEN** the system shows the menu with consistent styling (background, border, shadow, font)

#### Scenario: Menu item hover effect
- **WHEN** the user hovers over a menu item
- **THEN** the system highlights the menu item with a hover effect

### Requirement: Context menu animation
The system SHALL animate the context menu appearance.

#### Scenario: Menu appearance animation
- **WHEN** the context menu appears
- **THEN** the system shows a smooth fade-in and scale animation

#### Scenario: Menu dismissal animation
- **WHEN** the context menu is dismissed
- **THEN** the system shows a smooth fade-out animation
