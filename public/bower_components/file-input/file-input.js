/**
 * Represents a collection of helper methods used to process and validate file inputs.
 */

/**
 * Converts a pseudoArray into an array.
 * @param {Object} pseudoArray - The object that needs to be converted into an array.
 * @returns {Array} The converted object in array form.
 */

/**
 * Extracts the lower case extension from a given filename.
 * @param {string} filename - The name of the file.
 * @returns {string} The lower case extension of the file.
 */

/**
 * Process and validates the limit of the count of the files.
 * @param {number} limit - Maximum limit for files.
 * @param {Array} files - Array of file objects.
 * @returns {Object} An object containing two arrays: 'invalid' with files that exceed the limit, and 'valid' with the files within the limit.
 */

/**
 * Validates the file extension against a string of permissible extensions.
 * @param {string} extensionsStr - JSON String containing valid extensions.
 * @param {Array} files - Array of file objects to validate against extensions.
 * @returns {Object} An object containing two arrays: 'invalid' with the files having non-permissible extensions, and 'valid' with the valid files.
 */

/**
 * Validates the size of the files.
 * @param {number} minSize - Minimum size allowed for files.
 * @param {number} maxSize - Maximum size allowed for files.
 * @param {Array} files - Array of file objects to validate file sizes.
 * @returns {Object} An object containing three arrays: 'tooBig' for files larger than maxSize, 'tooSmall' for files smaller than minSize, and 'valid' for correctly sized files.
 */

/**
 * Checks if the current device is an iOS device.
 * @returns {boolean} True if the device is an iOS device, else False.
 */

/**
 * Resets the input field without disconnecting it from its Parent Node.
 * @param {Object} customEl - Custom Element 
 */

/**
 * Sets up a hidden validation input field.
 * @param {Object} customEl - Custom Element 
 */


/**
 * Updates the validity of the file input depending on whether files are selected or not.
 * @param {Object} customEl - Custom Element 
 */

