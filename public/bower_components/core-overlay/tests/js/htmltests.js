/**
 * This method is a suite of tests for the 'core-overlay' functionality. Each separate test is described by the string input parameter, 
 * which represents the specific HTML file that contains the test. The core-overlay functionality is likely a UI element or group of 
 * elements, and these tests verify its correct operation and interaction with other elements.
 * @param {string} 'html/core-overlay-basic.html' - The path to the basic test for core-overlay functionality.
 * @param {string} 'html/core-overlay-positioning.html' - The path to the test for the positioning of the core-overlay.
 * @param {string} 'html/core-overlay-positioning-margin.html' - The path to the test for the positioning margin of the core-overlay.
 * @param {string} 'html/core-overlay-scroll.html' - The path to the test for the scrolling feature of the core-overlay.
 * @param {string} 'html/core-overlay-quick-close.html' - The path to the test for the quick close feature of the core-overlay.
 * @returns {void} This function does not return anything. It simply runs the tests as indicated by the argument paths.
 */
htmlSuite('core-overlay', function() {
  htmlTest('html/core-overlay-basic.html');
  htmlTest('html/core-overlay-positioning.html');
  htmlTest('html/core-overlay-positioning-margin.html');
  htmlTest('html/core-overlay-scroll.html');
  htmlTest('html/core-overlay-quick-close.html');
});
