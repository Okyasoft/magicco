/**
 * @group Polymer Mixins
 *
 * `Polymer.CoreFocusable` is a mixin for elements that the user can interact with.
 * Elements using this mixin will receive attributes reflecting the focus, pressed
 * and disabled states.
 *
 * @element Polymer.CoreFocusable
 * @status unstable
 */

Polymer.CoreFocusable = {

  mixinPublish: {

    /**
     * If true, the element is currently active either because the
     * user is touching it, or the button is a toggle
     * and is currently in the active state.
     *
     * @attribute active
     * @type boolean
     * @default false
     */
    active: {value: false, reflect: true},

    /**
     * If true, the element currently has focus due to keyboard
     * navigation.
     *
     * @attribute focused
     * @type boolean
     * @default false
     */
    focused: {value: false, reflect: true},

    /**
     * If true, the user is currently holding down the button.
     *
     * @attribute pressed
     * @type boolean
     * @default false
     */
    pressed: {value: false, reflect: true},

    /**
     * If true, the user cannot interact with this element.
     *
     * @attribute disabled
     * @type boolean
     * @default false
     */
    disabled: {value: false, reflect: true},

    /**
     * If true, the button toggles the active state with each tap.
     * Otherwise, the button becomes active when the user is holding
     * it down.
     *
     * @attribute toggle
     * @type boolean
     * @default false
     */
    toggle: false

  },

  mixinDelegates: {
    contextMenu: '_contextMenuAction',
    down: '_downAction',
    up: '_upAction',
    focus: '_focusAction',
    blur: '_blurAction'
  },

  mixinObserve: {
    disabled: '_disabledChanged'
  },

  /**
   * Handles changes in the disabled state of the component. If the component is disabled it stops pointer events, removes tabindex, and set aria-disabled attribute. Conversely, if the component is enabled it allows pointer events, adds tabindex, and removes aria-disabled attribute.
   */
  _disabledChanged: function() {
    if (this.disabled) {
      this.style.pointerEvents = 'none';
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', '');
    } else {
      this.style.pointerEvents = '';
      this.setAttribute('tabindex', 0);
      this.removeAttribute('aria-disabled');
    }
  },

  /**
   * Function to handle the downAction which alters the active and pressed states. When invoked, sets the status of 'pressed' as true. If 'toggle' is true, it inverts the status of 'active'; otherwise, sets 'active' as true.
   */
  
  _downAction: function() {
    this.pressed = true;

    if (this.toggle) {
      this.active = !this.active;
    } else {
      this.active = true;
    }
  },

  // Pulling up the context menu for an item should focus it; but we need to
  // be careful about how we deal with down/up events surrounding context
  // menus. The up event typically does not fire until the context menu
  // closes: so we focus immediately.
  //
  // This fires _after_ downAction.
  _contextMenuAction: function(e) {
    // Note that upAction may fire _again_ on the actual up event.
    this._upAction(e);
    this._focusAction();
  },

  /**
   * Method to handle the up action. It is used to manage the state of a potentially toggleable button or input. 
   * If the toggle property of the button or input is false, it turns off its active state upon triggering up action.
   * @returns {void} This method does not return anything.
   */
  _upAction: function() {
    this.pressed = false;

    if (!this.toggle) {
      this.active = false;
    }
  },

  /**
   * Represents a method that sets the 'focused' state of the element to true only when the element is not in a 'pressed' state. 
   * Primarily used for keyboard-based navigation.
   * @returns {void} This method does not have a return value.
   */
  _focusAction: function() {
    if (!this.pressed) {
      // Only render the "focused" state if the element gains focus due to
      // keyboard navigation.
      this.focused = true;
    }
  },

  /**
   * This method is responsible for managing the blur action within the application. Upon calling it, it alters the application focus state.
   * @returns {void} No directly observable return value. The focused state of the application is internally altered to false. 
   */
  _blurAction: function() {
    this.focused = false;
  }

}