(function() {
    /**
     * This method converts pseudocode array to a proper JavaScript array.
     * @param {Array-like object} pseudoArray - An array-like object for conversion.
     * @returns {Array} Converted JavaScript array.
     */
    var arrayOf = function(pseudoArray) {
            return Array.prototype.slice.call(pseudoArray);
        },

        /**
         * This method is used to obtain the lowercase extension from a given filename.
         * @param {String} filename - The name of the file from which the extension is to be extracted.
         * @returns {String} The lowercase file extension part from the input filename. If the filename does not contain any extension, it will return undefined.
         */
        getLowerCaseExtension = function(filename) {
            var extIdx = filename.lastIndexOf(".") + 1;

            if (extIdx > 0) {
                return filename.substr(extIdx, filename.length - extIdx).toLowerCase();
            }
        },

        /**
         * This function validates if the provided limit criteria is met by comparing it to the number of files. 
         * It then separates the invalid and valid files.
         * @param {Number} limit - User-defined limit specifying the maximum number of files that are considered valid.
         * @param {Array} files - Array containing all the files that need to be validated.
         * @returns {Object} An object with two properties: 'invalid', an array of files that exceed the limit, and 'valid', an array of files that are within the limit.
         */
        getResultOfCountLimitValidation = function(limit, files) {
            if (limit > 0 && limit < files.length) {
                return {
                    invalid: files.slice(limit, files.length),
                    valid: files.slice(0, limit)
                };
            }

            return {invalid: [], valid: files};
        },

        /**
         * Function to validate file extensions against a list of allowed (or disallowed) extensions.
         * The function parses a JSON formatted list of extensions and checks each file in provided files array. 
         * It groups the files into valid and invalid based on their extension.
         * If 'extensionsStr' begins with '!', the provided extensions are deemed as invalid. Files matching these are grouped in 'invalid'.
         * If 'extensionsStr' doesn't begin with '!', the provided extensions are deemed as valid, Files matching these are grouped in 'valid'.
         * 
         * @param {string}  extensionsStr - A JSON formatted string of extensions to validate files against.
         * @param {Array}  files - An array of files to validate, each file is an object with a 'name' property.
         * @returns {Object} An object containing two arrays - 'valid' and 'invalid', housing files based on the result of validation.
         */
        getResultOfExtensionsValidation = function(extensionsStr, files) {
            if (extensionsStr) {
                var negate = extensionsStr.charAt(0) === "!",
                    extensions = JSON.parse(extensionsStr.toLowerCase().substr(negate ? 1 : 0)),
                    result = {invalid: [], valid: []};

                /**
                 * Iterates over each file in the 'files' array, determines the file extension, and categorizes 
                 * it as either 'valid' or 'invalid' based on whether the extension is found within the 'extensions' array. 
                 * The categorization is flipped if 'negate' is true.
                 * @param {Array}  files - An array of file objects which should at least contain a 'name' property.
                 * @param {string} file.name - The name of the file from which the extension is extracted.
                 * @param {boolean}  negate - Optional boolean flag indicating if the check should be negated, default is 'false'.
                 * @param {Array}  extensions - Array of file extensions considered valid.
                 * @returns {Object} An object with two properties: 'valid' and 'invalid'. Each one is an array containing the files which passed or failed the check.
                 */
                files.forEach(function(file) {
                    var extension = getLowerCaseExtension(file.name);

                    if (extensions.indexOf(extension) >= 0) {
                        result[negate ? "invalid" : "valid"].push(file);
                    }
                    else {
                        result[negate? "valid" : "invalid"].push(file);
                    }
                });

                return result;
            }

            return {invalid: [], valid: files};
        },

        /**
         * This method validates the size of each file in a list of files, categorizing them into too big, too small, and valid groups.
         * @param {Number} minSize - The minimum file size limit. If this parameter is false, there is no lower limit.
         * @param {Number} maxSize - The maximum file size limit. If this parameter is false, there is no upper limit.
         * @param {Array} files - Array of file objects which should contain at least a size property.
         * @returns {Object} An object containing three properties: tooBig (containing files that are too big), tooSmall (containing files that are too small), and valid (containing files that fall within the size limits).
         */
        getResultOfSizeValidation = function(minSize, maxSize, files) {
            if (!minSize && !maxSize) {
                return {tooBig: [], tooSmall: [], valid: files};
            }

            var valid = [],
                tooBig = [],
                tooSmall = [];

            /**
             * Processes each file in the files array. If a file size is less than minSize, it pushes it into the tooSmall array. 
             * If a file size is greater than maxSize, it pushes it into the tooBig array. 
             * Whenever a file size is in between minSize and maxSize or either of these is undefined, it pushes the file into the valid array. 
             * @param {Object[]} files - An array of file objects to be processed
             * @param {number} minSize - The smallest acceptable file size. If no minimum size is required, this should be null or undefined.
             * @param {number} maxSize - The largest acceptable file size. If no maximum size is required, this should be null or undefined.
             * @returns {void} This function does not return a value. The arrays tooSmall, tooBig, and valid are modified by this function.
             */
            files.forEach(function(file) {
                if (minSize && file.size < minSize) {
                    tooSmall.push(file);
                }
                else if (maxSize && file.size > maxSize) {
                    tooBig.push(file);
                }
                else {
                    valid.push(file);
                }
            });

            return {tooBig: tooBig, tooSmall: tooSmall, valid: valid};
        },

        /**
         * Evaluates the user's navigator agent string for keywords related to iOS devices ("iPad", "iPod", "iPhone").
         * @returns {boolean} True if the user's navigator agent contains any of the listed iOS device keywords, false otherwise.
         */
        isIos = function() {
            return navigator.userAgent.indexOf("iPad") !== -1 ||
                navigator.userAgent.indexOf("iPod") !== -1 ||
                navigator.userAgent.indexOf("iPhone") !== -1;
        },

        // This is the only way (I am aware of) to reset an `<input type="file">`
        // without removing it from the DOM.  Removing it disconnects it
        // from the CE/Polymer.
        resetInput = function(customEl) {
            // create a form with a hidden reset button
            var tempForm = document.createElement("form"),
                tempResetButton = document.createElement("button");

            tempResetButton.setAttribute("type", "reset");
            tempResetButton.style.display = "none";
            tempForm.appendChild(tempResetButton);

            // temporarily move the `<input type="file">` into the form & add form to DOM
            customEl.$.fileInput.parentNode.insertBefore(tempForm, customEl.$.fileInput);
            tempForm.appendChild(customEl.$.fileInput);

            // reset the `<input type="file">`
            tempResetButton.click();

            // move the `<input type="file">` back to its original spot & remove form
            tempForm.parentNode.appendChild(customEl.$.fileInput);
            tempForm.parentNode.removeChild(tempForm);

            updateValidity(customEl);
        },

        /**
         * Sets up a validation target by creating a new input element and setting various styles and attributes. A reference to a custom element is attached to the newly created input. The input is added to the DOM before the custom element and makes a call to update the validity of the custom element.
         * @param {Element} customEl - The custom element to which the validation target corresponds.
         * @returns {void}
         */
        setupValidationTarget = function(customEl) {
            validationTarget = document.createElement("input");
            validationTarget.setAttribute("tabindex", "-1");
            validationTarget.setAttribute("type", "text");

            // Strange margin/padding needed to ensure some browsers 
            // don't hide the validation message immediately after it 
            // appears (Chrome at this time)
            validationTarget.style.padding = "1px";
            validationTarget.style.margin = "-1px";

            validationTarget.style.border = 0;
            validationTarget.style.height = 0;
            validationTarget.style.opacity = 0;
            validationTarget.style.width = 0;
            
            validationTarget.className = "fileInputDelegate";

            validationTarget.customElementRef = customEl;

            customEl.parentNode.insertBefore(validationTarget, customEl);

            updateValidity(customEl);
        },

        /**
         * This method updates the validity of the provided custom element within a validation target.
         * If the custom element has a file(s), it sets the validation target's custom validity to an empty string.
         * If the custom element does not have a file, it sets the custom validity of the validation target to the invalidText of the provided custom element.
         * @param {Object} customEl - The custom element whose validity is to be checked. It must contain a property 'files' (Array) and 'invalidText' (String). 
         */
        updateValidity = function(customEl) {
            if (validationTarget) {
                if (customEl.files.length) {
                    validationTarget.setCustomValidity("");
                }
                else {
                    validationTarget.setCustomValidity(customEl.invalidText);
                }
            }
        },

        validationTarget;


   this.fileInput = {
        /**
         * Handles changes in the file input by validating the selected files based on various provided constraints like minimum and maximum file size, 
         * allowed file extensions, and maximum number of files. If a file fails in any of the constraints, it is added to an invalid files list with the 
         * specific reason for being invalid. Valid files are stored separately and both lists (invalid and valid files) are updated in the element's state. 
         * Updates the component's validation status and emits a 'change' event with the current state of invalid and valid selected files.
         */
        changeHandler: function() {
            var customEl = this,
                files = arrayOf(customEl.$.fileInput.files),
                invalid = {count: 0},
                valid = [];

            // Some browsers may fire a change event when the file chooser
            // dialog is closed via cancel button.  In this case, the
            //files array will be empty and the event should be ignored.
            if (files.length) {
                var sizeValidationResult = getResultOfSizeValidation(customEl.minSize, customEl.maxSize, files);
                var extensionValidationResult = getResultOfExtensionsValidation(customEl.extensions, sizeValidationResult.valid);
                var countLimitValidationResult = getResultOfCountLimitValidation(customEl.maxFiles, extensionValidationResult.valid);

                if (sizeValidationResult.tooBig.length) {
                    invalid.tooBig = sizeValidationResult.tooBig;
                    invalid.count += sizeValidationResult.tooBig.length;
                }
                if (sizeValidationResult.tooSmall.length) {
                    invalid.tooSmall = sizeValidationResult.tooSmall;
                    invalid.count += sizeValidationResult.tooSmall.length;
                }
                if (extensionValidationResult.invalid.length) {
                    invalid.badExtension = extensionValidationResult.invalid;
                    invalid.count += extensionValidationResult.invalid.length;
                }
                if (countLimitValidationResult.invalid.length) {
                    invalid.tooMany = countLimitValidationResult.invalid;
                    invalid.count += countLimitValidationResult.invalid.length;
                }

                valid = countLimitValidationResult.valid;

                customEl.invalid = invalid;
                customEl.files = valid;

                updateValidity(customEl);
                customEl.fire("change", {invalid: invalid, valid: valid});
            }
        },

        /**
         * This method is automatically executed when the component instance has been created, 
         * and is used to initialize the 'files' array and the 'invalid' object.
         */
        created: function() {
            var customEl = this;

            customEl.files = [];
            customEl.invalid = {count: 0};
        },

        invalidText: "No valid files selected.",

        maxFiles: 0,

        maxSize: 0,

        minSize: 0,

        /**
         * Sets up the domReady function. Adjusts camera settings on iOS devices, handles file input properties based on set parameters, and sets validation if needed.
         * @function domReady
         * @param {Object}  customEl - The custom element the function is operating on.
         * @returns {void} - Does not return anything.
         */
        domReady: function() {
            var customEl = this;

            if (customEl.camera != null && isIos()) {
                customEl.maxFiles = 1;

                var iosCameraAccept = "image/*;capture=camera";
                if (customEl.accept && customEl.accept.length.trim().length > 0) {
                    customEl.accept += "," + iosCameraAccept;
                }
                else {
                    customEl.accept = iosCameraAccept;
                }
            }

            if (customEl.maxFiles !== 1) {
                customEl.$.fileInput.setAttribute("multiple", "");
            }

            if (customEl.directory != null && customEl.$.fileInput.webkitdirectory !== undefined) {
                customEl.$.fileInput.setAttribute("webkitdirectory", "");
            }

            if (customEl.required != null) {
                setupValidationTarget(customEl);
            }
        },

        /**
         * Resets the custom element by reinitializing it and resetting its input.
         * @returns {void} Nothing
         */
        reset: function() {
            var customEl = this;

            customEl.created();
            resetInput(customEl);
        }
    };
}());