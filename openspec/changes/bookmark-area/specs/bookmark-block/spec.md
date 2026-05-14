## ADDED Requirements

### Requirement: Create bookmark block
The system SHALL allow users to create new bookmark blocks within a workspace.

#### Scenario: Create block via context menu
- **WHEN** the user right-clicks on the bookmark area and selects "Create Block"
- **THEN** the system creates a new bookmark block with a default name and color

#### Scenario: Create block via button
- **WHEN** the user clicks the "Add Block" button
- **THEN** the system creates a new bookmark block at the next available position

### Requirement: Edit bookmark block
The system SHALL allow users to edit bookmark block properties.

#### Scenario: Edit block name
- **WHEN** the user double-clicks on a block title
- **THEN** the system enables inline editing of the block name

#### Scenario: Save block name
- **WHEN** the user finishes editing and presses Enter or clicks away
- **THEN** the system saves the new block name

### Requirement: Delete bookmark block
The system SHALL allow users to delete bookmark blocks.

#### Scenario: Delete block via context menu
- **WHEN** the user right-clicks on a bookmark block and selects "Delete Block"
- **THEN** the system deletes the block and all its bookmarks

#### Scenario: Delete confirmation
- **WHEN** the user attempts to delete a block with bookmarks
- **THEN** the system shows a confirmation dialog before deletion

### Requirement: Bookmark block dragging
The system SHALL allow users to drag bookmark blocks to reposition them.

#### Scenario: Drag block
- **WHEN** the user drags a bookmark block to a new position
- **THEN** the system moves the block to the new position and updates the layout

#### Scenario: Drag feedback
- **WHEN** the user is dragging a block
- **THEN** the system shows visual feedback (ghost element, drop zone highlight)

#### Scenario: Invalid drop position
- **WHEN** the user tries to drop a block outside the bookmark area
- **THEN** the system cancels the drag and returns the block to its original position

### Requirement: Bookmark block collapse/expand
The system SHALL allow users to collapse and expand bookmark blocks.

#### Scenario: Collapse block
- **WHEN** the user clicks the collapse button on a block
- **THEN** the system collapses the block, hiding its bookmarks and showing only the title

#### Scenario: Expand block
- **WHEN** the user clicks the expand button on a collapsed block
- **THEN** the system expands the block, showing all its bookmarks

#### Scenario: Collapse/expand animation
- **WHEN** the user collapses or expands a block
- **THEN** the system shows a smooth animation transition

### Requirement: Add bookmark to block
The system SHALL allow users to add bookmarks to a block.

#### Scenario: Add bookmark via context menu
- **WHEN** the user right-clicks on a block and selects "Add Bookmark"
- **THEN** the system shows a dialog to enter bookmark title and URL

#### Scenario: Add bookmark via drag and drop
- **WHEN** the user drags a bookmark from the browser's bookmark bar into a block
- **THEN** the system adds the bookmark to the block

### Requirement: Delete bookmark from block
The system SHALL allow users to delete bookmarks from a block.

#### Scenario: Delete bookmark via context menu
- **WHEN** the user right-clicks on a bookmark and selects "Delete Bookmark"
- **THEN** the system deletes the bookmark from the block

#### Scenario: Delete bookmark via keyboard
- **WHEN** the user selects a bookmark and presses Delete key
- **THEN** the system deletes the bookmark from the block

### Requirement: Bookmark block limit
The system SHALL limit the number of bookmark blocks per workspace.

#### Scenario: Block limit reached
- **WHEN** the user tries to create a block when the limit (20) is reached
- **THEN** the system prevents creation and shows an error message

### Requirement: Bookmark block position persistence
The system SHALL persist bookmark block positions across sessions.

#### Scenario: Position persistence
- **WHEN** the user closes and reopens the browser
- **THEN** the system restores all bookmark blocks at their last known positions
